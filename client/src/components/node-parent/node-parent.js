import React, { useState, Fragment } from 'react'

import Button from '../common/button/button'
import { MenuDown, MenuRight } from '../icons/icons'

import Node from '../node/node'
import NodeContent from '../node-content/node-content'
import NodeAddNew from '../node-add-new/node-add-new'

import styles from './node-parent.module.scss'

const mapNodesToParent = (nodeArray, frameId, onCollapse, onCheck) =>
    nodeArray.map(({ id, value, descendant, state }) => (
        <Node key={id} expanded={state.collapsed}>
            <NodeContent
                frameId={frameId}
                title={value}
                onCheck={onCheck}
                nodeId={id}
                checked={state.checked}
            />
            {descendant.length > 0 && (
                <NodeParent
                    parentId={id}
                    frameId={frameId}
                    nodes={descendant}
                    collapsed={state.collapsed}
                    nodeId={id}
                    onCollapse={onCollapse}
                    onCheck={onCheck}
                />
            )}
        </Node>
    ))

const NodeParent = ({
    root,
    collapsed,
    parentId,
    frameId,
    nodeId,
    nodes,
    onCollapse,
    onCheck
}) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed)

    const collapseNode = () => {
        setIsCollapsed(!isCollapsed)
        onCollapse({ frameId, nodeId, type: 'COLLAPSE' })
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
                {mapNodesToParent(nodes, frameId, onCollapse, onCheck)}
                <NodeAddNew frameId={frameId} parentId={parentId} />
            </ul>
        </Fragment>
    )
}

export default NodeParent
