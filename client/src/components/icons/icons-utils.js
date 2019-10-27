import React from 'react'
import s from './icons.module.scss'

// HOC Icon
const Icon = SVG => (
    <span className={s.iconContainer}>
        <SVG />
    </span>
)

export default Icon
