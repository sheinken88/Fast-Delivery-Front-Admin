import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

interface ICreatePackage {
    receiver_name: string
    address: string
    city: string
    weight: number
    quantity: number
}

export const createPackage = async (data: ICreatePackage) => {
    const { receiver_name, address, city, weight, quantity } = data
    const newPackage = await axiosInstance.post(`${API_URL}/packages`, {
        receiver_name,
        address,
        city,
        weight,
        quantity,
    })
    return newPackage.data
}
