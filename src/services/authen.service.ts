import { enviroment } from "@/constants/enviroment";
import { Users } from "@/interfaces/users.model";
import axios from "axios";

export async function login(data: {username: string, password: string}) {
    try {
        const result = await axios.post(`${enviroment.baseUrl}${enviroment.user}/login`, data)
        return result.data
    } catch (error: any) {
        throw error.message
    }
}

export async function validJwt(jwt: string) {    
    try {
        const result = await axios.get(`${enviroment.baseUrl}${enviroment.user}/jwt`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        return result.data
    } catch (error) {
        throw error
    }
}

export async function registerUsers(item: Users) {
    try {
        const data = {
            username: item.username,
            password: item.password,
            firstname: item.firstname,
            lastname: item.lastname
        }
        const result = await axios.post<Users>(`${enviroment.baseUrl}${enviroment.user}`, data)
        return result.data
    } catch (error) {
        throw error
    }
}