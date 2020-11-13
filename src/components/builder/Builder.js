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
            case 'section-divider': {
                console.log('section divider plz')
                return (
                    <div className={[...block.classList, 'z-30'].join(' ')} key={block.id}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                            className="w-full h-64"
                        >
                            <path
                                fill="#667eea"
                                fill-opacity="1"
                                d="M0,224L34.3,192C68.6,160,137,96,206,106.7C274.3,117,343,203,411,218.7C480,235,549,181,617,176C685.7,171,754,213,823,224C891.4,235,960,213,1029,186.7C1097.1,160,1166,128,1234,122.7C1302.9,117,1371,139,1406,149.3L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                            ></path>
                        </svg>
                    </div>
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
