import React from 'react'
import styles from './dropdown-toggle.module.scss'
import { MenuUp, MenuDown } from '../../icons/icons'
import Button from '../../icons/icons-utils'

const DropdownToggle = ({ toggle, onToggle, current }) => (
    <button
        id='dropdown-workspace'
        aria-expanded={toggle}
        className={styles.dropdownToggle}
        onClick={onToggle}
        type='button'
    >
        <span className={styles.dropdownCurrent}>{current}</span>
        {toggle ? <Button svg={<MenuUp />} /> : <Button svg={<MenuDown />} />}
    </button>
)

export default DropdownToggle
