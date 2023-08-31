'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import type { RootState } from '../../../src/store/store'
import { loadPackages } from 'services/packagesService'
import { setPackages } from 'store/slices/packagesSlice'
import PendingPackage from 'commons/PackageCard'
import { HiOutlinePlus } from 'react-icons/hi'
import Link from 'next/link'

const Packages = () => {
    const dispatch = useDispatch()
    const packages = useSelector((state: RootState) => state.packages.packages)

    const [selectedFilter, setSelectedFilter] = useState('todos')

    useEffect(() => {
        dispatch(setPackages(loadPackages()))
    }, [dispatch])

    const filteredPackages =
        selectedFilter === 'todos'
            ? packages
            : packages.filter((pkg) => pkg.status === selectedFilter)

    return (
        <BgLayout>
            <LayoutContainer title={'Paquetes'} backUrl={'/agenda'}>
                <div>
                    <p className="text-primary text-sm font-bold mb-2">
                        {packages.length} paquetes
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 mt-4 overflow-x-auto whitespace-nowrap">
                        <button
                            className={`text-sm bg-customYellow px-3 rounded-full ${
                                selectedFilter === 'en curso' ? 'font-bold' : ''
                            }`}
                            onClick={() => {
                                setSelectedFilter('en curso')
                            }}
                        >
                            EN CURSO
                        </button>

                        <button
                            className={`text-sm bg-customGreen px-3 rounded-full text-primary ${
                                selectedFilter === 'entregado'
                                    ? 'font-bold'
                                    : ''
                            }`}
                            onClick={() => {
                                setSelectedFilter('entregado')
                            }}
                        >
                            ENTREGADO
                        </button>
                        <button
                            className={`text-sm bg-secondary px-3 rounded-full ${
                                selectedFilter === 'pendiente'
                                    ? 'font-bold'
                                    : ''
                            }`}
                            onClick={() => {
                                setSelectedFilter('pendiente')
                            }}
                        >
                            PENDIENTE
                        </button>
                        <button
                            className={`text-sm bg-primary px-3 rounded-full text-white ${
                                selectedFilter === 'todos' ? 'font-bold' : ''
                            }`}
                            onClick={() => {
                                setSelectedFilter('todos')
                            }}
                        >
                            ALL
                        </button>
                    </div>
                </div>
                {filteredPackages.length > 0 ? (
                    <div className="flex flex-col gap-4 overflow-auto max-h-[80vh]">
                        {filteredPackages.map((pkg) => (
                            <PendingPackage key={pkg.id} packageData={pkg} />
                        ))}
                    </div>
                ) : (
                    <div>Loading packages...</div>
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
