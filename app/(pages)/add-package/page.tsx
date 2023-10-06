'use client'
import React, { useState, useEffect } from 'react'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from 'commons/generic/Button'
import useInput from 'hooks/useInput'
import { createPackage } from 'services/createPackage'
import Swal from 'sweetalert2'

const AddPackage = () => {
    const receiverName = useInput('')
    const address = useInput('')
    const city = useInput('')
    const weight = useInput(0)
    const quantity = useInput(0)
    const [disabled, setDisabled] = useState(true)

    const handleAdd = async () => {
        try {
            const data = {
                receiver_name: receiverName.value,
                address: address.value,
                city: city.value,
                weight: weight.value,
                quantity: quantity.value,
            }
            const newPackage = await createPackage(data)
            if (newPackage !== null) {
                receiverName.reset()
                address.reset()
                city.reset()
                weight.reset()
                quantity.reset()
                await Swal.fire({
                    text: 'Paquete creado correctamente!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                })
            }
        } catch (error) {
            console.error('handleAdd error', error)
        }
    }

    useEffect(() => {
        if (
            receiverName.value !== '' &&
            address.value !== '' &&
            city.value !== '' &&
            weight.value !== 0 &&
            quantity.value !== 0
        ) {
            setDisabled(false)
        }
    }, [
        receiverName.value,
        address.value,
        city.value,
        weight.value,
        quantity.value,
    ])

    return (
        <BgLayout>
            <LayoutContainer title="Agregar paquetes" backUrl={'/packages'}>
                <div className="px-4">
                    <div className="text-sm">
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Nombre del destinatario"
                                className="w-full border-b border-primary placeholder-primary py-2"
                                value={receiverName.value}
                                onChange={receiverName.onChange}
                            />
                        </div>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Direccion"
                                className="w-full border-b border-primary placeholder-primary py-2"
                                value={address.value}
                                onChange={address.onChange}
                            />
                        </div>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Ciudad"
                                className="w-full border-b border-primary placeholder-primary py-2"
                                value={city.value}
                                onChange={city.onChange}
                            />
                        </div>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Peso del paquete (Kg)"
                                className="w-full border-b border-primary placeholder-primary py-2"
                                value={weight.value === 0 ? '' : weight.value}
                                onChange={weight.onChange}
                            />
                        </div>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Cantidad de paquetes"
                                className="w-full border-b border-primary placeholder-primary py-2"
                                value={
                                    quantity.value === 0 ? '' : quantity.value
                                }
                                onChange={quantity.onChange}
                            />
                        </div>
                        <div className="flex justify-center my-2"></div>
                    </div>
                    <div className="flex justify-between">
                        <Button
                            onClick={handleAdd}
                            customStyle={`${disabled ? 'bg-gray-500' : ''}`}
                            disabled={disabled}
                            type={'button'}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
            </LayoutContainer>
        </BgLayout>
    )
}

export default AddPackage
