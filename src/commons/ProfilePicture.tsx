import Image from 'next/image'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

export const ProfilePicture = () => {
    const user = useSelector((state: RootState) => state.admin)
    return (
        <Image
            className="rounded-full"
            height={56}
            width={56}
            alt="Profile Picture"
            src={
                user.profile_pic != null
                    ? user.profile_pic
                    : '/generic-user.png'
            }
        />
    )
}
