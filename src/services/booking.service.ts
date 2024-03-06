import { enviroment } from "@/constants/enviroment";
import { Bookings } from "@/interfaces/booking.model";
import { Parks } from "@/interfaces/park.model";
import axios from "axios";

export async function searchByDate(data: Bookings) {
    try {
        const result = await axios.post<Parks[]>(`${enviroment.baseUrl}${enviroment.booking}/date`, data)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function findAll() {
    try {
        const result = await axios.get<Bookings[]>(`${enviroment.baseUrl}${enviroment.booking}`)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function createBooking(data: Bookings) {
    try {
        const result = await axios.post<Bookings>(`${enviroment.baseUrl}${enviroment.booking}`, data)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function deleteById(id: string) {
    try {
        const result = await axios.delete(`${enviroment.baseUrl}${enviroment.booking}/${id}`)
        return result.data
    } catch (error) {
        throw error
    }
}