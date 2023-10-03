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
// import { AiFillEdit } from 'react-icons/ai'

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
    const [imageUrl, setImageUrl] = useState()

    const changeEditing = () => {
        setIsEditing(!isEditing)
    }

    const handleSubmit = async () => {
        const data = new FormData()
        data.append('file', selectedImage)
        data.append('upload_preset', 'hy4lupmz')
        data.append('cloud_name', 'db3pcwsrm')
        const folder = 'fast-delivery/profile_pictures/admins'

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/db3pcwsrm/image/upload?folder=${folder}`,
                {
                    method: 'post',
                    body: data,
                }
            )
            if (response.ok) {
                const data = await response.json()
                setImageUrl(data.url)
                if (data.url !== null) {
                    await Swal.fire({
                        icon: 'success',
                        text: 'Imagen cambiada con éxito!',
                        confirmButtonText: 'De acuerdo',
                        showConfirmButton: true,
                    })

                    await updateUserProfile(user._id, {
                        profile_pic: imageUrl,
                    })
                    setIsEditing(false)
                }
            } else {
                await Swal.fire({
                    icon: 'error',
                    text: 'Error en la carga de la imagen',
                    confirmButtonText: 'De acuerdo',
                    showConfirmButton: true,
                })
                console.error(
                    'Error en la carga:',
                    response.status,
                    response.statusText
                )

                setTimeout(handleSubmit, 5000)
            }
        } catch (error) {
            console.error('Error en la carga:', error)
            setTimeout(handleSubmit, 5000)
        }
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
