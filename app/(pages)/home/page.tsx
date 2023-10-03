'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BgLayout } from '../../bgLayout'
import type { RootState } from '../../../src/store/store'
import { setDrivers } from 'store/slices/driversSlice'
import { Details } from 'components/Details'
import { setPackages } from 'store/slices/packagesSlice'
import { ProfilePicture } from 'commons/ProfilePicture'
import { getAllPackages } from 'services/getAllPackages'
import { getAllDrivers } from 'services/getAllDrivers'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const Users = () => {
    const dispatch = useDispatch()
    const admin = useSelector((state: RootState) => state.admin)

    const fetchDrivers = async () => {
        const drivers = await getAllDrivers()
        dispatch(setDrivers(drivers))
    }

    const fetchPackages = async () => {
        const packages = await getAllPackages()
        dispatch(setPackages(packages))
    }

    useEffect(() => {
        void fetchDrivers()
        void fetchPackages()
    }, [])

    return (
        <BgLayout>
            <Link href={'/profile'}>
                <div className="text-primary font-poppins z-10 bg-customGreen rounded-lg flex flex-row items-center">
                    <div className="w-200 h-200 rounded-l-lg p-4 flex items-center">
                        <ProfilePicture profilePic={admin.profile_pic} />
                        <div className="ml-4">
                            <p className="font-bold text-lg">
                                ¡Hola {admin?.username.split(' ')[0].toString()}
                                !
                            </p>
                            <p>Ir al perfil</p>
                        </div>
                    </div>
                    <div className="ml-auto pr-4">
                        <BsArrowRight size={35} />
                    </div>
                </div>
            </Link>
            <div className="bg-white z-50 rounded-lg p-2 mt-2 w-full text-primary font-poppins">
                <div className="flex justify-center mx-auto ">
                    <p className="font-bold text-lg p-4">
                        ¡Bienvenido a Fast Delivery!
                    </p>
                </div>
            </div>
            <Details />
        </BgLayout>
    )
}

export default Users
