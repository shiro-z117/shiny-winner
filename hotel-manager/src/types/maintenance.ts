type MaintenanceStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

// maintenance requests are for issues like "no hot water" or "AC not working"
export type MaintenanceRequest = {
    id: string;
    roomId: string; // associated room
    reportedById: string; // any employee can report a maintenance request
    description: string;
    status: MaintenanceStatus;
    resolvedAt: string | null; // only managers and admins should be able to resolve
    createdAt: string;
    updatedAt: string;
};