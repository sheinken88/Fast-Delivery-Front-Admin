import Image from 'next/image'

interface ProfileImg {
    profilePic: string
}

export const ProfilePicture = ({ profilePic }: ProfileImg) => {
    return (
        <Image
            className="rounded-full"
            height={56}
            width={56}
            alt="Profile Picture"
            src={profilePic}
        />
    )
}
