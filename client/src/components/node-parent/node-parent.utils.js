import React from 'react'

import NodeParent from './node-parent'
import Node from '../node/node'
import NodeContent from '../node-content/node-content'

export const mapNodesToParent = (
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
                    actions={actions}
                />
            )}
        </Node>
    )
}
