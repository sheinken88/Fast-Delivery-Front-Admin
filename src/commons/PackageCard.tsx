import React from 'react'
import type { FC } from 'react'
import { IconContext } from 'react-icons'
import { PiPackageLight } from 'react-icons/pi'
import { RiDeleteBin6Line } from 'react-icons/ri'

interface Package {
    _id: string
    address: string
    city: string
    status: string
}

interface PackageCardProps {
    packageData: Package
}

const PackageCard: FC<PackageCardProps> = ({ packageData }) => {
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
                <div className="flex justify-between text-primary font-bold text-xs">
                    <p>#{packageData._id}</p>
                    {packageData.status === 'en curso' ? (
                        <p className="bg-customYellow px-3 rounded-full">
                            EN CURSO
                        </p>
                    ) : packageData.status === 'pendiente' ? (
                        <p className="bg-secondary px-3 rounded-full">
                            PENDIENTE
                        </p>
                    ) : packageData.status === 'entregado' ? (
                        <p className="bg-customGreen px-3 rounded-full text-primary">
                            ENTREGADO
                        </p>
                    ) : null}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col mt-2 text-primary text-xs">
                        <p>{packageData.address},</p>
                        <p>{packageData.city}</p>
                    </div>
                    <IconContext.Provider
                        value={{
                            color: 'red',
                            size: '16px',
                        }}
                    >
                        <RiDeleteBin6Line />
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default PackageCard
