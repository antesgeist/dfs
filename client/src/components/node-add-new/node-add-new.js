import React from 'react'
import { connect } from 'react-redux'

import { appendNewNode } from '../../store/frame/frame.actions'

import Button from '../common/button/button'
import { PlusOutline } from '../icons/icons'

import styles from './node-add-new.module.scss'

const NodeAddNew = ({ frameId, parentId, appendNewNode }) => {
    const onInsertNode = () => {
        appendNewNode({ frameId, parentId, nodeId: null, type: 'APPEND' })
    }

    // get insertNode position

    // create action type | add to pos(getPos)
    // create action add new node action
    // create reducer to map action

    return (
        <li className={styles.nodeAddNew}>
            <Button
                svg={<PlusOutline className={styles.svgPlusOutline} />}
                opt={['noPadding']}
                onClick={() => onInsertNode()}
            />
        </li>
    )
}

export default connect(null, { appendNewNode })(NodeAddNew)
