import { v4 as uuidv4 } from 'uuid'

export const defaultBlocks = (type, columns) => {
    const defaultTypes = {
        section: {
            id: uuidv4(),
            type: 'section',
            tag: 'section',
            classList: ['py-12', 'relative'],
            data: [],
        },
        background: {
            id: uuidv4(),
            type: 'background-image',
            tag: 'div',
            classList: [
                'absolute',
                'top-0',
                'left-0',
                'w-full ',
                'h-full',
                'bg-cover',
                'bg-center',
            ],
            data: {
                degree: 180,
                color_start: `rgba(255, 255, 255, 0.5)`,
                color_end: `rgba(255, 255, 255, 0.5)`,
                src:
                    'https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            },
        },
        row: {
            id: uuidv4(),
            type: 'row',
            tag: 'div',
            classList: ['max-w-4xl', 'mx-auto', 'flex', 'flex-wrap', 'p-4'],
            data: [...Array(columns)].map(() => {
                return {
                    id: uuidv4(),
                    type: `column`,
                    tag: `div`,
                    classList: [
                        `w-full`,
                        `${columns === 1 ? 'md:w-full' : `md:w-1/${columns}`}`,
                        `p-4`,
                    ],
                    data: [],
                }
            }),
        },
        text: {
            id: uuidv4(),
            type: 'text',
            tag: 'p',
            classList: ['text-black', 'text-md', 'leading-6', 'mb-4'],
            data:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        },
        img: {
            id: uuidv4(),
            type: 'image',
            tag: 'img',
            classList: ['w-full'],
            data: {
                src:
                    'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                alt: 'Highway Photo',
            },
        },
        link: {
            id: uuidv4(),
            type: 'link',
            tag: 'a',
            classList: ['px-4', 'py-2', 'bg-green-500', 'text-white', 'rounded', 'inline-block'],
            data: {
                target: '_self',
                href: '#',
                title: 'Try Today',
            },
        },
    }

    return defaultTypes[type]
}
