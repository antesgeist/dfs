import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import styles from './node.module.scss'

const Node = ({ children, id, index }) => (
    <Draggable draggableId={id.toString()} index={index}>
        {provided => {
            const { innerRef, draggableProps, dragHandleProps } = provided

            return (
                <li
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    className={styles.node}
                >
                    {children}
                </li>
            )
        }}
    </Draggable>
)

export default Node
