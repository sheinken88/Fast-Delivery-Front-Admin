import React from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

interface QuantityHandlerProps {
    quantity: number
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}

const QuantityHandler: React.FC<QuantityHandlerProps> = ({
    quantity,
    setQuantity,
}) => {
    const handleQuantityLess = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const handleQuantityPlus = () => {
        setQuantity(quantity + 1)
    }

    return (
        <div className="border p-2 py-1 border-primary rounded-xl">
            <div className="flex items-center px-2 py-1 text-primary border-primary border rounded-xl space-x-2 justify-center">
                <div className="w-14 h-full flex items-center justify-between">
                    <IconContext.Provider value={{ className: 'icon' }}>
                        <div
                            onClick={handleQuantityLess}
                            className="cursor-pointer"
                        >
                            <AiOutlineMinusCircle />
                        </div>
                        <div>{quantity}</div>
                        <div
                            onClick={handleQuantityPlus}
                            className="cursor-pointer"
                        >
                            <AiOutlinePlusCircle />
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default QuantityHandler
