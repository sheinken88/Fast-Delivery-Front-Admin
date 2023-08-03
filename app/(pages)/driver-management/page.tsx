'use client'
import React from 'react'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
                <Slider {...sliderSettings}>
                    {usersInGroupsOfFour.map((userGroup, index) => (
                        <div key={index} className="flex">
                            {userGroup.map((user) => (
                                <div key={user.id} className="p-1">
                                    <div className="rounded-lg border p-4">
                                        <h3>{user.name}</h3>
                                        <p>
                                            {user.active
                                                ? 'Activo'
                                                : 'Inactivo'}
                                        </p>
                                        <p>{user.percentage}% de actividad</p>
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-32 h-32 rounded-full mt-4 mx-auto"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </Slider>
            </LayoutContainer>
        </BgLayout>
    )
}

export default DriverManagement

// 'use client'
// import React from 'react'
// import { BgLayout } from '../../bgLayout'
// import LayoutContainer from '../../layoutContainer'
// import 'swiper/css/swiper.css'

// const DriverManagement = () => {
//     return (
//         <BgLayout>
//             <LayoutContainer title={'Repartidores'}>
//                 <div></div>
//             </LayoutContainer>
//         </BgLayout>
//     )
// }

// export default DriverManagement
