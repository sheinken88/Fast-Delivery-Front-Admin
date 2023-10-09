import React, { useState } from 'react'
import type { FC } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import PackageCard from '../commons/PackageCard'
import type IPackage from '../../interfaces/IPackage'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface DeliveredProps {
    packages: IPackage[]
}

export const History: FC<DeliveredProps> = ({ packages }) => {
    const [isVisible, setIsVisible] = useState(true)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 10,
        slidesToScroll: 10,
        vertical: true,
        verticalSwiping: true,
        // touchMove: false, sirve para que no se el slider al deslizar
    }

    return (
        <div className="w-full bg-white p-4 rounded-xl">
            <div
                className="flex justify-between items-center font-bold text-primary mb-4 cursor-pointer"
                onClick={toggleVisibility}
            >
                <h2 className="text-lg">Historial de repartos</h2>
                <IconContext.Provider
                    value={{
                        color: '#3D1DF3',
                        size: '16px',
                    }}
                >
                    <BiSolidDownArrow />
                </IconContext.Provider>
            </div>
            <p className="text-primary text-sm mb-2">
                {packages.length} paquetes entregados
            </p>
            {isVisible && (
                <Slider className="mb-8" {...sliderSettings}>
                    {packages.map((pkg, index) => (
                        <PackageCard key={pkg._id} packageData={pkg} />
                    ))}
                </Slider>
            )}
        </div>
    )
}
