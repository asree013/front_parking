import { Bookings } from "./booking.model";

export interface Users {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    idCard?: string;
    email?: string;
    address?: string;
    image_user?: string;
    phone: string;
    role: string;
    create_date: string;
    update_date: string;
    bookings: Bookings[];
}