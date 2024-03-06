import { enviroment } from "@/constants/enviroment";
import { Parks } from "@/interfaces/park.model";
import axios from "axios";

const baseUrl = `${enviroment.baseUrl}${enviroment.park}`

export async function findAll() {
    try {
        const result = await axios.get<Parks[]>(`${enviroment.baseUrl}${enviroment.park}`)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function create(item: Parks) {
    try {
        const result = await axios.post<Parks>(baseUrl, item)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function findParkById(id: string) {
    try {
        const result = await axios.get<Parks>(baseUrl+'/'+id)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function updateParkById(id: string, item: Parks) {
    try {
        const result = await axios.put(baseUrl+'/'+id, item)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function deleteParkById(id: string) {
    try {      
        const result = await axios.delete<Parks>(baseUrl+'/'+id)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function searchByObject(item: Parks) {
    try {
        const result = await axios.post<Parks>(baseUrl+'/search', item)
        return result.data
    } catch (error) {
        throw error
    }
}