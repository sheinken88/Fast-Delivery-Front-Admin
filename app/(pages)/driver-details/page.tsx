'use client'
import { ProfilePicture } from 'common/ProfilePicture'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import Tag from 'common/Tag'
import ToggleSwitch from 'common/toggleSwitch'
import { Pending } from '../../../src/components/Pending'
import { History } from '../../../src/components/History'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setPackages } from 'store/slices/packagesSlice'
import { loadPackages } from 'services/packagesService'
import type { RootState } from 'store/store'

const DriverDetails = () => {
    const dispatch = useDispatch()
    const pendingPackages = useSelector((state: RootState) =>
        state.packages.packages.filter((pkg) => pkg.status === 'pendiente')
    )
    const deliveredPackages = useSelector((state: RootState) =>
        state.packages.packages.filter((pkg) => pkg.status === 'entregado')
    )

    useEffect(() => {
        dispatch(setPackages(loadPackages()))
    }, [dispatch])

    const value = () => {
        const nothing = null
    }

    return (
        <>
            <BgLayout>
                <LayoutContainer title="Perfil del repartidor">
                    <div className="flex p-2">
                        <ProfilePicture />
                        <div className="p-2 px-2">
                            <div>Farid</div>
                            <Tag>ACTIVO</Tag>
                        </div>
                        <div className="flex-1 flex justify-end items-center">
                            <ToggleSwitch onClick={value} />
                        </div>
                    </div>
                </LayoutContainer>
                <div className="py-4">
                    <Pending packages={pendingPackages} />
                    <History packages={deliveredPackages} />
                </div>
            </BgLayout>
        </>
    )
}

export default DriverDetails
