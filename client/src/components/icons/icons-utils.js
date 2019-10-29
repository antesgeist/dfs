import React from 'react'
import s from './icons.module.scss'

const Button = ({
    svg = null,
    text = null,
    children = null,
    style = [],
    onClick
}) => {
    const firstClassIsValid = style[0]
    let formattedClass

    if (style.length === 1 && firstClassIsValid) {
        formattedClass = ` ${style[0].toString()}`
    } else if (style.length > 0 || firstClassIsValid) {
        formattedClass = [...style]
            .filter(className => className) // className is truthy
            .reduce((acc, cur) => `${acc} ${cur}`, '')
    }

    return (
        <button
            className={`${
                s.buttonContainer
            }${formattedClass || ''}`}
            type='button'
            onClick={onClick}
        >
            {svg || children || text}
        </button>
    )
}

export const SVG = (Svg, options = []) => {
    let formattedClass

    if (options.length > 1 && options[0] !== false) {
        formattedClass = options
            .filter(className => className !== 'null')
            .reduce((acc, cur) => `${acc} ${cur}`, '')
    }

    return (
        <button
            className={`${
                s.buttonContainer
            }${formattedClass || ''}`}
        >
            <Svg />
        </button>
    )
}

export default Button
