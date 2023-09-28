'use client'
// import CircularProgressBar from 'commons/CircularProgressBar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type IPackage from '../../interfaces/IPackage'
import type IDriver from '../../interfaces/IDriver'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'

export const Details = () => {
    const drivers = useSelector((state: RootState) => state.drivers)
    const packages = useSelector((state: RootState) => state.packages)

    const [activeDrivers, setActiveDrivers] = useState<IDriver[]>([])

    const fetchActiveDrivers = () => {
        const filteredDrivers = drivers.filter(
            (driver: IDriver) => driver.status
        )
        setActiveDrivers(filteredDrivers)
    }

    // const percentageActiveDrivers = (drivers: IDriver[]) => {
    //     return Math.round((activeDrivers.length / drivers.length) * 100)
    // }

    const getDeliveredPackages = (packages: IPackage[]) => {
        return packages.filter((pkg: any) => pkg.status === 'delivered')
    }

    // const percentageDeliveredPackages = (packages: IPackage[]) => {
    //     const deliveredPackages = packages.filter(
    //         (pkg: IPackage) => pkg.status === 'delivered'
    //     )
    //     return Math.round((deliveredPackages.length / packages.length) * 100)
    // }

    useEffect(() => {
        fetchActiveDrivers()
    }, [])

    return (
        <div className="w-full bg-white p-4 rounded-xl border border-primary mt-2">
            <div className="flex justify-between items-center font-bold text-primary mb-4 cursor-pointer">
                <h2 className="text-lg">Detalles</h2>
            </div>
            <div className="border-t border-dotted border-primary">
                <div className="flex items-center mt-6">
                    <div className="flex-shrink-0 w-20 h-20 flex justify-center items-center mr-4">
                        {/* <CircularProgressBar
                            progress={percentageActiveDrivers(drivers)}
                        /> */}
                    </div>
                    <div>
                        <p className="text-primary font-bold">Repartidores</p>
                        <p className="text-sm">
                            {activeDrivers.length} / {drivers.length} activos
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 mb-6 border-b border-dotted border-primary pb-8">
                    <div className="flex relative">
                        {activeDrivers
                            .slice(0, 4)
                            .map((d: any, index: number) => (
                                <div
                                    key={d.id}
                                    style={{
                                        marginLeft: index !== 0 ? '-ml-4' : '',
                                    }}
                                    className="z-10 overflow-hidden rounded-full"
                                >
                                    <div className="overflow-hidden rounded-full border-2 border-white">
                                        <Image
                                            src={d.profile_pic}
                                            alt={d.username}
                                            width={15}
                                            height={15}
                                            className=" object-cover object-center w-8 h-8"
                                        />
                                    </div>
                                </div>
                            ))}
                        {activeDrivers.length > 4 && (
                            <div
                                style={{ marginLeft: '5px' }}
                                className="z-10 self-center"
                            >
                                ...
                            </div>
                        )}
                    </div>
                    <Link href={'/driver-management'}>
                        <button className="bg-secondary text-primary font-medium py-1 px-4 rounded-2xl">
                            Ver
                        </button>
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-20 h-20 flex justify-center items-center mr-4">
                        {/* <CircularProgressBar
                            progress={percentageDeliveredPackages(packages)}
                        /> */}
                    </div>
                    <div>
                        <p className="text-primary font-bold">Paquetes</p>
                        <p className="text-sm">
                            {getDeliveredPackages(packages).length} /{' '}
                            {packages.length} repartidos
                        </p>
                    </div>
                </div>
                <div className="flex justify-end items-center mt-4">
                    <Link href={'/packages'}>
                        <button className="bg-secondary text-primary font-medium py-1 px-4 rounded-2xl">
                            Ver
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
