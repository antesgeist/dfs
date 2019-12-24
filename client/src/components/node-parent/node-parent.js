import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'

import { selectNodeGroup } from '../../store/node/node.selectors'
import { useDrag } from '../utils/custom-hooks'

import Node from '../node/node'
import NodeContent from '../node-content/node-content'
import NodeAddNew from '../node-add-new/node-add-new'

import Button from '../common/button/button'
import { MenuDown, MenuRight } from '../icons/icons'

import styles from './node-parent.module.scss'

const mapNodesToParent = (
    nodeGroup,
    data,
    frameId,
    index,
    isDragging,
    actions
) => {
    const { id, title, state, descendant } = data

    return (
        <Node id={id} index={index}>
            <NodeContent
                frameId={frameId}
                nodeId={id}
                title={title}
                checked={state.checked}
                onCheck={actions.toggleNodeCheck}
                isDragging={isDragging}
            />
            {descendant.length > 0 && (
                <NodeParent
                    frameId={frameId}
                    parentId={id}
                    nodeId={id}
                    data={nodeGroup[id]}
                    // nodeGroup={nodeGroup}
                    actions={actions}
                />
            )}
        </Node>
    )
}

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
    data,
    nodeGroup,
    index,
    actions
}) => {
    const { id, title, state, descendant } = data

    const { dragChildNode, toggleNodeCollapse } = actions

    const [isCollapsed, setIsCollapsed] = useState(state.collapsed)
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

    const attributes = {
        'data-is-collapsed': isCollapsed
    }

    const onCollapse = () => {
        setIsCollapsed(!isCollapsed)
        toggleNodeCollapse({ frameId, id, type: 'COLLAPSE' })
    }

    const collapseButton = (isCollapsed, handler) => (
        <Button
            svg={isCollapsed ? <MenuRight /> : <MenuDown />}
            style={[styles.collapseBtn]}
            onClick={handler}
        />
    )

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
                            {!root && collapseButton(isCollapsed, onCollapse)}

                            <ul
                                ref={innerRef}
                                {...droppableProps}
                                {...rootProps}
                                {...attributes}
                            >
                                {placeholder}

                                <Node id={id} index={index}>
                                    <NodeContent
                                        frameId={frameId}
                                        nodeId={id}
                                        title={title}
                                        checked={state.checked}
                                        onCheck={actions.toggleNodeCheck}
                                        isDragging={isDragging}
                                    />
                                    {descendant.length > 0 && (
                                        <NodeParent
                                            frameId={frameId}
                                            parentId={id}
                                            nodeId={id}
                                            data={nodeGroup[id]}
                                            // nodeGroup={nodeGroup}
                                            actions={actions}
                                        />
                                    )}
                                </Node>

                                <NodeAddNew
                                    frameId={frameId}
                                    parentId={parentId}
                                    nodeId={id}
                                />
                            </ul>
                        </Fragment>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}

/* 
{mapNodesToParent(
                                    nodeGroup,
                                    data,
                                    frameId,
                                    index,
                                    isDragging,
                                    actions
                                )}
*/

const mapStateToProps = createStructuredSelector({
    nodeGroup: selectNodeGroup
})

export default connect(mapStateToProps)(NodeParent)
