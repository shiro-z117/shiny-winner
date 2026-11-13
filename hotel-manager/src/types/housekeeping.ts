type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type HousekeepingTask = {
    id: string;
    roomId: string; // associated room
    assignedToId: string | null; // id of the employee this housekeeping task is assigned to (max 1 employee per housekeeping task); if no one is assigned it should show as some kind of alert on the admin's housekeeping page ("no one assigned!")
    status: TaskStatus;
    notes: string | null;
    startedAt: string | null;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
};