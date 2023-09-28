'use client'
// import CircularProgressBar from 'commons/CircularProgressBar'
import { getAllDrivers } from 'services/getAllDrivers'
import { useDispatch, useSelector } from 'react-redux'
import { setDrivers } from 'store/slices/driversSlice'
import LayoutContainer from '../../layoutContainer'
import 'slick-carousel/slick/slick-theme.css'
import type { RootState } from 'store/store'
import { BgLayout } from '../../bgLayout'
import React, { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import Slider from 'react-slick'
import Link from 'next/link'

const DriverManagement = () => {
    const dispatch = useDispatch()
    const drivers = useSelector((state: RootState) => state.drivers)

    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const fetchDrivers = async () => {
        const driverList = await getAllDrivers()
        dispatch(setDrivers(driverList))
    }

    useEffect(() => {
        void fetchDrivers()
    }, [dispatch])

    const fourDrivers = []

    for (let i = 0; i < drivers.length; i += 4) {
        const group = drivers.slice(i, i + 4)
        fourDrivers.push(group)
    }

    return (
        <BgLayout>
            <LayoutContainer title={'Repartidores'} backUrl={'/agenda'}>
                <Slider className="mb-8" {...sliderSettings}>
                    {fourDrivers.map((driverGroup, index) => (
                        <div key={index} className="flex w-80 md:w-96 ">
                            {driverGroup.map((d) => (
                                <Link
                                    href={`/driver-details/${d._id}`}
                                    key={d._id}
                                >
                                    {/* <div className="inset-0 border-t border-primary border-dashed flex items-center p-4">
                                        <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center mr-4">
                                            <CircularProgressBar
                                                progress={d.percentage}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h1 className="font-bold text-lg">
                                                {d.name}
                                            </h1>
                                            <p className="text-sm">
                                                {d.active
                                                    ? 'Activo'
                                                    : 'Inactivo'}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 w-14 h-14 rounded-full">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                    </div> */}
                                </Link>
                            ))}
                            <div className="inset-0 border-b border-primary border-dashed"></div>
                        </div>
                    ))}
                </Slider>
            </LayoutContainer>
        </BgLayout>
    )
}

export default DriverManagement
