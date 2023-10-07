import { API_URL } from 'utils/config'
import axiosInstance from '../../interfaces/axiosInstance'
import type IDriver from '../../interfaces/IDriver'

export const changeDriverStatus = async (
    driverId: string,
    newState: object
): Promise<IDriver> => {
    const response = await axiosInstance.put(
        `${API_URL}/admins/edit/driver-status/${driverId}`,
        newState,
        {
            withCredentials: true,
        }
    )

    const updatedDriver: IDriver = response.data

    return updatedDriver
}
