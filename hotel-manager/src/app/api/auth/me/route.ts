import { handle, ok } from "@/lib/apiResponse";
import { getCurrentUser } from "@/services/authService";

export const GET = handle(async () => {
    const user = await getCurrentUser();
    return ok(user);
});