import React, { type FC, useRef } from 'react'

interface ImageUploaderProps {
    selectedImage: string
    setSelectedImage: (image: string) => void
}

const ImageUploader: FC<ImageUploaderProps> = ({
    selectedImage,
    setSelectedImage,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleImageUpload = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click()
        }
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file !== null) {
            const reader = new FileReader()

            reader.onload = (event) => {
                if (event.target?.result !== null) {
                    setSelectedImage(event.target?.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div
            className="flex justify-center items-center cursor-pointer"
            style={{ backgroundColor: 'lightgrey', height: 120 }}
            onClick={handleImageUpload}
        >
            <input
                type="file"
                name="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
            />
            <img
                src={selectedImage}
                alt="Selected Image"
                className="h-20 w-20 cursor-pointer border rounded-full"
            />
        </div>
    )
}

export default ImageUploader
