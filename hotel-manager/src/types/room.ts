type RoomStatus =
    | "AVAILABLE"
    | "OCCUPIED"
    | "CLEANING"
    | "MAINTENANCE"
    | "RESERVED";

// the catalog of room categories are stored in a database table
export type RoomCategory = {
    id: string;
    name: string;
    description: string;
    basePrice: number; // total cents (integer); nightly rate
    maxOccupancy: number;
    amenities: string[];
    isActive: boolean; // default yes, no only if discontinued ("discontinued" probably means rooms of that category have been renovated or rebranded)
};

// all money values are internally stored in total cents (integer)
export type Room = {
    id: string;
    roomNumber: string;
    categoryId: string;
    price: number; // actual nightly rate set for this room based off of RoomCategory.basePrice but can be manually set
    maxOccupancy: number;
    images: string[];
    status: RoomStatus;
    createdAt: string;
    updatedAt: string;
};