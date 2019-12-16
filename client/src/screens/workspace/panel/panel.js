import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Frames from '../../../components/frames/frames'

import { selectFrameGroup } from '../../../store/frame/frame.selectors'
import {
    selectActivePanel,
    selectPanelOrder
} from '../../../store/panel/panel.selectors'

import styles from './panel.module.scss'

const Panel = ({ panels, order, activePanelId, frameGroup }) => (
    <div className={styles.panelContainer}>
        {order.map(panelId => {
            const { id, frames } = panels[panelId]

            return (
                <Frames
                    key={id}
                    isActive={id === activePanelId}
                    frames={frameGroup[frames]}
                />
            )
        })}
    </div>
)

const mapStateToProps = createStructuredSelector({
    activePanelId: selectActivePanel,
    frameGroup: selectFrameGroup,
    order: selectPanelOrder
})

export default connect(mapStateToProps)(Panel)
