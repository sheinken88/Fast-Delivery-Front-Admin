import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getDriverDeliveredPackages = async (id: string) => {
    const packages = await axiosInstance.get(
        `${API_URL}/orders/delivered/${id}`
    )
    return packages.data
}
