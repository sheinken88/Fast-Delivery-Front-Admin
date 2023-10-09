import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getDriverDeliveredPackageToday = async (id: string) => {
    const packages = await axiosInstance.get(
        `${API_URL}/orders/delivered-today/${id}`
    )

    return packages.data
}
