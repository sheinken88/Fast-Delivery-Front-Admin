'use client'
import CircularProgressBar from 'commons/CircularProgressBar'
import Image from 'next/image'
import React, { useState } from 'react'
import type { FC } from 'react'
import { IconContext } from 'react-icons'
import { BiSolidDownArrow } from 'react-icons/bi'

interface User {
    id: number
    name: string
    active: boolean
    percentage: number
    image: string
    packages: Package[]
}

interface Package {
    id: string
    address: string
    city: string
    status: string
}

interface DetailsProps {
    users: User[]
    packages: Package[]
}

export const Details: FC<DetailsProps> = ({ users, packages }) => {
    const [isVisible, setIsVisible] = useState(true)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const GetActiveUsers = (users: any) => {
        return users.filter((user: any) => user.active === true)
    }

    const PercentageActiveUsers = (users: any) => {
        const activeUsers = users.filter((user: any) => user.active === true)
        return Math.round((activeUsers.length / users.length) * 100)
    }

    const GetDeliveredPackages = (packages: any) => {
        return packages.filter((pkg: any) => pkg.status === 'entregado')
    }

    const PercentageDeliveredPackages = (packages: any) => {
        const deliveredPackages = packages.filter(
            (pkg: any) => pkg.status === 'entregado'
        )
        return Math.round((deliveredPackages.length / packages.length) * 100)
    }

    return (
        <div className="w-full bg-white p-4 rounded-xl border border-primary">
            <div
                className="flex justify-between items-center font-bold text-primary mb-4 cursor-pointer"
                onClick={toggleVisibility}
            >
                <h2 className="text-lg">Detalles</h2>
                <IconContext.Provider
                    value={{
                        color: '#3D1DF3',
                        size: '16px',
                    }}
                >
                    <BiSolidDownArrow />
                </IconContext.Provider>
            </div>
            {isVisible && (
                <div className="border-t border-dotted border-primary">
                    <div className="flex items-center mt-6">
                        <div className="flex-shrink-0 w-20 h-20 flex justify-center items-center mr-4">
                            <CircularProgressBar
                                progress={PercentageActiveUsers(users)}
                            />
                        </div>
                        <div>
                            <p className="text-primary font-bold">
                                Repartidores
                            </p>
                            <p className="text-sm">
                                {GetActiveUsers(users).length} / {users.length}{' '}
                                activos
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 mb-6 border-b border-dotted border-primary pb-8">
                        <div className="flex relative">
                            {GetActiveUsers(users)
                                .slice(0, 4)
                                .map((user: any, index: number) => (
                                    <div
                                        key={user.id}
                                        style={{
                                            marginLeft:
                                                index !== 0 ? '-15px' : '0',
                                        }}
                                        className="z-10 overflow-hidden rounded-full"
                                    >
                                        <Image
                                            src={user.image}
                                            alt={user.name}
                                            width={30}
                                            height={30}
                                            className="border-2 border-white w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                ))}
                            {GetActiveUsers(users).length > 4 && (
                                <div
                                    style={{ marginLeft: '5px' }}
                                    className="z-10"
                                >
                                    ...
                                </div>
                            )}
                        </div>
                        <button className="bg-secondary text-primary font-medium py-1 px-4 rounded-2xl">
                            Ver
                        </button>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-20 h-20 flex justify-center items-center mr-4">
                            <CircularProgressBar
                                progress={PercentageDeliveredPackages(packages)}
                            />
                        </div>
                        <div>
                            <p className="text-primary font-bold">Paquetes</p>
                            <p className="text-sm">
                                {GetDeliveredPackages(packages).length} /{' '}
                                {packages.length} repartidos
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-4">
                        <button className="bg-secondary text-primary font-medium py-1 px-4 rounded-2xl">
                            Ver
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
