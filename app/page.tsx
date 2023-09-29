'use client'
import { useDispatch } from 'react-redux'
import { persistence } from '../src/services/persistence'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type IAdmin from '../interfaces/IAdmin'
import { setUser } from 'store/slices/adminSlice'

export default function Home() {
    const dispatch = useDispatch()
    const router = useRouter()

    const fetchUserByToken = async () => {
        try {
            const userToken: IAdmin = await persistence()
            if (userToken != null) {
                dispatch(setUser(userToken))
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('user')
        if (token !== null) {
            void fetchUserByToken()
            router.push('/home')
        } else router.push('/login')
    }, [])
}
