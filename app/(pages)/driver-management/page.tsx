'use client'
import React from 'react'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CircularProgressBar from 'common/CircularProgressBar'

const usersData = [
    {
        id: 1,
        name: 'Usuario 1',
        active: true,
        percentage: 70,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
    },
    {
        id: 2,
        name: 'Usuario 2',
        active: false,
        percentage: 30,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
    },
    {
        id: 3,
        name: 'Usuario 3',
        active: true,
        percentage: 50,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
    },
    {
        id: 4,
        name: 'Usuario 4',
        active: true,
        percentage: 100,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
    },
    {
        id: 5,
        name: 'Usuario 5',
        active: false,
        percentage: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
    },
    {
        id: 6,
        name: 'Usuario 6',
        active: true,
        percentage: 70,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
    },
    {
        id: 7,
        name: 'Usuario 7',
        active: true,
        percentage: 35,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHsLLn9kI96lYuAtvgOvqUxJUIKq28iXDgQ&usqp=CAU',
    },
]

const DriverManagement = () => {
    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const usersInGroupsOfFour = []

    for (let i = 0; i < usersData.length; i += 4) {
        const group = usersData.slice(i, i + 4)
        usersInGroupsOfFour.push(group)
    }

    return (
        <BgLayout>
            <LayoutContainer title={'Repartidores'}>
                <Slider className="mb-8" {...sliderSettings}>
                    {usersInGroupsOfFour.map((userGroup, index) => (
                        <div key={index} className="flex w-80 md:w-96 ">
                            {userGroup.map((user) => (
                                <div
                                    key={user.id}
                                    className="inset-0 border-t border-primary border-dashed flex items-center p-4"
                                >
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
