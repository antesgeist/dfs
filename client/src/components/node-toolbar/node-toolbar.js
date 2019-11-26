import React, { useState } from 'react'

import Button from '../common/button/button'
import { Gear, Maximize, Close, Copy, Stack, Plus } from '../icons/icons'

import styles from './node-toolbar.module.scss'

const NodeToolbar = ({ opt }) => {
    const [extendedTools, setExtendedTools] = useState(false)

    const onToggleExtTools = tools => {
        setExtendedTools(!tools)
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

export default NodeToolbar
