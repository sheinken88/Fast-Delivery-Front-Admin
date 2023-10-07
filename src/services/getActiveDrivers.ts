import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getActiveDrivers = async () => {
    try {
        const drivers = await axiosInstance.get(`${API_URL}/drivers/active`)
        return drivers.data
    } catch (error) {
        console.error('getActiveDrivers error', error)
    }
}
