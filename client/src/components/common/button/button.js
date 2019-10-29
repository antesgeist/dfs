import React from 'react'
import styles from './button.module.scss'

const Button = ({
    svg = null,
    text = null,
    children = null,
    style = [],
    opt = [],
    onClick = null
}) => {
    const firstClassIsValid = style[0]
    let formattedClass

    const options = opt.map(option => {
        switch (option) {
            case 'noPadding':
                return styles.noPadding
            default:
                return false
        }
    })

    if (style.length === 1 && firstClassIsValid) {
        formattedClass = ` ${style[0].toString()}`
    } else if (style.length > 0 || firstClassIsValid) {
        formattedClass = [...style]
            .filter(className => className) // className is truthy
            .reduce((acc, cur) => `${acc} ${cur}`, '')
    }

    const generatedClass = `
        ${styles.buttonContainer}
        ${formattedClass || ''}
        ${options || ''}
    `

    return (
        <button
            className={generatedClass}
            type='button'
            onClick={onClick}
        >
            {svg || children || text}
        </button>
    )
}

export default Button
