import React from 'react'

const SectionBackground = ({ block }) => {
    const generateGradientStyle = () => {
        if (block.data.gradient_type === 'linear') {
            return {
                backgroundImage: `linear-gradient(${block.data.degree}deg, ${block.data.color_start}, ${block.data.color_end}),url('${block.data.src}')`,
            }
        } else if (block.data.gradient_type === 'radial') {
            return {
                backgroundImage: `radial-gradient(circle at center, ${block.data.color_start}, ${block.data.color_end}),url('${block.data.src}'`,
            }
        }
    }

    const generateBlurStyle = () => {
        if (block.data.blur && block.data.blur > 0) {
            return {
                filter: `blur(${block.data.blur}px)`,
            }
        }
    }

    return (
        <div
            key={block.id}
            data-type="section-background"
            className={[...block.classList].join(' ')}
            style={{ ...generateGradientStyle(), ...generateBlurStyle() }}
        ></div>
    )
}

export default SectionBackground
