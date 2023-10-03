'use client'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../../app/layoutContainer'
import { Button } from 'commons/generic/Button'
import useInput from 'hooks/useInput'
import { updateUserProfile } from '../../../src/services/updateUserProfile'
import EditableInput from 'commons/generic/editableInput'
import ImageUploader from 'components/ImageUploader'

export interface FormValues {
    username: string | undefined
    email: string | undefined
    profile_pic: string | undefined
}

const Profile: React.FC = () => {
    const user = useSelector((state: RootState) => state.admin)
    const username = useInput(
        typeof user.username === 'string' ? user.username : ''
    )
    const email = useInput(user != null ? user.email : '')
    const [isEditing, setIsEditing] = useState(false)
    const [selectedImage, setSelectedImage] = useState(user.profile_pic)

    const changeEditing = () => {
        setIsEditing(!isEditing)
    }

    const handleSubmit = async () => {
        const data = new FormData()
        data.append('file', selectedImage)
        data.append('upload_preset', 'hy4lupmz')
        data.append('cloud_name', 'db3pcwsrm')
        const folder = 'fast-delivery/profile_pictures/admins'
        void fetch(
            `https://api.cloudinary.com/v1_1/db3pcwsrm/image/upload?folder=${folder}`,
            {
                method: 'post',
                body: data,
            }
        )
            .then(async (res) => {
                if (res.ok) return await res.json()
            })
            .then(
                async (data) =>
                    await updateUserProfile(user._id, { profile_pic: data.url })
            )
            .then(async () => {
                await Swal.fire({
                    icon: 'success',
                    text: 'Subida correctamente',
                })
            })
    }

    return (
        <BgLayout>
            <LayoutContainer title={'Profile'} backUrl={'/home'}>
                <div>
                    {!isEditing ? (
                        <div
                            className="flex justify-center items-center w-full"
                            style={{
                                backgroundColor: 'lightgrey',
                                height: 120,
                            }}
                        >
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                className="h-20 w-20 border rounded-full"
                            />
                        </div>
                    ) : (
                        <ImageUploader
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                        />
                    )}
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
