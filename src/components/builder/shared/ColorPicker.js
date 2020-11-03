import React from 'react'
import { colors } from '../../../utils/colors'

const ColorPicker = ({ currentColor, onClick }) => {
    /**
     * Takes on current color to show selected and a 'onClick' callback function
     * Will return the root color. Parent component will be responsible for adding on
     * desired prefix (aka "bg-" or "text-")
     */
    return (
        <div className="flex flex-wrap">
            {colors().map((color) => {
                return (
                    <div
                        key={color}
                        onClick={() => onClick(color)}
                        className={`w-8 h-8 ${
                            color ? `bg-${color}` : 'border-2'
                        } border cursor-pointer`}
                    >
                        {color === currentColor ? 'Selected' : null}
                    </div>
                )
            })}
        </div>
    )
}

export default ColorPicker
