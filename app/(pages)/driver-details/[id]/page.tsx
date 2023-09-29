'use client'
// import { ProfilePicture } from 'commons/ProfilePicture'
// import { BgLayout } from '../../../bgLayout'
// import LayoutContainer from '../../../layoutContainer'
// import Tag from 'commons/Tag'
// import ToggleSwitch from 'commons/toggleSwitch'
// import { Pending } from '../../../../src/components/Pending'
// import { History } from '../../../../src/components/History'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import type { RootState } from 'store/store'

// import { loadUsers } from 'services/usersService'
// import { setUsers } from 'store/slices/usersSlice'

const DriverDetails = ({ params }: { params: { id: string } }) => {
    // const dispatch = useDispatch()
    // const user = useSelector((state: RootState) =>
    //     state.users.users.find((user) => user.id.toString() === params.id)
    // )

    // const pendingPackages = (user?.packages ?? []).filter(
    //     (pkg) => pkg.status === 'pendiente'
    // )
    // const deliveredPackages = (user?.packages ?? []).filter(
    //     (pkg) => pkg.status === 'entregado'
    // )
    // console.log('pendingPackages: ', pendingPackages)

    // useEffect(() => {
    //     dispatch(setUsers(loadUsers()))
    // }, [dispatch])

    return (
        <>
            {/* <BgLayout>
                <LayoutContainer
                    title="Perfil del repartidor"
                    backUrl={'/driver-management'}
                >
                    <div className="flex p-2">
                        <ProfilePicture profileImg={user?.image} />
                        <div className="p-2 px-2">
                            <div>{user?.name}</div>
                            <Tag>
                                {user?.active !== null ? 'ACTIVE' : 'INACTIVE'}
                            </Tag>
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
            </BgLayout> */}
        </>
    )
}

export default DriverDetails
