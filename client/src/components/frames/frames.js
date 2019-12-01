import React from 'react'

import Frame from '../frame/frame'
import FrameContent from '../frame-content/frame-content'
import NodeParent from '../node-parent/node-parent'

import styles from './frames.module.scss'

const Frames = ({ frames, isActive }) => {
    const extendedClass = `
        ${styles.framesContainer}
        ${isActive ? styles.activeFrames : ''}
    `.trimRight()

    return (
        <div className={extendedClass}>
            {frames
                // .sort((a, b) => (a.order < b.order ? -1 : 1))
                .map(({ id, title, descendant }) => (
                    <Frame key={id} title={title}>
                        <FrameContent>
                            <NodeParent
                                parentId={id}
                                frameId={id}
                                root='true'
                                nodes={descendant}
                            />
                        </FrameContent>
                    </Frame>
                ))}
        </div>
    )
}

export default Frames
