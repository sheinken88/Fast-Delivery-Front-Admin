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
            <LayoutContainer title={'Paquetes'}>
                <div>
                    <p className="text-primary text-sm font-bold mb-2">
                        {packages.length} paquetes
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 mt-4 overflow-x-auto whitespace-nowrap">
                        <button
                            className="text-sm bg-customYellow px-3 rounded-full"
                            onClick={() => {
                                setSelectedFilter('en curso')
                            }}
                        >
                            EN CURSO
                        </button>

                        <button
                            className="text-sm bg-customGreen px-3 rounded-full text-primary"
                            onClick={() => {
                                setSelectedFilter('entregado')
                            }}
                        >
                            ENTREGADO
                        </button>
                        <button
                            className="text-sm bg-secondary px-3 rounded-full"
                            onClick={() => {
                                setSelectedFilter('pendiente')
                            }}
                        >
                            PENDIENTE
                        </button>
                        <button
                            className="text-sm bg-primary px-3 rounded-full text-white"
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
                        <HiOutlinePlus size={28} />
                    </div>
                </div>
            </LayoutContainer>
        </BgLayout>
    )
}

export default Packages
