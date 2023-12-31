'use client'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useEffect, type ReactNode } from 'react'
import { TbLogout } from 'react-icons/tb'
import { IconContext } from 'react-icons'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUser } from 'store/slices/adminSlice'
import type IAdmin from '../interfaces/IAdmin'
import { persistence } from 'services/persistence'
import { type RootState } from 'store/store'

interface BgLayoutProps {
    children: ReactNode
}

export const BgLayout: React.FC<BgLayoutProps> = ({ children }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const Logo =
        'https://res.cloudinary.com/db3pcwsrm/image/upload/v1696036777/fast-delivery/assets/Logo_small.svg'

    const admin = useSelector((state: RootState) => state.admin)

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                text: '¿Estás seguro que deseas salir?',
                icon: 'warning',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCancelButton: true,
                confirmButtonColor: '#00EA77',
                cancelButtonColor: '#3D1DF3',
            })

            if (result.isConfirmed) {
                localStorage.removeItem('user')
                dispatch(logoutUser())
                router.push('/login')
            }
        } catch (error) {
            console.error('handleLogout error', error)
        }
    }

    const fetchUserByToken = async () => {
        try {
            const userToken: IAdmin = await persistence()
            if (userToken !== null) {
                dispatch(setUser(userToken))
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('user')
        if (token !== null && admin.email === '') void fetchUserByToken()
    }, [])

    return (
        <div className="bg-primary min-h-screen min-w-screen flex flex-col">
            <div className="flex justify-between py-3 px-4 border-b border-transparent shadow-xl lg:shadow-2xl">
                <div className="cursor-pointer">
                    <Link href={'/home'}>
                        <Image
                            src={Logo}
                            alt="Fast Delivery Logo"
                            width={45}
                            height={45}
                            priority
                        />
                    </Link>
                </div>

                <div
                    className="cursor-pointer border-b border-transparent shadow-xl lg:shadow-2xl"
                    onClick={handleLogout}
                >
                    <IconContext.Provider
                        value={{
                            color: 'white',
                            size: '30px',
                        }}
                    >
                        <TbLogout />
                    </IconContext.Provider>
                </div>
            </div>
            <div className="p-10 flex-grow">{children}</div>
        </div>
    )
}

BgLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
