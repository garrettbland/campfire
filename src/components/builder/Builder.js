import React from 'react'
import Section from './section/Section'
import Row from './row/Row'
import Column from './column/Column'
import Text from './text/Text'
import Image from './image/Image'
import Link from './link/Link'
import EmptySection from './section/EmptySection'
import EmptyColumn from './column/EmptyColumn'

/**
 * Takes in an array and recursivley builds the site
 * and adds in buttons
 * @param {Array} data
 */
const Builder = ({ data }) => {
    return data.map((block) => {
        switch (block.type) {
            case 'section': {
                return (
                    <Section block={block} key={block.id}>
                        {block.data.length === 0 && <EmptySection data={block} />}
                        {block.data.length === 1 && block.data[0].type === 'background-image' && (
                            <>
                                <Builder data={block.data} />
                                <EmptySection data={block} />
                            </>
                        )}
                        {block.data.length === 1 && block.data[0].type !== 'background-image' && (
                            <Builder data={block.data} />
                        )}
                        {block.data.length > 1 && <Builder data={block.data} />}
                    </Section>
                )
            }
            case 'background-image': {
                const bgStyle = {
                    backgroundImage: `linear-gradient(${block.data.degree}deg, ${block.data.color_start}, ${block.data.color_end}),url('${block.data.src}')`,
                }

                return (
                    <div
                        key={block.id}
                        data-type="background-image"
                        className={[...block.classList].join(' ')}
                        style={bgStyle}
                    ></div>
                )
            }
            case 'row': {
                return (
                    <Row block={block} key={block.id}>
                        <Builder data={block.data} />
                    </Row>
                )
            }
            case 'column': {
                return (
                    <Column block={block} key={block.id}>
                        {block.data.length === 0 && <EmptyColumn data={block} />}
                        {block.data.length > 0 && <Builder data={block.data} />}
                    </Column>
                )
            }
            case 'text': {
                return <Text block={block} key={block.id} />
            }
            case 'image': {
                return <Image block={block} key={block.id} />
            }
            case 'link': {
                return <Link block={block} key={block.id} />
            }
            default: {
                return null
            }
        }
    })
}

export default Builder
