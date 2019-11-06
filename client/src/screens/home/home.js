import React from 'react'
import PageDefault from '../../components/page-default/page-default'

import styles from './home.module.scss'

const Home = () => (
    <PageDefault opt={{ header_has_user_button: true }}>
        <h1 className={styles.homeHeadline}>DFS TREE HOME</h1>
    </PageDefault>
)

export default Home
