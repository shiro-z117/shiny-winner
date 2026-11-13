export type Guest = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
};

// totalStays and totalSpent are calculated at the time of request instead of directly stored within the Guest object
export type GuestWithStats = Guest & {
    totalStays: number; // total # of different stays at the hotel
    totalDays: number; // total # of actual calendar days spent at the hotel (calculated via every checked-out reservation this guest has)
    totalSpent: number; // total cents (integer) spent by this guest
};