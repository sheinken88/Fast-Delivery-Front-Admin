'use client'
import React, { useEffect } from 'react'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CircularProgressBar from 'commons/CircularProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import Link from 'next/link'
import { getAllDrivers } from 'services/getAllDrivers'
import { setDrivers } from 'store/slices/driversSlice'
import { DriversPictures } from 'commons/DriversPictures'

const DriverManagement = () => {
    const dispatch = useDispatch()
    const drivers = useSelector((state: RootState) => state.drivers)

    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesPerRow: 1,
        rows: 4,
    }

    const fetchAllDrivers = async () => {
        try {
            const allDrivers = await getAllDrivers()
            dispatch(setDrivers(allDrivers))
        } catch (error) {
            console.error('fetchAllDrivers error', error)
        }
    }

    useEffect(() => {
        void fetchAllDrivers()
    }, [])

    return (
        <BgLayout>
            <LayoutContainer title={'Repartidores'} backUrl={'/home'}>
                <Slider className="mb-8" {...sliderSettings}>
                    {drivers.map((driver, index) => (
                        <div key={index} className="flex w-80 md:w-96 ">
                            <Link
                                href={`/driver-details/${driver._id}`}
                                key={driver._id}
                            >
                                <div
                                    className={`inset-0 ${
                                        index === 0 || index % 4 === 0
                                            ? 'border-t border-primary border-dashed'
                                            : ''
                                    } flex items-center p-4`}
                                >
                                    <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center mr-4">
                                        <CircularProgressBar progress={50} />
                                    </div>
                                    <div className="flex-grow">
                                        <h1 className="font-bold text-lg">
                                            {driver.username}
                                        </h1>
                                        <p className="text-sm">
                                            {driver.status
                                                ? 'Activo'
                                                : 'Inactivo'}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full">
                                        <DriversPictures
                                            picture={driver.profile_pic}
                                        />
                                    </div>
                                </div>
                            </Link>
                            <div className="inset-0 border-b border-primary border-dashed"></div>
                        </div>
                    ))}
                </Slider>
            </LayoutContainer>
        </BgLayout>
    )
}

export default DriverManagement
