import React from 'react'

import FrameHeader from '../frame-header/frame-header'

import styles from './frame.module.scss'

const Frame = ({ title, children }) => (
    <div className={styles.frame}>
        <FrameHeader title={title} />
        {children}
    </div>
)

export default Frame
