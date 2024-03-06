import { enviroment } from "@/constants/enviroment";
import { Users } from "@/interfaces/users.model";
import axios from "axios";

export async function findUserById(id: string) {
    try {
        const result = await axios.get(`${enviroment.baseUrl}${enviroment.user}/${id}`)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function updateUserById(id: string, data: Users) {
    try {
        const result = await axios.put<Users>(`${enviroment.baseUrl}${enviroment.user}/${id}`, data)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function findUserAll() {
    try {
        const result = await axios.get<Users[]>(`${enviroment.baseUrl}${enviroment.user}`)
        return result.data
    } catch (error) {
        throw error
    }
}
