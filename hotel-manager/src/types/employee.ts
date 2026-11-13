export type Role = "ADMIN" | "RECEPTIONIST" | "HOUSEKEEPING" | "MANAGER";

// the client should never receive the password (even in its hashed state), it is stored in the database and checked on the server
export type Employee = {
    id: string;
    email: string; // login identifier (must be unique)
    fullName: string;
    phone: string;
    role: Role;
    isActive: boolean;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
};