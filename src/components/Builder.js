import React, { useState } from 'react'
import buildSite from '../utils/builder'

const Builder = () => {
    const [website] = useState({
        head: {
            title: 'Campfire site',
            description: 'This is a website',
            scripts: ['google gtag analytics', 'google fonts'],
        },
        data: [
            {
                id: '39xs',
                type: 'body',
                classes: ['bg-gray-100'],
                data: [
                    {
                        id: '129r',
                        type: 'div',
                        classes: [
                            'flex',
                            'flex-wrap',
                            'items-center',
                        ],
                        data: [
                            {
                                id: 'xx82',
                                type: 'div',
                                classes: ['w-full', 'md:w-1/2'],
                                data: [
                                    {
                                        id: '1x93',
                                        type: 'h1',
                                        classes: [
                                            'text-4xl',
                                            'font-bold',
                                        ],
                                        data: {
                                            text:
                                                'Welcome to campfire',
                                        },
                                    },
                                    {
                                        id: '393x',
                                        type: 'p',
                                        classes: ['text-gray-800'],
                                        data: {
                                            text:
                                                'This is a website builder',
                                        },
                                    },
                                ],
                            },
                            {
                                id: 'xv82',
                                type: 'div',
                                classes: ['w-full', 'md:w-1/2'],
                                data: [
                                    {
                                        id: '39z1',
                                        type: 'img',
                                        classes: [],
                                        data: {
                                            src:
                                                'https://img.com/example.jpg',
                                            alt: 'Example image',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    })

    return <>{buildSite(website.data)}</>
}

export default Builder
