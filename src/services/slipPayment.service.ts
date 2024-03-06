import { enviroment } from "@/constants/enviroment";
import { SlipPayment } from "@/interfaces/slipPayment.model";
import axios from "axios";

export async function createSlipPayment(data: SlipPayment): Promise<SlipPayment> {
    try {
        const result = await axios.post<SlipPayment>(`${enviroment.baseUrl}${enviroment.slipPayment}`, data)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function deleteByIdSlip(id: string): Promise<SlipPayment> {
    try {
        const result = await axios.delete<SlipPayment>(`${enviroment.baseUrl}${enviroment.slipPayment}/${id}`)
        return result.data
    } catch (error) {
        throw error
    }
}
