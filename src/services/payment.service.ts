import { enviroment } from "@/constants/enviroment";
import { Payments } from "@/interfaces/payment.model";
import axios from "axios";

export async function createPayment(data: Payments) {
    try {
        const result = await axios.post<Payments>(`${enviroment.baseUrl}${enviroment.payment}`, data)
        return result.data
    } catch (error) {
        throw error
    }
}
export async function deleteByIdPayment(id: string) {
    try {
        const result = await axios.delete(`${enviroment.baseUrl}${enviroment.payment}/${id}`)
        return result.data
    } catch (error) {
        throw error
    }
}