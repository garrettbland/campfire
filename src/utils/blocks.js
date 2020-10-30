import { v4 as uuidv4 } from 'uuid'

export const defaultBlocks = (type) => {
    const defaultTypes = {
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
