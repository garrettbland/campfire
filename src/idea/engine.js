/**
 * Takes in campfire data tree and
 * returns jsx
 */
import React from 'react'
const blocks = ['body', 'section', 'div']
const content = ['h1', 'p', 'img']

const generateClasses = (classesArray) => {
    return [...classesArray].join(' ')
}

const buildIt = (data) => {
    return data.map((block) => {
        if (blocks.includes(block.type)) {
            return (
                <div
                    id={block.id}
                    className={generateClasses(block.classes)}
                >
                    {buildIt(block.data)}
                </div>
            )
        } else {
            switch (block.type) {
                case 'p': {
                    return (
                        <p
                            id={block.id}
                            className={generateClasses(block.classes)}
                        >
                            {block.data.text}
                        </p>
                    )
                }
                case 'h1': {
                    return (
                        <h1
                            id={block.id}
                            className={generateClasses(block.classes)}
                        >
                            {block.data.text}
                        </h1>
                    )
                }
                case 'img': {
                    return (
                        <img
                            id={block.id}
                            alt={block.data.alt}
                            className={generateClasses(block.classes)}
                            src={block.data.src}
                        />
                    )
                }
                default: {
                    return null
                }
            }
        }
    })
}

/**
 * Takes in top level data array
 */
export const buildSite = (dataArray) => {
    return buildIt(dataArray)
}
