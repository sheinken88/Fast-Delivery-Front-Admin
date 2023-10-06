import Link from 'next/link'
import type IDriver from '../../interfaces/IDriver'
import CircularProgressBar from 'commons/CircularProgressBar'
import Tag from 'commons/Tag'
import { DriversPictures } from 'commons/DriversPictures'
import { useEffect, useState } from 'react'
import { getDriverDeliveredPackages } from 'services/getDriverDeliveredPackages'

interface DriverInfoProps {
    driver: IDriver
    key: number
}

export const DriverInfo: React.FC<DriverInfoProps> = ({ driver, key }) => {
    const [progress, setProgress] = useState(0)

    const fetchProgress = async () => {
        try {
            const packages = await getDriverDeliveredPackages(driver._id)
            const theProgress = (packages.length / 10) * 100
            setProgress(theProgress)
        } catch (error) {
            console.error('fetchProgress error', error)
        }
    }

    useEffect(() => {
        void fetchProgress()
    }, [])

    return (
        <div className="flex w-80 md:w-96 ">
            <Link href={`/driver-details/${driver._id}`} key={driver._id}>
                <div
                    className={`inset-0 ${
                        key === 0 || key % 4 === 0
                            ? 'border-t border-primary border-dashed'
                            : ''
                    } flex items-center p-4`}
                >
                    <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center mr-4">
                        <CircularProgressBar progress={progress} />
                    </div>
                    <div className="flex-grow">
                        <h1 className="font-bold text-lg">{driver.username}</h1>
                        <Tag
                            status={driver?.status}
                            value={driver?.status ? 'ACTIVE' : 'INACTIVE'}
                        />
                    </div>

                    <div className="flex-shrink-0 w-14 h-14 rounded-full">
                        <DriversPictures picture={driver.profile_pic} />
                    </div>
                </div>
            </Link>
            <div className="inset-0 border-b border-primary border-dashed"></div>
        </div>
    )
}
