interface TagProps {
    value: string
    status: boolean | undefined
}

const Tag: React.FC<TagProps> = ({ value, status }) => {
    const bgColor = status === true ? 'bg-customGreen' : 'bg-customPurple'

    return (
        <div
            className={`${bgColor} rounded-xl text-xs font-bold px-2 w-20 text-center uppercase	`}
        >
            {value}
        </div>
    )
}

export default Tag
