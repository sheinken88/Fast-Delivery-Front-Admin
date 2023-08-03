'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import type { RootState } from '../../../src/store/store'
import { loadPackages } from 'services/packagesService'
import { setPackages } from 'store/slices/packagesSlice'
import PendingPackage from 'common/PendingPkg'
import { HiOutlinePlus } from 'react-icons/hi'

const Packages = () => {
    const dispatch = useDispatch()
    const packages = useSelector((state: RootState) => state.packages.packages)

    useEffect(() => {
        dispatch(setPackages(loadPackages()))
    }, [dispatch])

    useEffect(() => {
        console.log(packages)
    }, [packages])

    return (
        <BgLayout>
            <LayoutContainer title={'Paquetes'}>
                <div>
                    <p className="text-primary text-sm font-bold mb-2">
                        {packages.length} paquetes
                    </p>
                </div>
                {packages.length > 0 ? (
                    <div className="flex flex-col gap-4 overflow-auto max-h-[80vh]">
                        {packages.map((pkg) => (
                            <PendingPackage key={pkg.id} packageData={pkg} />
                        ))}
                    </div>
                ) : (
                    <div>Loading packages...</div>
                )}
                <div className="w-[46px] h-[46px] relative ml-auto mt-4 sticky bottom-4">
                    <div className="w-[46px] h-[46px] left-0 top-0 absolute bg-secondary rounded-full shadow-md flex items-center justify-center">
                        <HiOutlinePlus size={28} />
                    </div>
                </div>
            </LayoutContainer>
        </BgLayout>
    )
}

export default Packages
