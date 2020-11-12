import React from 'react'
import Section from './section/Section'
import SectionBackground from './section/SectionBackground'
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
                        {block.data.length > 0 && <Builder data={block.data} />}
                        {!block.data.find((block) => block.type === 'section') && (
                            <EmptySection data={block} />
                        )}
                    </Section>
                )
            }
            case 'section-background': {
                return <SectionBackground block={block} key={block.id} />
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
