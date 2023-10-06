import axios from 'axios'

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${String(process.env.NEXT_PUBLIC_API_URL)}/admins/login`,
            {
                email,
                password,
            }
        )
        localStorage.setItem('user', response.data.token)
        return response.data.user
    } catch (error) {
        console.error('login service error', error)
    }
}
