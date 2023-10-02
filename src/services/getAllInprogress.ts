import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getAllInProgress = async () => {
    const packages = await axiosInstance.get(`${API_URL}/packages/in-progress`)
    return packages.data
}
