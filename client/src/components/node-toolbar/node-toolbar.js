import React, { useState } from 'react'
import { connect } from 'react-redux'

import { appendChildNode } from '../../store/node/node.actions'

import Button from '../common/button/button'
import { Gear, Maximize, Close, Copy, Stack, Plus } from '../icons/icons'

import styles from './node-toolbar.module.scss'

const NodeToolbar = ({ opt, frameId, nodeId, appendChildNode }) => {
    const [extendedTools, setExtendedTools] = useState(false)

    const onToggleExtTools = tools => {
        setExtendedTools(!tools)
    }

    const onAppendChildNode = () => {
        appendChildNode({ frameId, nodeId })
    }

    return (
        <div className={styles.nodeToolbar}>
            <div className={styles.nodeToolsDefault}>
                <Button
                    svg={<Gear className={styles.nodeGear} />}
                    opt={opt}
                    onClick={() => onToggleExtTools(extendedTools)}
                />
                <Button
                    svg={<Maximize className={styles.nodeMax} />}
                    opt={opt}
                />
                <Button
                    svg={<Close className={styles.nodeDelete} />}
                    opt={opt}
                />
                {extendedTools && (
                    <div className={styles.nodeToolsExpanded}>
                        <Button
                            svg={<Copy className={styles.nodeCopy} />}
                            opt={opt}
                        />
                        <Button
                            svg={<Stack className={styles.nodeAppendChild} />}
                            opt={opt}
                            onClick={onAppendChildNode}
                        />
                        <Button
                            svg={<Plus className={styles.nodeAppendSibling} />}
                            opt={opt}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

const actionCreators = { appendChildNode }

export default connect(null, actionCreators)(NodeToolbar)
