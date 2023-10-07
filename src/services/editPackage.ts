import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'
import type IPackage from '../../interfaces/IPackage'

export const editPackage = async (
    packageId: string,
    data: object
): Promise<IPackage> => {
    const response = await axiosInstance.put(
        `${API_URL}/packages/edit/${packageId}`,
        data,
        {
            withCredentials: true,
        }
    )

    const updatedPackage: IPackage = response.data

    return updatedPackage
}
