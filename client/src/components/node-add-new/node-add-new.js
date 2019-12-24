import React from 'react'
import { connect } from 'react-redux'

import { appendNewNode } from '../../store/node/node.actions'

import Button from '../common/button/button'
import { PlusOutline } from '../icons/icons'

import styles from './node-add-new.module.scss'

const NodeAddNew = ({ frameId, parentId, nodeId, appendNewNode }) => {
    const onInsertNode = () => {
        appendNewNode({ frameId, parentId, nodeId })
    }

    return (
        <li className={styles.nodeAddNew}>
            <Button
                svg={<PlusOutline className={styles.svgPlusOutline} />}
                opt={['noPadding']}
                onClick={onInsertNode}
            />
        </li>
    )
}

export default connect(null, { appendNewNode })(NodeAddNew)
