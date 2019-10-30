import React from 'react'
import { connect } from 'react-redux'

import { fetchCanvasFrames } from '../../../redux/canvas/canvas.actions'

import Frame from '../../frame/frame'
import FrameContent from '../../frame-content/frame-content'
import NodeParent from '../../node-parent/node-parent'

import styles from './canvas.module.scss'

const Canvas = ({ canvasFrames }) => (
    <div className={styles.canvasContainer}>
        {canvasFrames.map(({ id, title, descendant }) => (
            <Frame key={id} title={title}>
                <FrameContent>
                    <NodeParent root='true' nodes={descendant} />
                </FrameContent>
            </Frame>
        ))}
    </div>
)

const mapStateToProps = state => ({
    canvasFrames: state.canvas.canvasFrames
})

export default connect(
    mapStateToProps,
    fetchCanvasFrames
)(Canvas)
