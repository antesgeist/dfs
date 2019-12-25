import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
    selectFrameNodes,
    selectNodeGroup
} from '../../store/node/node.selectors'
import {
    dragChildNode,
    toggleNodeCollapse,
    toggleNodeCheck
} from '../../store/node/node.actions'

import Frame from '../frame/frame'
import FrameContent from '../frame-content/frame-content'
import NodeParent from '../node-parent/node-parent'

import styles from './frames.module.scss'

const Frames = ({
    frames,
    isActive,
    frameNodes,
    nodeGroup,
    dragChildNode,
    toggleNodeCollapse,
    toggleNodeCheck
}) => {
    const extendedClass = `
        ${styles.framesContainer}
        ${isActive ? styles.activeFrames : ''}
    `.trimRight()

    const { order, group } = frames

    return (
        <div className={extendedClass}>
            {order.map(frameId => {
                const { id, title } = group[frameId]

                // rootNodes LIKE node.descendant
                const rootNodes = frameNodes[id].roots

                return (
                    <Frame key={id} title={title}>
                        <FrameContent>
                            <NodeParent
                                parentId={0} // use
                                frameId={frameId}
                                root='true'
                                nodes={rootNodes}
                                nodeGroup={nodeGroup}
                                actions={{
                                    dragChildNode,
                                    toggleNodeCollapse,
                                    toggleNodeCheck
                                }}
                            />
                        </FrameContent>
                    </Frame>
                )
            })}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    frameNodes: selectFrameNodes,
    nodeGroup: selectNodeGroup
})

const actionCreators = {
    dragChildNode,
    toggleNodeCollapse,
    toggleNodeCheck
}

export default connect(mapStateToProps, actionCreators)(Frames)
