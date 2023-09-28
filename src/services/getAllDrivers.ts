import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getAllDrivers = async () => {
    const drivers = await axiosInstance.get(`${API_URL}/drivers`)
    return drivers.data
}
