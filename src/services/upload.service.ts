import { enviroment } from "@/constants/enviroment";
import axios from "axios";

export async function uploadForImage(file: File) {
    const data = {
        file: file
    }
    try {
        const result = await axios.post<string>(`${enviroment.baseUrl}${enviroment.upload}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return result.data
    } catch (error) {
        throw error
    }
}