'use client'
import { ProfilePicture } from 'commons/ProfilePicture'
import { BgLayout } from '../../../bgLayout'
import LayoutContainer from '../../../layoutContainer'
import Tag from 'commons/Tag'
import ToggleSwitch from 'commons/toggleSwitch'
import { InProgress } from '../../../../src/components/InProgress'
import { History } from '../../../../src/components/History'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import type IPackage from '../../../../interfaces/IPackage'
import { getDriverDeliveredPackages } from 'services/getDriverDeliveredPackages'
import { getDriverInProgressPackages } from 'services/getDriverInProgressPackages'
import { useEffect, useState } from 'react'

const DriverDetails = ({ params }: { params: { id: string } }) => {
    const driver = useSelector((state: RootState) =>
        state.drivers.find((driver) => driver._id.toString() === params.id)
    )
    const [deliveredPackages, setDeliveredPackages] = useState<IPackage[]>([])
    const [inProgressPackages, setInProgressPackages] = useState<IPackage[]>([])

    const fetchInProgressPackages = async () => {
        try {
            const inProgressPackages = await getDriverInProgressPackages({
                id: params.id,
            })

            setInProgressPackages(inProgressPackages)
        } catch (error) {
            console.error('fetchInProgressPackages error', error)
        }
    }

    const fetchDeliveredPackages = async () => {
        try {
            const deliveredPackages = await getDriverDeliveredPackages({
                id: params.id,
            })

            setDeliveredPackages(deliveredPackages)
        } catch (error) {
            console.error('fetchDeliveredPackages error', error)
        }
    }

    useEffect(() => {
        void fetchDeliveredPackages()
        void fetchInProgressPackages()
    }, [])

    return (
        <>
            <BgLayout>
                <LayoutContainer
                    title="Perfil del repartidor"
                    backUrl={'/driver-management'}
                >
                    <div className="flex p-2">
                        <ProfilePicture
                            profilePic={
                                driver !== undefined ? driver.profile_pic : ''
                            }
                        />
                        <div className="p-2 px-2">
                            <div>{driver?.username}</div>
                            <Tag
                                status={driver?.status}
                                value={driver?.status ? 'ACTIVE' : 'INACTIVE'}
                            />
                        </div>

                        <div className="flex-1 flex justify-end items-center">
                            <ToggleSwitch onClick={() => {}} />
                        </div>
                    </div>
                </LayoutContainer>
                <div className="py-4">
                    <InProgress packages={inProgressPackages} />
                    <History packages={deliveredPackages} />
                </div>
            </BgLayout>
        </>
    )
}

export default DriverDetails
