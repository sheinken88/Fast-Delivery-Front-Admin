import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getAllDelivered = async () => {
    const packages = await axiosInstance.get(`${API_URL}/packages/delivered`)
    return packages.data
}
