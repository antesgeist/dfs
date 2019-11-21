import React from 'react'
import styles from './canvas-placeholder.module.scss'

const CanvasPlaceholder = () => (
    <div className={styles.placeholderContainer}>
        <div className={styles.loader} />
    </div>
)

export default CanvasPlaceholder
