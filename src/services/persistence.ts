import axiosInstance from '../../interfaces/axiosInstance'

export const persistence = async () => {
    try {
        const response = await axiosInstance.post('/admins/secret')
        return response.data.user
    } catch (error) {
        console.error('Persistence service error', error)
    }
}
