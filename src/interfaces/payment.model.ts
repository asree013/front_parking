import { Bookings } from "./booking.model";
import { SlipPayment } from "./slipPayment.model";

export interface Payments {
    id: string;
    status_payment: string;
    count: number;
    remian: number
    bookings: Bookings;
    booking_id: string;
    create_date: string;
    update_date: string;
    deposit: number
    slipPayment: SlipPayment[];
}