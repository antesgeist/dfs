import React from 'react'

import DefaultHeader from '../default-header/default-header'

import styles from './page-default.module.scss'

const PageDefault = ({ children, opt = {} }) => {
    const hasUserButton = opt.header_has_user_button

    return (
        <div className={styles.pageContainer}>
            <DefaultHeader hasUserButton={hasUserButton} />
            <div className={styles.mainContent}>
                <div className={styles.content}>{children}</div>
            </div>
            <div className={styles.pageFooter}>
                <p className={styles.footerLabel}>© 2019 DFS</p>
            </div>
        </div>
    )
}

export default PageDefault
