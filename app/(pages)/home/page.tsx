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
// import WeekdayCarousel from 'components/WeekdayCarousel'

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
                <div className="text-primary font-poppins z-10 bg-customGreen rounded-lg flex flex-col items-center">
                    <div className="flex justify-center w-200 h-200 rounded-t-lg py-4 ">
                        <ProfilePicture />
                        <div className="flex flex-col ml-4 mt-1">
                            <p className="font-bold text-lg">
                                ¡Hola {admin?.username.split(' ')[0].toString()}
                                !
                            </p>
                            <p className="">¡Bienvenido a Fast Delivery!</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="bg-white z-50 rounded-lg p-2 mt-2 w-full text-primary font-poppins">
                <div className="flex justify-center mx-auto ">
                    <p>Hola</p>
                </div>
            </div>
            <Details />
        </BgLayout>
    )
}

export default Users
