import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'

import Button from '../common/button/button'
import { MenuDown, MenuRight } from '../icons/icons'

import Node from '../node/node'
import NodeContent from '../node-content/node-content'
import NodeAddNew from '../node-add-new/node-add-new'

import {
    dragChildNode,
    toggleNodeCollapse,
    toggleNodeCheck
} from '../../store/frame/frame.actions'

import styles from './node-parent.module.scss'

const mapNodesToParent = (
    nodes,
    frameId,
    dragChildNode,
    isDragging,
    toggleNodeCollapse,
    toggleNodeCheck
) =>
    nodes
        .sort((a, b) => a.order - b.order)
        .map((node, idx) => {
            const { id, value, descendant, state } = node

            return (
                <Node key={id} id={id} index={idx}>
                    <NodeContent
                        frameId={frameId}
                        nodeId={id}
                        title={value}
                        checked={state.checked}
                        onCheck={toggleNodeCheck}
                        isDragging={isDragging}
                    />
                    {descendant.length > 0 && (
                        <NodeParent
                            frameId={frameId}
                            parentId={id}
                            nodeId={id}
                            nodes={descendant}
                            collapsed={state.collapsed}
                            dragChildNode={dragChildNode}
                            toggleNodeCollapse={toggleNodeCollapse}
                            toggleNodeCheck={toggleNodeCheck}
                        />
                    )}
                </Node>
            )
        })

/**
 * Node Container
 *
 * @param {bool} root Denote if parent is descendant or not
 * @param {bool} collapsed Node collapsed state
 * @param {bool} checked Node checked state
 * @param {str/uid} frameId Frame/node event dispatch ref and sorting comparison
 * @param {str/uid} parentId Parent node event dispatch
 * @param {str/uid} nodeId Node event dispatch ref
 * @param {array} nodes Node tree
 * @param {event} onCollapse Collapse event handler
 * @param {event} onCheck Check event handler
 *
 * todo: too fucking many props, truncate this shit
 */
const NodeParent = ({
    root,
    frameId,
    parentId,
    nodeId,
    nodes,
    collapsed,
    dragChildNode,
    toggleNodeCollapse,
    toggleNodeCheck
}) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed)
    const [isDragging, setIsDragging] = useState(false)

    const collapseNode = () => {
        setIsCollapsed(!isCollapsed)
        toggleNodeCollapse({ frameId, nodeId, type: 'COLLAPSE' })
    }

    const rootProps = root && {
        id: 'frameRootId',
        className: styles.root
    }

    const attrs = {
        'data-is-collapsed': isCollapsed
    }

    const onDragEnd = result => {
        const { destination, source, draggableId } = result

        setIsDragging(false)

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        dragChildNode({
            frameId,
            parentId,
            nodeIndexMap: {
                source: source.index,
                dest: destination.index,
                draggableId
            },
            type: 'DRAG'
        })
    }

    const onBeforeDragStart = result => {
        setIsDragging(true)
    }

    return (
        // todo fix TWO-unresponsive drag event after dragend
        // todo can't immediately drag/capture inner nodes

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
                                    svg={
                                        isCollapsed ? (
                                            <MenuRight />
                                        ) : (
                                            <MenuDown />
                                        )
                                    }
                                    style={[styles.collapseBtn]}
                                    onClick={collapseNode}
                                />
                            )}

                            <ul
                                ref={innerRef}
                                {...droppableProps}
                                {...rootProps}
                                {...attrs}
                            >
                                {mapNodesToParent(
                                    nodes,
                                    frameId,
                                    dragChildNode,
                                    isDragging,
                                    toggleNodeCollapse,
                                    toggleNodeCheck
                                )}
                                {placeholder}
                                <NodeAddNew
                                    frameId={frameId}
                                    parentId={parentId}
                                    nodeId={nodeId}
                                />
                            </ul>
                        </Fragment>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}

const actionCreators = {
    dragChildNode,
    toggleNodeCollapse,
    toggleNodeCheck
}

export default connect(null, actionCreators)(NodeParent)
