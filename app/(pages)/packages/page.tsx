'use client'
import React, { useEffect, useState } from 'react'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import PendingPackage from 'commons/PackageCard'
import { HiOutlinePlus } from 'react-icons/hi'
import Link from 'next/link'
import { getAllPackages } from 'services/getAllPackages'
import { getAllInProgress } from 'services/getAllInprogress'
import { getAllDelivered } from 'services/getAllDelivered'
import { getAllPending } from 'services/getAllPending'
import type IPackage from '../../../interfaces/IPackage'
import { deletePackage } from 'services/deletePackage'
import Swal from 'sweetalert2'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Packages = () => {
    const [currentPackages, setCurrentPackages] = useState<IPackage[]>([])

    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        vertical: true,
        verticalSwiping: true,
        // touchMove: false, sirve para que no se el slider al deslizar
    }

    const fetchAllPackages = async () => {
        try {
            const allPackages = await getAllPackages()
            setCurrentPackages(allPackages)
        } catch (error) {
            console.error('fetchAllPackages error', error)
        }
    }

    const fetchAllInProgress = async () => {
        try {
            const allPackages = await getAllInProgress()
            setCurrentPackages(allPackages)
        } catch (error) {
            console.error('fetchAllInProgress error', error)
        }
    }

    const fetchAllDelivered = async () => {
        try {
            const allPackages = await getAllDelivered()
            setCurrentPackages(allPackages)
        } catch (error) {
            console.error('fetchAllDelivered error', error)
        }
    }

    const fetchAllPending = async () => {
        try {
            const allPackages = await getAllPending()
            setCurrentPackages(allPackages)
        } catch (error) {
            console.error('fetchAllPending error', error)
        }
    }

    const handleDelete = async (packageId: string) => {
        try {
            const result = await Swal.fire({
                text: '¿Está seguro que deseas eliminar este paquete?',
                icon: 'warning',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                showCancelButton: true,
                confirmButtonColor: '#00EA77',
                cancelButtonColor: '#3D1DF3',
            })

            if (result.isConfirmed) {
                await deletePackage(packageId)
                const packagesFiltered = currentPackages.filter(
                    (packageToRemove) => packageToRemove._id !== packageId
                )
                setCurrentPackages(packagesFiltered)
                await Swal.fire({
                    text: 'Paquete eliminado correctamente!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            console.error('handleDelete error', error)
        }
    }

    useEffect(() => {
        void fetchAllPackages()
    }, [])

    return (
        <BgLayout>
            <LayoutContainer title={'Paquetes'} backUrl={'/home'}>
                <div>
                    <p className="text-primary text-sm font-bold mb-2">
                        {currentPackages.length} paquetes
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 mt-4 overflow-x-auto whitespace-nowrap">
                        <button
                            className={
                                'text-sm bg-customYellow px-3 rounded-full'
                            }
                            onClick={fetchAllInProgress}
                        >
                            EN CURSO
                        </button>

                        <button
                            className={
                                'text-sm bg-customGreen px-3 rounded-full text-primary'
                            }
                            onClick={fetchAllDelivered}
                        >
                            ENTREGADO
                        </button>
                        <button
                            className={'text-sm bg-secondary px-3 rounded-full'}
                            onClick={fetchAllPending}
                        >
                            PENDIENTE
                        </button>
                        <button
                            className={
                                'text-sm bg-primary px-3 rounded-full text-white '
                            }
                            onClick={fetchAllPackages}
                        >
                            ALL
                        </button>
                    </div>
                </div>
                {currentPackages.length > 0 ? (
                    <div className="flex flex-col gap-4 overflow-auto max-h-[80vh]">
                        <Slider className="mb-8 max-h-96" {...sliderSettings}>
                            {currentPackages.map((pkg) => (
                                <PendingPackage
                                    key={pkg._id}
                                    packageData={pkg}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div>No hay paquetes</div>
                )}
                <div className="w-[46px] h-[46px] ml-auto mt-4 sticky bottom-4">
                    <div className="w-[46px] h-[46px] left-0 top-0 absolute bg-secondary rounded-full shadow-md flex items-center justify-center">
                        <Link href={'/add-package'}>
                            <HiOutlinePlus size={28} />
                        </Link>
                    </div>
                </div>
            </LayoutContainer>
        </BgLayout>
    )
}

export default Packages
