import Image from 'next/image'

export const ProfilePicture = () => {
    return (
        <Image
            className=""
            height={56}
            width={56}
            alt="Profile Picture"
            src={'/Profile_Picture.svg'}
        />
    )
}
