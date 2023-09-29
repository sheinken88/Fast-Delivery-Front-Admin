'use client'
import LayoutContainer from '../../../app/layoutContainer'
import { Button } from 'commons/generic/Button'
import type { RootState } from 'store/store'
import { BgLayout } from '../../bgLayout'
import { useSelector } from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import useInput from 'hooks/useInput'
import Swal from 'sweetalert2'
import React, { useState } from 'react'
import { ProfilePicture } from 'commons/ProfilePicture'
import { updateUserProfile } from '../../../src/services/updateUserProfile'
import EditableInput from 'commons/generic/editableInput'

export interface FormValues {
    username: string | undefined
    email: string | undefined
}

const Profile: React.FC = () => {
    const user = useSelector((state: RootState) => state.admin)
    const username = useInput(
        typeof user.username === 'string' ? user.username : ''
    )
    const email = useInput(user != null ? user.email : '')
    const [isEditing, setIsEditing] = useState(false)

    const changeEditing = () => {
        setIsEditing(!isEditing)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsEditing(false)
            const userData: FormValues = {
                username: username.value,
                email: email.value,
            }
            if (user !== null) {
                await updateUserProfile(user._id, userData)
                await Swal.fire({
                    text: '¡Perfil actualizado exitosamente!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            console.error('Error al actualizar el perfil', error)
            await Swal.fire({
                text: 'No se pudo actualizar el perfil. Por favor, inténtalo de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Ok',
            })
        }
    }

    return (
        <BgLayout>
            <LayoutContainer title={'Profile'} backUrl={'/home'}>
                <div>
                    <div className="bg-gray-100 w-full h-[150px] flex items-center justify-center relative">
                        <div className="absolute top-4 right-4">
                            <FaEdit className="text-xl text-primary cursor-pointer" />
                        </div>
                        <ProfilePicture />
                    </div>
                    <EditableInput
                        name="username"
                        value={username.value}
                        isEditing={isEditing}
                        onChange={username.onChange}
                    />
                    <EditableInput
                        name="email"
                        value={email.value}
                        isEditing={isEditing}
                        onChange={email.onChange}
                    />
                    {isEditing ? (
                        <div>
                            <Button
                                type="submit"
                                customStyle="mt-8 mb-4 mx-auto font-semibold block"
                                onClick={
                                    handleSubmit as () => void | Promise<void>
                                }
                            >
                                Guardar
                            </Button>

                            <Button
                                type="button"
                                customStyle="mt-8 mb-4 mx-auto block font-bold red-button"
                                onClick={changeEditing}
                            >
                                Cancelar
                            </Button>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            customStyle="mt-8 mb-4 mx-auto font-semibold block"
                            onClick={changeEditing}
                        >
                            Editar
                        </Button>
                    )}
                </div>
            </LayoutContainer>
        </BgLayout>
    )
}

export default Profile
