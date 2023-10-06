import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getDriverInProgressPackages = async (id: string) => {
    const packages = await axiosInstance.get(
        `${API_URL}/orders/in-progress/${id}`
    )
    return packages.data
}
