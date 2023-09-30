import Image from 'next/image'
import genericImg from '../../public/generic-user.png'

interface DriversPicturesProps {
    picture: string
}

export const DriversPictures: React.FC<DriversPicturesProps> = ({
    picture,
}) => {
    return (
        <Image
            className="rounded-full"
            height={56}
            width={56}
            alt="Profile Picture"
            src={picture !== '' ? picture : genericImg}
        />
    )
}
