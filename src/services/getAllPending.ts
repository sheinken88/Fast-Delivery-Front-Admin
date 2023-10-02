import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getAllPending = async () => {
    const packages = await axiosInstance.get(`${API_URL}/packages/pending`)
    return packages.data
}
