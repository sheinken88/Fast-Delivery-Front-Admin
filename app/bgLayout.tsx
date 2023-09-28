'use client'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Logo from '../public/Capa_1 (1).svg'
import type { ReactNode } from 'react'
import { TbLogout } from 'react-icons/tb'
import { IconContext } from 'react-icons'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
// import { useDispatch } from 'react-redux'

interface BgLayoutProps {
    children: ReactNode
}

export const BgLayout: React.FC<BgLayoutProps> = ({ children }) => {
    const router = useRouter()
    // const dispatch = useDispatch()
    // const user = useSelector((state: RootState) => state.users.currentUser)
    // const currentDelivery = useSelector(
    //     (state: RootState) => state.currentDelivery
    // )

    // const handleLogout = async () => {
    //     const result = await Swal.fire({
    //         text: '¿Estás seguro que deseas salir?',
    //         icon: 'warning',
    //         confirmButtonText: 'Si',
    //         cancelButtonText: 'No',
    //         showCancelButton: true,
    //         confirmButtonColor: '#00EA77',
    //         cancelButtonColor: '#3D1DF3',
    //     })

    //     if (result.isConfirmed) {
    //         localStorage.removeItem('user')
    //         router.push('/login')
    //     }
    // }

    // const fetchUserByToken = async () => {
    //     try {
    //         const userToken: User = await persistence()
    //         if (userToken !== null) {
    //             dispatch(setCurrentUser(userToken))
    //         }
    //     } catch (error) {
    //         console.error('Error al obtener el usuario:', error)
    //     }
    // }

    // const fetchDeliveryPackages = async () => {
    //     try {
    //         if (user != null) {
    //             const deliveryPackages = await fetchCurrentDelivery(user._id)
    //             if (deliveryPackages !== null)
    //                 dispatch(setCurrentDelivery(deliveryPackages.packages))
    //             dispatch(setDeliveryId(deliveryPackages._id))
    //         }
    //     } catch (error) {
    //         console.error('Error al obtener el delivery actual', error)
    //     }
    // }

    // useEffect(() => {
    //     const token = localStorage.getItem('user')
    //     if (token !== null) void fetchUserByToken()
    // }, [])

    // useEffect(() => {
    //     if (user !== null) void fetchDeliveryPackages()
    //     console.log('currentDelivery', currentDelivery.packages)
    // }, [])

    return (
        <div className="bg-primary min-h-screen min-w-screen flex flex-col">
            <div className="flex justify-between py-3 px-4 border-b border-transparent shadow-xl lg:shadow-2xl">
                <div className="cursor-pointer">
                    <Link href={'/home'}>
                        <Image
                            src={Logo}
                            alt="Fast Delivery Logo"
                            className=""
                            priority
                        />
                    </Link>
                </div>

                <div
                    className="cursor-pointer border-b border-transparent shadow-xl lg:shadow-2xl"
                    // onClick={handleLogout}
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
