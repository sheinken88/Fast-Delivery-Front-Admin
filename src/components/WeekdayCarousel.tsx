import React, { useState } from 'react'
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

interface Weekday {
    short: string
    date: Date
}

export const WeekdayCarousel: React.FC = () => {
    const [centerDate, setCenterDate] = useState<Date>(new Date())

    const generateDays = (center: Date): Weekday[] => {
        const days: Weekday[] = []
        for (let i = -2; i <= 2; i++) {
            const newDate = new Date(center)
            newDate.setDate(center.getDate() + i)
            days.push({
                short: newDate.toLocaleString('es-ES', { weekday: 'short' }),
                date: newDate,
            })
        }
        return days
    }

    const nextDay = () => {
        setCenterDate((prev) => {
            const newDate = new Date(prev)
            newDate.setDate(prev.getDate() + 1)
            return newDate
        })
    }

    const prevDay = () => {
        setCenterDate((prev) => {
            const newDate = new Date(prev)
            newDate.setDate(prev.getDate() - 1)
            return newDate
        })
    }

    const days = generateDays(centerDate)

    return (
        <div className="flex justify-center items-center mb-4 weekday-carousel-container">
            <button onClick={prevDay}>
                {<MdKeyboardDoubleArrowLeft size={25} />}
            </button>
            {days.map((day) => (
                <div
                    key={day.date.toString()}
                    className={
                        'p-2 rounded-lg border border-primary inline-block mx-1 cursor-pointer text-center'
                    }
                >
                    <p>{day.short}</p>
                    <p className="font-bold text-xl">{day.date.getDate()}</p>
                </div>
            ))}
            <button onClick={nextDay}>
                {<MdKeyboardDoubleArrowRight size={25} />}
            </button>
        </div>
    )
}

export default WeekdayCarousel
