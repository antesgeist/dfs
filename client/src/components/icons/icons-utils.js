import React from 'react'
import s from './icons.module.scss'

const Button = ({ svg, text, children = null, style = [] }) => {
    let formattedClass

    if (style.length > 0 || !style[0]) {
        formattedClass = [...style]
            .filter(className => className !== 'null')
            .reduce((acc, cur) => `${acc} ${cur}`, '')
    }

    return (
        <button className={`${s.buttonContainer}${formattedClass || ''}`} type='button'>
            {svg || children || text}
        </button>
    )
}

export const SVG = (Svg, options = []) => {
    let formattedClass

    if (options.length > 0 && options[0] !== false) {
        formattedClass = options
            .filter(className => className !== 'null')
            .reduce((acc, cur) => `${acc} ${cur}`, '')
    }

    return (
        <button className={`${s.buttonContainer}${formattedClass || ''}`}>
            <Svg />
        </button>
    )
}

export default Button
