import React from 'react'

import { Search } from '../../icons/icons'

import s from './search.module.scss'

const SearchBox = () => (
    <div className={s.searchContainer}>
        <span className={s.searchIcon}>
            <Search />
        </span>
        <input className={s.searchInput} type='search' />
    </div>
)

export default SearchBox
