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
import Tag from 'commons/Tag'
import { DriverInfo } from 'components/DriverInfo'

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
                        <DriverInfo driver={driver} key={index} />
                    ))}
                </Slider>
            </LayoutContainer>
        </BgLayout>
    )
}

export default DriverManagement
