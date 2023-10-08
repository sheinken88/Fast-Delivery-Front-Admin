'use client'
import { BgLayout } from '../../../bgLayout'
import LayoutContainer from '../../../layoutContainer'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from 'store/store'
import { Button } from 'commons/generic/Button'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useInput from 'hooks/useInput'
import { editPackage } from 'services/editPackage'
import { setPackageChanged } from 'store/slices/packagesSlice'
import { deletePackage } from 'services/deletePackage'
import { useRouter } from 'next/navigation'

const PackageDetail = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const packageSelected = useSelector((state: RootState) =>
        state.packages.find(
            (packageFilter) => packageFilter._id.toString() === params.id
        )
    )

    const receiverName = useInput(packageSelected?.receiver_name)
    const address = useInput(packageSelected?.address)
    const city = useInput(packageSelected?.city)
    const weight = useInput(packageSelected?.weight)
    const quantity = useInput(packageSelected?.quantity)
    const [disabled, setDisabled] = useState(false)

    const handleEditPackage = async () => {
        try {
            const data = {
                receiver_name: receiverName.value,
                address: address.value,
                city: city.value,
                weight: weight.value,
                quantity: quantity.value,
            }
            if (packageSelected?._id) {
                const newPackage = await editPackage(packageSelected?._id, data)

                if (newPackage !== null) {
                    await Swal.fire({
                        text: 'Paquete editado correctamente!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    })
                    dispatch(setPackageChanged(newPackage))
                }
            }
        } catch (error) {
            console.error('handleAdd error', error)
        }
    }

    const handleDelete = async () => {
        try {
            if (packageSelected?._id) {
                const result = await Swal.fire({
                    text: '¿Está seguro que deseas eliminar este paquete?',
                    icon: 'warning',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    showCancelButton: true,
                    confirmButtonColor: '#00EA77',
                    cancelButtonColor: '#3D1DF3',
                })

                if (result.isConfirmed) {
                    await deletePackage(packageSelected._id)
                    await Swal.fire({
                        text: 'Paquete eliminado correctamente!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    })
                    router.push('/packages')
                }
            }
        } catch (error) {
            console.error('handleDelete error', error)
        }
    }

    useEffect(() => {
        if (
            receiverName.value === '' ||
            address.value === '' ||
            city.value === '' ||
            !weight.value ||
            !quantity.value ||
            parseFloat(weight.value.toString()) === 0 ||
            parseFloat(quantity.value.toString()) === 0
        ) {
            setDisabled(true)
        } else setDisabled(false)
    }, [
        receiverName.value,
        address.value,
        city.value,
        weight.value,
        quantity.value,
    ])

    return (
        <>
            <BgLayout>
                <LayoutContainer title="Paquete" backUrl={'/packages'}>
                    <div className="flex p-2">
                        <div className="p-2 px-2 font-bold">
                            <div>
                                #
                                {packageSelected?._id
                                    .slice(
                                        packageSelected._id.length - 5,
                                        packageSelected._id.length
                                    )
                                    .toUpperCase()}
                            </div>
                        </div>

                        <div className="flex-1 flex justify-end items-center">
                            {packageSelected?.status === 'in progress' ? (
                                <p className="bg-customYellow px-3 rounded-full">
                                    EN CURSO
                                </p>
                            ) : packageSelected?.status === 'pending' ? (
                                <p className="bg-secondary px-3 rounded-full">
                                    PENDIENTE
                                </p>
                            ) : packageSelected?.status === 'delivered' ? (
                                <p className="bg-customGreen px-3 rounded-full text-primary">
                                    ENTREGADO
                                </p>
                            ) : null}
                        </div>
                    </div>
                </LayoutContainer>
                <div className="py-4">
                    <div className="w-full bg-white p-4 rounded-xl mb-4 text-primary font-poppins">
                        <h1 className="text-lg font-bold">
                            Información del paquete
                        </h1>
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
                                        type="number"
                                        placeholder="Peso del paquete (Kg)"
                                        className="w-full border-b border-primary placeholder-primary py-2"
                                        value={weight.value}
                                        onChange={weight.onChange}
                                    />
                                </div>
                                <div className="py-4">
                                    <input
                                        type="number"
                                        placeholder="Cantidad de paquetes"
                                        className="w-full border-b border-primary placeholder-primary py-2"
                                        value={quantity.value}
                                        onChange={quantity.onChange}
                                    />
                                </div>
                                <div className="flex justify-center my-2"></div>
                            </div>
                            <div className="flex justify-between">
                                <Button
                                    customStyle={disabled ? 'black-button' : ''}
                                    type="button"
                                    disabled={disabled}
                                    onClick={handleEditPackage}
                                >
                                    Editar
                                </Button>
                            </div>
                            {packageSelected?.status === 'pending' && (
                                <Button
                                    customStyle={`mt-2 red-button`}
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    Eliminar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </BgLayout>
        </>
    )
}

export default PackageDetail
