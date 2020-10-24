import React from 'react'
import Section from './Section'
import Row from './Row'
import Column from './Column'
import Text from './Text'
import Image from './Image'
import Link from './Link'
import EmptySection from './EmptySection'

/**
 * Takes in an array and recursivley builds the site
 * and adds in buttons
 * @param {Array} data
 */
const BuildSite = ({ data }) => {
    return data.map((block) => {
        switch (block.type) {
            case 'section': {
                return (
                    <Section block={block} key={block.id}>
                        {block.data.length === 0 && <EmptySection data={block} />}
                        {block.data.length > 0 && <BuildSite data={block.data} />}
                    </Section>
                )
            }
            case 'row': {
                return (
                    <Row block={block} key={block.id}>
                        <BuildSite data={block.data} />
                    </Row>
                )
            }
            case 'column': {
                return (
                    <Column block={block} key={block.id}>
                        <BuildSite data={block.data} />
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

export default BuildSite
