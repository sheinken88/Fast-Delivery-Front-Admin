interface TagProps {
    children: string
    status: 'Activo' | 'Inactivo'
}

const Tag: React.FC<TagProps> = ({ children, status }) => {
    const bgColor = status === 'Activo' ? 'bg-customGreen' : 'bg-customPurple'

    return (
        <div
            className={`${bgColor} rounded-xl text-xs font-bold px-2 w-20 text-center uppercase	`}
        >
            {children}
        </div>
    )
}

export default Tag
