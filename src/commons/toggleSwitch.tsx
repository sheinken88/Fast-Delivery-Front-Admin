import React from 'react'
import '../styles/toggleSwitchStyles.css'

interface ToggleSwitchProps {
    onClick: () => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onClick }) => {
    return (
        <label className="switch">
            <input type="checkbox" onClick={onClick} />
            <span className="slider"></span>
        </label>
    )
}

export default ToggleSwitch
