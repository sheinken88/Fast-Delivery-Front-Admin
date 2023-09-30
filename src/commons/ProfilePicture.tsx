import Image from 'next/image'

export const ProfilePicture = (profileImg: string) => {
    return (
        <Image
            className="rounded-full"
            height={56}
            width={56}
            alt="Profile Picture"
            src={profileImg}
        />
    )
}
