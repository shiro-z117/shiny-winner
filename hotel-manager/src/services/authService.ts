import "server-only";
import { redirect } from "next/navigation";
import { ForbiddenError, UnauthorizedError } from "@/lib/apiResponse";
import { db } from "@/prisma/db";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { verifyPassword } from "@/lib/passwordSecurity";
import type { Role } from "@/types/employee";

export type Session = {
    employeeId: string;
    role: Role;
};

const COOKIE_NAME = "session";
const SESSION_DAYS = 7; // you have to re-login after 7 days

const ROLE_HOME: Record<Role, string> = {
    ADMIN: "/dashboard",
    MANAGER: "/dashboard",
    RECEPTIONIST: "/reservations",
    HOUSEKEEPING: "/housekeeping",
};

// #region SESSION HANDLING

function secretKey(): Uint8Array {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be set to at least 32 characters");
    return new TextEncoder().encode(secret);
}

async function readEmployeeId(): Promise<string | null> {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (!token) return null;

    const key = secretKey();
    try {
        const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
        return typeof payload.sub === "string" ? payload.sub : null;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<Session | null> {
    const employeeId = await readEmployeeId();
    if (!employeeId) return null;

    const employee = await db.orm.public.Employee.first({ id: employeeId });
    if (!employee || !employee.isActive) return null;

    return { employeeId: employee.id, role: employee.role };
}

export async function getCurrentUser() {
    const session = await getSession();
    if (!session) throw new UnauthorizedError();

    const employee = await db.orm.public.Employee.first({ id: session.employeeId });
    if (!employee) throw new UnauthorizedError();
    return {
        id: employee.id,
        fullName: employee.fullName,
        email: employee.email,
        role: employee.role,
        home: ROLE_HOME[employee.role],
    };
}

// #endregion SESSION HANDLING

// #region LOGIN/LOGOUT

export async function login(email: string, password: string): Promise<{ role: Role; home: string }> {
    const employee = await db.orm.public.Employee.where({ email: email.toLowerCase() }).first();
    const passwordOk = employee ? await verifyPassword(password, employee.passwordHash) : false;
    if (!employee || !passwordOk) throw new UnauthorizedError("Invalid email or password");

    if (!employee.isActive) {
        throw new ForbiddenError("Your account has been deactivated. Please contact an admin.");
    }

    const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(employee.id)
        .setIssuedAt()
        .setExpirationTime(`${SESSION_DAYS}d`)
        .sign(secretKey());

    (await cookies()).set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_DAYS * 24 * 60 * 60,
    });

    return { role: employee.role, home: ROLE_HOME[employee.role] };
}

export async function logout(): Promise<void> {
    (await cookies()).delete(COOKIE_NAME);
}

// #endregion LOGIN/LOGOUT

// for API route handlers: when trying to access a forbidden route, throws an error which handle() turns into 401 or 403
export async function requireApiRole(...roles: Role[]): Promise<Session> {
    const session = await getSession();
    if (!session) throw new UnauthorizedError();
    if (!roles.includes(session.role)) throw new ForbiddenError();
    return session;
}

// for protected pages: redirects to /login if not logged in, otherwise redirects to the role's home if the route is not allowed for that role
export async function requireRole(...roles: Role[]): Promise<Session> {
    const session = await getSession();
    if (!session) redirect("/login");
    if (!roles.includes(session.role)) redirect(ROLE_HOME[session.role]);
    return session;
}

// for the login page: logged-in users get bounced to their home
export async function redirectIfAuthenticated(): Promise<void> {
    const session = await getSession();
    if (session) redirect(ROLE_HOME[session.role]);
}

// for the root page "/": logged out goes to /login, otherwise to the role's home
export async function redirectToHome(): Promise<never> {
    const session = await getSession();
    redirect(session ? ROLE_HOME[session.role] : "/login");
}