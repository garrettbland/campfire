module.exports = {
    theme: {
        cursor: {
            'col-resize': 'col-resize',
        },
    },
    variants: {
        cursor: ['responsive', 'hover'],
        translate: [
            'responsive',
            'hover',
            'focus',
            'active',
            'group-hover',
        ],
    },
    plugins: [
        require('@tailwindcss/ui'),
        require('@tailwindcss/custom-forms'),
    ],
}
