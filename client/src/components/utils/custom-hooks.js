import { useState, useEffect } from 'react'

export const useToggle = (toggleRef, initialState) => {
    const [toggle, setToggle] = useState(initialState)

    useEffect(() => {
        const clickOutside = e => {
            if (!toggleRef.current.contains(e.target)) {
                setToggle(!toggle)
            }
        }

        if (toggle) {
            document.addEventListener('mousedown', clickOutside)
        } else {
            document.removeEventListener('mousedown', clickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [toggle, toggleRef])

    return [toggle, setToggle]
}

// todo fix TWO-unresponsive drag event after dragend
// todo can't immediately drag/capture inner nodes
export const useDrag = (state = false, actionCreator, frameId, parentId) => {
    const [isDragging, setIsDragging] = useState(state)

    const onDragEnd = result => {
        const { destination, source, draggableId } = result

        setIsDragging(false)

        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        actionCreator({
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

    const onBeforeDragStart = () => {
        setIsDragging(true)
    }

    return [onDragEnd, onBeforeDragStart, isDragging]
}
