'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type IDriver from '../../interfaces/IDriver'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import { AiOutlineReload } from 'react-icons/ai'
import CircularProgressBar from 'commons/CircularProgressBar'
import Image from 'next/image'
import { getAllDelivered } from 'services/getAllDelivered'
import { getActiveDrivers } from 'services/getActiveDrivers'
import { getAllPackages } from 'services/getAllPackages'
import { getAllDrivers } from 'services/getAllDrivers'
import { setDrivers } from 'store/slices/driversSlice'

export const Details = () => {
    const dispatch = useDispatch()
    const drivers = useSelector((state: RootState) => state.drivers)
    const [deliveredPackages, setDeliveredPackages] = useState([])
    const [packages, setPackages] = useState([])
    const [activeDrivers, setActiveDrivers] = useState<IDriver[]>([])
    const [driverProgress, setDriverProgress] = useState(0)
    const [packagesProgress, setPackagesProgress] = useState(0)

    const fetchAllDrivers = async () => {
        try {
            const allDrivers = await getAllDrivers()
            dispatch(setDrivers(allDrivers))
        } catch (error) {
            console.error('fetchDeliveredPackages error', error)
        }
    }

    const fetchActiveDrivers = async () => {
        try {
            await fetchAllDrivers()
            const actives = await getActiveDrivers()
            if (activeDrivers.length !== actives.length)
                setActiveDrivers(actives)
            if (drivers.length > 0)
                setDriverProgress(
                    Math.round((actives.length / drivers.length) * 100)
                )
        } catch (error) {
            console.error('fetchDeliveredPackages error', error)
        }
    }

    const fetchAllPackages = async () => {
        try {
            const allPackages = await getAllPackages()
            setPackages(allPackages)
        } catch (error) {
            console.error('fetchDeliveredPackages error', error)
        }
    }

    const fetchDeliveredPackages = async () => {
        try {
            await fetchAllPackages()
            const allDelivered = await getAllDelivered()
            if (deliveredPackages.length !== allDelivered.length)
                setDeliveredPackages(allDelivered)
            if (packages.length > 0)
                setPackagesProgress(
                    Math.round(
                        (deliveredPackages.length / packages.length) * 100
                    )
                )
        } catch (error) {
            console.error('fetchDeliveredPackages error', error)
        }
    }

    const fetchAll = () => {
        void fetchActiveDrivers()
        void fetchDeliveredPackages()
    }

    useEffect(() => {
        fetchAll()
    }, [activeDrivers, deliveredPackages])

    return (
        <div className="w-full bg-white p-4 rounded-xl border border-primary mt-2">
            <div className="flex justify-between items-center font-bold text-primary mb-4 cursor-pointer">
                <h2 className="text-lg">Detalles</h2>
                <button className="mr-1" onClick={fetchAll}>
                    <AiOutlineReload size={25} />
                </button>
            </div>
            <div className="border-t border-dotted border-primary">
                <div className="flex items-center mt-6">
                    <div className="flex-shrink-0 w-20 h-20 flex justify-center items-center mr-4">
                        <CircularProgressBar progress={driverProgress} />
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
                                    key={d._id}
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
                        <CircularProgressBar progress={packagesProgress} />
                    </div>
                    <div>
                        <p className="text-primary font-bold">Paquetes</p>
                        <p className="text-sm">
                            {deliveredPackages.length} / {packages.length}{' '}
                            repartidos
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
