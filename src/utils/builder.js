/**
 * Takes in campfire data array
 * and returns jsx
 */
import React from 'react'
const blocks = ['body', 'section', 'div']

const buildSite = (data) => {
    return data.map((block) => {
        if (blocks.includes(block.type)) {
            return (
                <div
                    key={block.id}
                    id={block.id}
                    className={[...block.classes].join(' ')}
                >
                    {buildSite(block.data)}
                </div>
            )
        } else {
            switch (block.type) {
                case 'p': {
                    return (
                        <p
                            key={block.id}
                            id={block.id}
                            className={[...block.classes].join(' ')}
                            onClick={() =>
                                alert(
                                    `clicked on p tag with ${block.data.text}`
                                )
                            }
                        >
                            {block.data.text}
                        </p>
                    )
                }
                case 'h1': {
                    return (
                        <h1
                            key={block.id}
                            id={block.id}
                            className={[...block.classes].join(' ')}
                            onClick={() =>
                                alert(
                                    `clicked on h1 tag with ${block.data.text}`
                                )
                            }
                        >
                            {block.data.text}
                        </h1>
                    )
                }
                case 'img': {
                    return (
                        <img
                            key={block.id}
                            id={block.id}
                            alt={block.data.alt}
                            className={[...block.classes].join(' ')}
                            src={block.data.src}
                            onClick={() =>
                                alert(
                                    `clicked on img tag with src ${block.data.src}`
                                )
                            }
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

export default buildSite

// const buildIt = (data) => {
//     return data.map((block) => {
//         if (blocks.includes(block.type)) {
//             return (
//                 <div
//                     id={block.id}
//                     className={[...classesArray].join(' ')}
//                 >
//                     {buildIt(block.data)}
//                 </div>
//             )
//         } else {
//             switch (block.type) {
//                 case 'p': {
//                     return (
//                         <p
//                             id={block.id}
//                             className={[...classesArray].join(' ')}
//                         >
//                             {block.data.text}
//                         </p>
//                     )
//                 }
//                 case 'h1': {
//                     return (
//                         <h1
//                             id={block.id}
//                             className={[...classesArray].join(' ')}
//                         >
//                             {block.data.text}
//                         </h1>
//                     )
//                 }
//                 case 'img': {
//                     return (
//                         <img
//                             id={block.id}
//                             alt={block.data.alt}
//                             className={[...classesArray].join(' ')}
//                             src={block.data.src}
//                         />
//                     )
//                 }
//                 default: {
//                     return null
//                 }
//             }
//         }
//     })
// }

// /**
//  * Takes in top level data array
//  */
// export const buildSite = (dataArray) => {
//     return buildIt(dataArray)
// }
