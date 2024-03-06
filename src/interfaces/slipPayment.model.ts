import { Payments } from "./payment.model";

export interface SlipPayment {
    id: string;
    image: string;
    detail: string
    payment_id: string;
    count: number;
    create_date: string;
    update_date: string;
}