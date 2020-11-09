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
                /**
                 * Depending on if there is a background-image child, thats why the
                 * extra steps are done. If there is one child element of section and its
                 * background-image block type, then we need to render it a little differently
                 * so it still shows the empty section correctly
                 */
                return (
                    <Section block={block} key={block.id}>
                        {block.data.length === 0 && <EmptySection data={block} />}
                        {block.data.length === 1 && block.data[0].type === 'section-background' && (
                            <>
                                <Builder data={block.data} />
                                <EmptySection data={block} />
                            </>
                        )}
                        {block.data.length === 1 && block.data[0].type !== 'section-background' && (
                            <Builder data={block.data} />
                        )}
                        {block.data.length > 1 && <Builder data={block.data} />}
                    </Section>
                )
            }
            // case 'section-background': {
            //     return <SectionBackground block={block} key={block.id} />
            // }
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
