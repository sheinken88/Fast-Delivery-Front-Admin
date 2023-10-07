import React from 'react'
import type { FC } from 'react'
import { IconContext } from 'react-icons'
import { PiPackageLight } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import type IPackage from '../../interfaces/IPackage'
import Link from 'next/link'

interface PackageCardProps {
    packageData: IPackage
    handleDelete?: (packageId: string) => void
}

const PackageCard: FC<PackageCardProps> = ({ packageData, handleDelete }) => {
    return (
        <div
            key={packageData._id}
            className="flex items-center gap-4 border border-primary rounded-lg p-2"
        >
            <div id="cajita">
                <IconContext.Provider
                    value={{
                        color: '#3D1DF3',
                        size: '32px',
                    }}
                >
                    <PiPackageLight />
                </IconContext.Provider>
            </div>
            <div id="info pkg" className="flex flex-col w-full">
                <Link
                    href={`/package-details/${packageData._id}`}
                    key={packageData._id}
                >
                    <div className="flex justify-between text-primary font-bold text-xs">
                        <p>#{packageData._id}</p>
                        {packageData.status === 'in progress' ? (
                            <p className="bg-customYellow px-3 rounded-full">
                                EN CURSO
                            </p>
                        ) : packageData.status === 'pending' ? (
                            <p className="bg-secondary px-3 rounded-full">
                                PENDIENTE
                            </p>
                        ) : packageData.status === 'delivered' ? (
                            <p className="bg-customGreen px-3 rounded-full text-primary">
                                ENTREGADO
                            </p>
                        ) : null}
                    </div>
                </Link>
                <div className="flex justify-between items-center">
                    <Link
                        href={`/package-details/${packageData._id}`}
                        key={packageData._id}
                    >
                        <div className="flex flex-col mt-2 text-primary text-xs">
                            <p>{packageData.address},</p>
                            <p>{packageData.city}</p>
                        </div>
                    </Link>
                    {packageData.status === 'pending' && (
                        <button
                            onClick={() => {
                                if (handleDelete !== undefined)
                                    handleDelete(packageData._id)
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    color: 'red',
                                    size: '16px',
                                }}
                            >
                                <RiDeleteBin6Line />
                            </IconContext.Provider>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PackageCard
