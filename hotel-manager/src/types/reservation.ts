type ReservationStatus =
    | "PENDING"
    | "CONFIRMED"
    | "CHECKED_IN"
    | "CHECKED_OUT"
    | "CANCELLED"
    | "NO_SHOW";

export type Reservation = {
    id: string;
    guestId: string; // associated guest
    roomId: string | null; // associated room (can be null until the guest is assigned a room)
    status: ReservationStatus;
    checkInDate: string;
    checkOutDate: string;
    adults: number; // 18 or over
    children: number; // 17 or younger
    actualCheckIn: string | null;
    actualCheckOut: string | null;
    notes: string | null;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    cancelledAt: string | null;
};