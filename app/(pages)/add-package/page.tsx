'use client'
import React, { useState, useRef } from 'react'
import { BgLayout } from '../../bgLayout'
import LayoutContainer from '../../layoutContainer'
import QuantityHandler from 'components/QuantityHandler'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaChevronDown } from 'react-icons/fa'
import { Button } from 'common/Button'

const AddPackage = () => {
    const [quantity, setQuantity] = useState(1)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const datePickerRef = useRef<DatePicker | null>(null)

    const handleDateChange = (date: Date) => {
        setSelectedDate(date)
    }

    const openDatePicker = () => {
        if (datePickerRef.current !== null) {
            datePickerRef.current.setOpen(true)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
        if (regex.test(inputValue)) {
            const [dia, mes, año] = regex.exec(inputValue) as RegExpExecArray
            const date = new Date(`${mes}/${dia}/${año}`)
            setSelectedDate(date)
        }
    }

    return (
        <BgLayout>
            <LayoutContainer title="Agregar paquetes">
                <div className="px-4">
                    <div className="text-sm">
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Direccion"
                                className="w-full border-b border-primary placeholder-primary py-2"
                            />
                        </div>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Nombre de quien recibe"
                                className="w-full border-b border-primary placeholder-primary py-2"
                            />
                        </div>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Peso del paquete (Kg)"
                                className="w-full border-b border-primary placeholder-primary py-2"
                            />
                        </div>
                        <div className="flex justify-center my-2">
                            <div className="flex-1 max-w-md col p-1 my-2">
                                <div className="my-2 text-xs">
                                    Fecha de entrega
                                </div>
                                <div className="border rounded-xl border-primary py-2 relative">
                                    <input
                                        className="placeholder-primary px-3 w-full"
                                        type="text"
                                        placeholder={`${selectedDate?.toLocaleDateString(
                                            'es-ES'
                                        )}`}
                                        onChange={handleInputChange}
                                    />
                                    <FaChevronDown
                                        className="absolute right-2 top-3 cursor-pointer text-primary"
                                        onClick={openDatePicker}
                                    />
                                </div>
                                <DatePicker
                                    ref={datePickerRef}
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="hidden"
                                />
                            </div>

                            <div className="flex-1 max-w-md col border-primary border-l px-2 w-full my-4">
                                Cantidad
                                <div className="my-2">
                                    <QuantityHandler
                                        quantity={quantity}
                                        setQuantity={setQuantity}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Button>Agregar</Button>
                    </div>
                </div>
            </LayoutContainer>
        </BgLayout>
    )
}

export default AddPackage
