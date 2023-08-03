import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaChevronDown } from 'react-icons/fa'

interface DatePickerComponentProps {
    selectedDate: Date
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    openDatePicker: () => void
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
    selectedDate,
    handleInputChange,
    openDatePicker,
}) => {
    return (
        <div className="border rounded-xl border-primary py-2 relative">
            <input
                className="placeholder-primary px-2 w-full"
                type="text"
                placeholder={`${selectedDate?.toLocaleDateString('es-ES')}`}
                onChange={handleInputChange}
            />
            <FaChevronDown
                className="absolute right-2 top-3 cursor-pointer text-primary"
                onClick={openDatePicker}
            />
            <DatePicker
                selected={selectedDate}
                onChange={() => {}}
                dateFormat="dd/MM/yyyy"
                className="hidden"
            />
        </div>
    )
}

export default DatePickerComponent
