import React, { useState, useEffect, useRef } from 'react'

const SectionBackground = ({ block, showTool }) => {
    //const [showTool, setShowTool] = useState(false)
    const sectionBackgroundRef = useRef()

    // useEffect(() => {
    //     const section = sectionBackgroundRef.current

    //     section.addEventListener('mouseenter', (event) => {
    //         setShowTool(true)
    //     })
    //     section.addEventListener('mouseleave', (event) => {
    //         setShowTool(false)
    //     })
    //     return () => {
    //         section.removeEventListener('mouseenter', () => {})
    //         section.removeEventListener('mouseleave', () => {})
    //     }
    // }, [])

    const hoverStyle = () => {
        if (showTool) {
            return {
                outline: '2px solid red',
                outlineOffset: '-2px',
            }
        }
    }

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
                transform: 'scale(1.1)',
            }
        }
    }

    // const generateBackgroundAttachment = () => {
    //     /**
    //      * aka - Background positioning (fixed or local)
    //      * Will only display local if blur is enabled. Enabling blur and fixed
    //      * jacks up the scaleing and fixed background and makes weird scrolling effects
    //      */
    //     if (block.data.blur > 0) {
    //         return {
    //             backgroundAttachment: 'local',
    //         }
    //     } else {
    //         return {
    //             backgroundAttachment: block.data.background_attachment,
    //         }
    //     }
    // }

    return (
        <div
            key={block.id}
            ref={sectionBackgroundRef}
            data-type="section-background"
            className={[...block.classList].join(' ')}
            style={{
                ...generateGradientStyle(),
                ...generateBlurStyle(),
                ...hoverStyle(),
            }}
        ></div>
    )
}

export default SectionBackground
