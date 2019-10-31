import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCanvasFrames } from '../../../redux/canvas/canvas.selectors'
import {
    toggleNodeCollapse,
    toggleNodeCheck
} from '../../../redux/canvas/canvas.actions'

import Frame from '../../frame/frame'
import FrameContent from '../../frame-content/frame-content'
import NodeParent from '../../node-parent/node-parent'

import styles from './canvas.module.scss'

const Canvas = ({ canvasFrames, toggleNodeCollapse, toggleNodeCheck }) => (
    <div className={styles.canvasContainer}>
        {canvasFrames.map(({ id, title, descendant }) => (
            <Frame key={id} title={title}>
                <FrameContent>
                    <NodeParent
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

const mapStateToProps = createStructuredSelector({
    canvasFrames: selectCanvasFrames
})

const mapDispatchToProps = {
    toggleNodeCollapse,
    toggleNodeCheck
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas)
