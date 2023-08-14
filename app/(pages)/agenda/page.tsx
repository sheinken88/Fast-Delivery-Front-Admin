'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import type { RootState } from '../../../src/store/store'
import { loadUsers } from 'services/usersService'
import { setUsers } from 'store/slices/usersSlice'
import { Details } from 'components/Details'
import { setPackages } from 'store/slices/packagesSlice'
import { loadPackages } from 'services/packagesService'
import { ProfilePicture } from 'commons/ProfilePicture'
import WeekdayCarousel from 'components/WeekdayCarousel'

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users.users)
    const packages = useSelector((state: RootState) => state.packages.packages)

    useEffect(() => {
        dispatch(setUsers(loadUsers()))
        dispatch(setPackages(loadPackages()))
    }, [dispatch])

    return (
        <BgLayout>
            <LayoutContainer title={'agenda'}>
                <div className="flex items-center mb-6">
                    <ProfilePicture />
                    <div className="flex flex-col ml-4">
                        <p className="font-semibold">¡Hola Admin!</p>
                        <p className="text-sm">Estos son lospedidos del día</p>
                    </div>
                </div>
                <WeekdayCarousel />
                <Details users={users} packages={packages} />
            </LayoutContainer>
        </BgLayout>
    )
}

export default Users
