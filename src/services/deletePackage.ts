import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'

export const deletePackage = async (packageId: string) => {
    const packageDelete = await axiosInstance.delete(
        `${API_URL}/packages/delete/${packageId}`
    )
    return packageDelete
}
