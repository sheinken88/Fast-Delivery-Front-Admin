import React from 'react'
import '../styles/toggleSwitchStyles.css'

interface ToggleSwitchProps {
    checked: boolean
    onChange: () => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
        </label>
    )
}

export default ToggleSwitch
