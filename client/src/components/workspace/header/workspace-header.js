import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from '../../../redux/user/user.selectors'
import { selectPanels } from '../../../redux/panel/panel.selectors'

import tabOptions from './tab-options'
import TabGroup from '../../tab-group/tab-group'
import WorkspaceUser from '../../workspace-user/workspace-user'

import OptionsMenu from '../../options-menu/options-menu'

import { Menu } from '../../icons/icons'

import styles from './workspace-header.module.scss'

const WorkspaceHeader = ({ currentUser, panels }) => (
    <div className={styles.headerContainer}>
        <div className={styles.optionsMenu}>
            <OptionsMenu
                items={tabOptions}
                style={{
                    toggleBtn: styles.toggleBtn,
                    dropdownItems: styles.dropdownItems,
                    dropdownItem: styles.dropdownItem
                }}
                toggleIcon={<Menu />}
                opt={{ selection: false }}
            />
        </div>
        {currentUser && panels && (
            <Fragment>
                <TabGroup panels={panels} />
                <WorkspaceUser />
            </Fragment>
        )}
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    panels: selectPanels
})

export default connect(mapStateToProps)(WorkspaceHeader)
