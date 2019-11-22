import React from 'react'
import { connect } from 'react-redux'

import {
    toggleNodeCollapse,
    toggleNodeCheck
} from '../../store/frame/frame.actions'

import Frame from '../frame/frame'
import FrameContent from '../frame-content/frame-content'
import NodeParent from '../node-parent/node-parent'

import styles from './frames.module.scss'

const Frames = ({ frames, isActive, toggleNodeCollapse, toggleNodeCheck }) => {
    const extendedClass = `
        ${styles.framesContainer}
        ${isActive ? styles.activeFrames : ''}
    `.trimRight()

    return (
        <div className={extendedClass}>
            {frames
                .sort((a, b) => (a.order < b.order ? -1 : 1))
                .map(({ id, title, descendant }) => (
                    <Frame key={id} title={title}>
                        <FrameContent>
                            <NodeParent
                                frameId={id}
                                root='true'
                                nodes={descendant}
                                onCollapse={toggleNodeCollapse}
                                onCheck={toggleNodeCheck}
                            />
                        </FrameContent>
                    </Frame>
                ))}
        </div>
    )
}

const actionCreators = {
    toggleNodeCollapse,
    toggleNodeCheck
}

export default connect(null, actionCreators)(Frames)
