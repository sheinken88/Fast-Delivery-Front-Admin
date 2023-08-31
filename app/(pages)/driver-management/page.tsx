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
import { setUsers } from 'store/slices/usersSlice'
import { loadUsers } from 'services/usersService'
import Link from 'next/link'

const DriverManagement = () => {
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users.users)

    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    useEffect(() => {
        dispatch(setUsers(loadUsers()))
    }, [dispatch])

    const usersInGroupsOfFour = []

    for (let i = 0; i < users.length; i += 4) {
        const group = users.slice(i, i + 4)
        usersInGroupsOfFour.push(group)
    }
    console.log('usersInGroupsOfFour', usersInGroupsOfFour)

    return (
        <BgLayout>
            <LayoutContainer title={'Repartidores'} backUrl={'/agenda'}>
                <Slider className="mb-8" {...sliderSettings}>
                    {usersInGroupsOfFour.map((userGroup, index) => (
                        <div key={index} className="flex w-80 md:w-96 ">
                            {userGroup.map((user) => (
                                <Link
                                    href={`/driver-details/${user.id}`}
                                    key={user.id}
                                >
                                    <div className="inset-0 border-t border-primary border-dashed flex items-center p-4">
                                        <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center mr-4">
                                            <CircularProgressBar
                                                progress={user.percentage}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h1 className="font-bold text-lg">
                                                {user.name}
                                            </h1>
                                            <p className="text-sm">
                                                {user.active
                                                    ? 'Activo'
                                                    : 'Inactivo'}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 w-14 h-14 rounded-full">
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                    </div>
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
