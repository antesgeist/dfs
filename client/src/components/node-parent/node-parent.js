import React, { useState, Fragment } from 'react'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'

import { useDrag } from '../utils/custom-hooks'

import Node from '../node/node'
import NodeContent from '../node-content/node-content'
import NodeAddNew from '../node-add-new/node-add-new'

import Button from '../common/button/button'
import { MenuDown, MenuRight } from '../icons/icons'

import styles from './node-parent.module.scss'

const mapNodes = (frameId, nodes, nodeGroup, isDragging, actions) =>
    nodes.map((nodeId, idx) => {
        const { title, state, descendant } = nodeGroup[nodeId]

        return (
            <Node key={nodeId} id={nodeId} index={idx}>
                <NodeContent
                    frameId={frameId}
                    nodeId={nodeId}
                    title={title}
                    checked={state.checked}
                    onCheck={actions.toggleNodeCheck}
                    isDragging={isDragging}
                />
                {descendant.length > 0 && (
                    <NodeParent
                        frameId={frameId}
                        parentId={nodeId}
                        nodes={descendant}
                        nodeGroup={nodeGroup}
                        collapsed={state.collapsed}
                        actions={actions}
                    />
                )}
            </Node>
        )
    })

/**
 * Node Container
 *
 * @param {bool} root Denote if parent is descendant or not
 * @param {bool} checked Node checked state
 * @param {str/uid} frameId Frame/node event dispatch ref and sorting comparison
 * @param {str/uid} parentId Parent node event dispatch
 * @param {str/uid} nodeId Node event dispatch ref
 * @param {event} onCollapse Collapse event handler
 * @param {event} onCheck Check event handler
 *
 */

const NodeParent = ({
    root,
    frameId,
    parentId,
    nodes,
    nodeGroup,
    collapsed,
    actions
}) => {
    const { dragChildNode, toggleNodeCollapse } = actions

    const [onDragEnd, onBeforeDragStart, isDragging] = useDrag(
        false,
        dragChildNode,
        frameId,
        parentId
    )

    const rootProps = root && {
        id: 'frameRootId',
        className: styles.root
    }

    // root nodes not collapsed by default
    const initCollapsedState = root ? false : collapsed

    // set root nodes to non-collapsed temporarily
    const [isCollapsed, setIsCollapsed] = useState(initCollapsedState)

    const attributes = {
        'data-is-collapsed': isCollapsed
    }

    const svgChevron = isCollapsed ? <MenuRight /> : <MenuDown />

    const onCollapse = parentId => {
        setIsCollapsed(!isCollapsed)
        toggleNodeCollapse({ parentId, event: 'COLLAPSE' })
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeDragStart={onBeforeDragStart}
        >
            <Droppable droppableId={frameId}>
                {provided => {
                    const { innerRef, droppableProps, placeholder } = provided

                    return (
                        <Fragment>
                            {!root && (
                                <Button
                                    svg={svgChevron}
                                    style={[styles.collapseBtn]}
                                    onClick={() => onCollapse(parentId)}
                                />
                            )}

                            <ul
                                ref={innerRef}
                                {...droppableProps}
                                {...rootProps}
                                {...attributes}
                            >
                                {placeholder}

                                {mapNodes(
                                    frameId,
                                    nodes,
                                    nodeGroup,
                                    isDragging,
                                    actions
                                )}

                                <NodeAddNew
                                    frameId={frameId}
                                    parentId={parentId}
                                />
                            </ul>
                        </Fragment>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}

export default NodeParent
