import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectFrameNodeGroup } from '../../store/frame-nodes/frame-nodes.selectors'
import { selectNodeGroup } from '../../store/node/node.selectors'
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
    nodes,
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
                const { id, title, frame_nodes } = group[frameId]
                const rootNodes = frameNodes[frame_nodes].roots

                return (
                    <Frame key={id} title={title}>
                        <FrameContent>
                            {rootNodes.map((nodeId, idx) => (
                                <NodeParent
                                    key={nodeId}
                                    parentId={id}
                                    frameId={frameId}
                                    root='true'
                                    data={nodes[nodeId]}
                                    index={idx}
                                    actions={{
                                        dragChildNode,
                                        toggleNodeCollapse,
                                        toggleNodeCheck
                                    }}
                                />
                            ))}
                        </FrameContent>
                    </Frame>
                )
            })}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    frameNodes: selectFrameNodeGroup,
    nodes: selectNodeGroup
})

const actionCreators = {
    dragChildNode,
    toggleNodeCollapse,
    toggleNodeCheck
}

export default connect(mapStateToProps, actionCreators)(Frames)
