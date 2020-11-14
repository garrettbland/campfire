import React from 'react'

const SectionDivider = ({ block }) => {
    return (
        <div
            data-type="section-divider"
            className={[...block.classList, 'z-30'].join(' ')}
            key={block.id}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <path
                    fill="currentColor"
                    fillOpacity="1"
                    d="M0,224L34.3,192C68.6,160,137,96,206,106.7C274.3,117,343,203,411,218.7C480,235,549,181,617,176C685.7,171,754,213,823,224C891.4,235,960,213,1029,186.7C1097.1,160,1166,128,1234,122.7C1302.9,117,1371,139,1406,149.3L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                ></path>
            </svg>
        </div>
    )
}

export default SectionDivider
