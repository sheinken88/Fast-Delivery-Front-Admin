import axiosInstance from '../../interfaces/axiosInstance'

export const updateUserProfile = async (id: string, data: object) => {
    try {
        const editedAdmin = await axiosInstance.put(`/admins/edit/${id}`, {
            data,
        })
        return editedAdmin
    } catch (error) {
        console.error('updateUserProfile error', error)
    }
}
