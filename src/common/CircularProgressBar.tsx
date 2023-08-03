import React from 'react'

interface CircularProgressBarProps {
    width: number
    height: number
    progress: number
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    width,
    height,
    progress,
}) => {
    const circleX = width / 2
    const circleY = height / 2
    const radius = Math.min(width, height) * 0.4
    const nodeRadius = 2 * 4

    const angle = ((progress % 100) / 100) * 360

    const radians = (angle - 90) * (Math.PI / 180)
    const nodeX = circleX + radius * Math.cos(radians)
    const nodeY = circleY + radius * Math.sin(radians)

    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform={'rotate(-90) scale(32.5 32.5)'}
                >
                    <stop offset="100%" stopColor="#00EA7799" />
                </linearGradient>
            </defs>

            <path
                d={`M${circleX},${circleY - radius}A${radius},${radius} 0 ${
                    angle > 180 ? 1 : 0
                },1 ${circleX + radius * Math.cos(radians)},${
                    circleY + radius * Math.sin(radians)
                }`}
                stroke={'url(#paint0_linear)'}
                strokeWidth="6"
                fill="none"
            />

            {progress < 100 && (
                <path
                    d={`M${circleX},${circleY - radius}A${radius},${radius} 0 ${
                        angle > 180 ? 1 : 0
                    },1 ${circleX + radius * Math.cos(radians)},${
                        circleY + radius * Math.sin(radians)
                    }`}
                    stroke={'url(#paint0_linear)'}
                    strokeWidth="6"
                    fill="none"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset,
                    }}
                />
            )}

            {progress === 100 && (
                <circle
                    cx={circleX}
                    cy={circleY}
                    r={radius}
                    stroke={'url(#paint0_linear)'}
                    strokeWidth="6"
                    fill="none"
                />
            )}

            <circle cx={nodeX} cy={nodeY} r={nodeRadius} fill="#00EA77" />
        </svg>
    )
}

export default CircularProgressBar
