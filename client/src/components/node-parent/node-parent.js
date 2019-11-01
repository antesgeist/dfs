import React, { useState, Fragment } from 'react'

import Button from '../common/button/button'
import { MenuDown, MenuRight } from '../icons/icons'

import Node from '../node/node'
import NodeContent from '../node-content/node-content'
import NodeAddNew from '../node-add-new/node-add-new'

import styles from './node-parent.module.scss'

const mapNodesToParent = (nodeArray, onCollapse, onCheck) =>
    nodeArray.map(({ id, value, descendant, state }) => (
        <Node key={id} expanded={state.collapsed}>
            <NodeContent
                title={value}
                onCheck={onCheck}
                id={id}
                checked={state.checked}
            />
            {descendant.length > 0 && (
                <NodeParent
                    nodes={descendant}
                    collapsed={state.collapsed}
                    id={id}
                    onCollapse={onCollapse}
                    onCheck={onCheck}
                />
            )}
        </Node>
    ))

const NodeParent = ({ root, collapsed, id, nodes, onCollapse, onCheck }) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed)

    const collapseNode = () => {
        setIsCollapsed(!isCollapsed)
        onCollapse({ id, type: 'COLLAPSE' })
    }

    const rootProps = root && {
        id: 'frameRootId',
        className: styles.root
    }

    const attrs = {
        'data-is-collapsed': collapsed
    }

    return (
        <Fragment>
            {!root && (
                <Button
                    svg={isCollapsed ? <MenuRight /> : <MenuDown />}
                    style={[styles.collapseBtn]}
                    onClick={collapseNode}
                />
            )}
            <ul {...rootProps} {...attrs}>
                {mapNodesToParent(nodes, onCollapse, onCheck)}
                <NodeAddNew />
            </ul>
        </Fragment>
    )
}

export default NodeParent
