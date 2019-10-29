import React from 'react'

import FrameHeader from '../frame-header/frame-header'

import styles from './frame.module.scss'

const Frame = ({ children }) => (
    <div className={styles.frame}>
        <FrameHeader title='Vladimirs' />
        {children}
    </div>
)

export default Frame
