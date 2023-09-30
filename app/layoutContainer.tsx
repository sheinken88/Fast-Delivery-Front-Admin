'use client'
import type { ReactNode } from 'react'
import { IconContext } from 'react-icons'
import { BsArrowLeftCircle } from 'react-icons/bs'
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation'

interface LayoutContainerProps {
    title: string
    children: ReactNode
    backUrl: string
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
    title,
    children,
    backUrl,
}) => {
    const router = useRouter()
    return (
        <div className="text-primary font-poppins z-10 bg-customGreen rounded-lg flex flex-col  h-full w-full">
            <div className="flex  w-200 h-200 rounded-t-lg py-4 px-4">
                <button
                    className=""
                    onClick={() => {
                        router.push(backUrl)
                    }}
                >
                    <IconContext.Provider
                        value={{
                            color: '#3D1DF3',
                            size: '20px',
                        }}
                    >
                        <BsArrowLeftCircle />
                    </IconContext.Provider>
                </button>

                <h1 className="flex-1 font-black text-xl text-center">
                    {title}
                </h1>
            </div>
            <div className="bg-white z-50 rounded-lg p-2 mt-2 flex-grow justify-between w-full h-full">
                {children}
            </div>
        </div>
    )
}

LayoutContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default LayoutContainer
