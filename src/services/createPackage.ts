import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

interface ICreatePackage {
    receiverName: string
    address: string
    city: string
    weight: number
    quantity: number
}

export const createPackage = async (data: ICreatePackage) => {
    const { receiverName, address, city, weight, quantity } = data
    const newPackage = await axiosInstance.post(`${API_URL}/packages`, {
        receiverName,
        address,
        city,
        weight,
        quantity,
    })
    return newPackage.data
}
