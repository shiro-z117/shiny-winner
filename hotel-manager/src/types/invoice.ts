type PaymentMethod = "CASH" | "CARD" | "UPI";

type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "REFUNDED";

// things like ordering food directly to your hotel room
// the catalog of service items are stored in a databse table
export type ServiceItem = {
    id: string;
    name: string;
    price: number;
    isActive: boolean; // default yes, no only if discontinued (no longer offered at all)
};

type InvoiceItem = {
    serviceItemId: string;
    name: string;
    unitPrice: number; // equal to the ServiceItem price at the time of invoice creation (price snapshot)
    quantity: number;
};

// all money values are internally stored in total cents (integer)
export type Invoice = {
    id: string;
    reservationId: string; // associated reservation
    roomCharge: number; // equal to the Room.price * nights at the time of invoice creation (price snapshot)
    items: InvoiceItem[];
    subtotal: number;
    taxRate: number; // decimal representing a percentage i.e. 0.08 = 8%
    taxAmount: number;
    discount: number; // flat value, not a percentage
    total: number;
    status: InvoiceStatus;
    paymentMethod: PaymentMethod | null;
    paidAt: string | null;
    paidById: string | null;
    refundedAt: string | null;
    refundAmount: number | null;
    issuedAt: string | null;
    createdAt: string;
    updatedAt: string;
};