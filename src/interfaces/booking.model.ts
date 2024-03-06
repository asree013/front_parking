import { Parks } from "./park.model";
import { Payments } from "./payment.model";
import { Users } from "./users.model";

export interface Bookings {
    id: string;
    detail: string;
    status: string;
    start_date: string;
    end_date: string;
    booking_by: string;
    created_by: string;
    user_created: Users;
    parking_id: string;
    parkings: Parks;
    create_date: string;
    update_date: string;
    payments?: Payments;
}