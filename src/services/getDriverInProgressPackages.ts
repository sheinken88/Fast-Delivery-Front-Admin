import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

interface Id {
    id: string
}

export const getDriverInProgressPackages = async ({ id }: Id) => {
    const packages = await axiosInstance.get(
        `${API_URL}/orders/in-progress/${id}`
    )
    return packages.data
}
