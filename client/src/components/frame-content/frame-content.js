import React from 'react'

import styles from './frame-content.module.scss'

const FrameContent = ({ children }) => (
    <div className={styles.frameContent}>{children}</div>
)

export default FrameContent
