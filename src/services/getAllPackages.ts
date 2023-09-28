import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const getAllPackages = async () => {
    const packages = await axiosInstance.get(`${API_URL}/packages`)
    console.log('packages', packages.data)

    return packages.data
}
