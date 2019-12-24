import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Tab from '../tab/tab'
import Button from '../common/button/button'
import { Plus } from '../icons/icons'

import { setActiveFrameGroup } from '../../store/frame/frame.actions'
import { setActivePanel } from '../../store/panel/panel.actions'
import {
    selectActivePanel,
    selectPanelOrder
} from '../../store/panel/panel.selectors'

import styles from './tab-group.module.scss'

const TabGroup = ({
    panels,
    activePanel,
    order,
    setActivePanel,
    setActiveFrameGroup
}) => {
    const onSelectTab = (panelId, framesId) => {
        setActivePanel(panelId)
        setActiveFrameGroup(framesId)
    }

    return (
        <div className={styles.tabGroupContainer}>
            <div className={styles.tabGroup}>
                {order.map(panelId => {
                    const { id, title, frames } = panels[panelId]

                    return (
                        <Tab
                            isActive={activePanel === id}
                            key={id}
                            label={title}
                            onClick={() => onSelectTab(id, frames)}
                        />
                    )
                })}
            </div>
            <div className={styles.tabControls}>
                <Button svg={<Plus />} />
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    activePanel: selectActivePanel,
    order: selectPanelOrder
})

const actionCreators = {
    setActivePanel,
    setActiveFrameGroup
}

export default connect(mapStateToProps, actionCreators)(TabGroup)
