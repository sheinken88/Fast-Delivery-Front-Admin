interface TagProps {
    children: string
}

const Tag: React.FC<TagProps> = ({ children }) => {
    return (
        <div className="bg-customGreen rounded-xl text-xs font-bold p px-2">
            {children}
        </div>
    )
}

export default Tag
