import React, { useState } from 'react'

import Button from '../common/button/button'
import { MenuDown, MenuRight } from '../icons/icons'

import Node from '../node/node'
import NodeContent from '../node-content/node-content'
import NodeAddNew from '../node-add-new/node-add-new'

import styles from './node-parent.module.scss'

const NodeParent = ({ root, nodes }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const btnCollapseState = isCollapsed ? <MenuRight /> : <MenuDown />

    const rootProps = root && {
        id: 'frameRootId',
        className: styles.root
    }

    const mapNodesToParent = nodesArray =>
        nodesArray.map(({ id, value, descendant }) => (
            <Node key={id} isCollapsed={isCollapsed}>
                <NodeContent title={value} />
                {descendant.length > 0 && <NodeParent nodes={descendant} />}
            </Node>
        ))

    return (
        <ul {...rootProps}>
            <Button
                svg={btnCollapseState}
                style={[styles.collapseBtn]}
                onClick={() => setIsCollapsed(!isCollapsed)}
            />
            {mapNodesToParent(nodes)}
            <NodeAddNew />
        </ul>
    )
}

export default NodeParent
