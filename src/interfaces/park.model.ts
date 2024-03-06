import { Bookings } from "./booking.model";

export interface Parks {
    id: string;
    name_park: string;
    image_park?: string;
    active: boolean;
    create_date: string;
    update_date: string;
}
