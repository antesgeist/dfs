import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
    toggleNodeCollapse,
    toggleNodeCheck
} from '../../../redux/frame/frame.actions'
import { selectFrameGroup } from '../../../redux/frame/frame.selectors'

import { selectActiveFramesUID } from '../../../redux/panel/panel.selectors'

import Frame from '../../frame/frame'
import FrameContent from '../../frame-content/frame-content'
import NodeParent from '../../node-parent/node-parent'

import styles from './canvas.module.scss'

const Canvas = ({
    frameGroups,
    activeFrameGroupID,
    toggleNodeCollapse,
    toggleNodeCheck
}) => {
    const t = frameGroups => {
        /* 
            frameGroups: {
                frameGroupId-1: [
                    {...}
                ]
                frameGroupId-2: [
                    {...}
                ]
                frameGroupId-n: [
                    {...}
                ]
            }
        */
        const activeFrameGroup = frameGroups[activeFrameGroupID]
    }

    return (
        <div className={styles.canvasContainer}>
            {frameGroups.map(({ id, title, descendant }) => (
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

const mapStateToProps = createStructuredSelector({
    frameGroups: selectFrameGroup,
    activeFrameGroupID: selectActiveFramesUID
})

const mapDispatchToProps = {
    toggleNodeCollapse,
    toggleNodeCheck
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
