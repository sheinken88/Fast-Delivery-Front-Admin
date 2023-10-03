import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

interface Id {
    id: string
}

export const getDriverDeliveredPackages = async ({ id }: Id) => {
    const packages = await axiosInstance.get(
        `${API_URL}/orders/delivered/${id}`
    )
    return packages.data
}
