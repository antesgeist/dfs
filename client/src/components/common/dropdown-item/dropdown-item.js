import React from 'react'
import s from './dropdown-item.module.scss'

const DropdownItem = ({ link, children, select }) => (
    <a href={link} className={s.dropdownItem} onClick={select}>
        {children}
    </a>
)

export default DropdownItem
