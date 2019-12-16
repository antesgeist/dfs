import React from 'react'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'

const DroppableContainer = (
    onDragEnd,
    onBeforeDragStart,
    frameId,
    children
) => (
    <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
    >
        <Droppable droppableId={frameId}>{children}</Droppable>
    </DragDropContext>
)

export default DroppableContainer
