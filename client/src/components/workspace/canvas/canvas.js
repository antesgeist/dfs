import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCanvasFrames } from '../../../redux/canvas/canvas.selectors'
import { toggleFrameNodeView } from '../../../redux/canvas/canvas.actions'

import Frame from '../../frame/frame'
import FrameContent from '../../frame-content/frame-content'
import NodeParent from '../../node-parent/node-parent'

import styles from './canvas.module.scss'

const Canvas = ({ canvasFrames, toggleFrameNodeView }) => (
    <div className={styles.canvasContainer}>
        {canvasFrames.map(({ id, title, descendant }) => (
            <Frame key={id} title={title}>
                <FrameContent>
                    <NodeParent
                        root='true'
                        nodes={descendant}
                        toggle={toggleFrameNodeView}
                    />
                </FrameContent>
            </Frame>
        ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    canvasFrames: selectCanvasFrames
})

const mapDispatchToProps = {
    toggleFrameNodeView
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas)
