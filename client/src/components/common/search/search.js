import React from 'react'

import { Search } from '../../icons/icons'

import s from './search.module.scss'

const SearchBox = () => (
    <div className={s.searchContainer}>
        <input className={s.searchInput} type='search' />
        <span className={s.searchIcon}>
            <Search />
        </span>
    </div>
)

export default SearchBox
