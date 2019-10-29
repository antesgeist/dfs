import React, { useState } from 'react'

import Button from '../../common/button/button'
import { MenuDown, MenuRight } from '../../icons/icons'

import Frame from '../../frame/frame'
import FrameContent from '../../frame-content/frame-content'
import Node from '../../node/node'
import NodeContent from '../../node-content/node-content'
import NodeParent from '../../node-parent/node-parent'
import NodeAddNew from '../../node-add-new/node-add-new'

import styles from './canvas.module.scss'

const Canvas = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const btnCollapseState = isCollapsed ? (
        <MenuRight />
    ) : (
        <MenuDown />
    )

    return (
        <div className={styles.canvasContainer}>
            <Frame>
                <FrameContent>
                    <NodeParent root>
                        <Node isCollapsed={isCollapsed}>
                            <NodeContent value='Maxxis' />
                            <Button
                                svg={btnCollapseState}
                                style={[styles.collapseBtn]}
                                onClick={() =>
                                    setIsCollapsed(!isCollapsed)
                                }
                            />
                            <NodeParent>
                                <Node isCollapsed={isCollapsed}>
                                    <NodeContent value='Maxwell' />
                                </Node>
                                <Node isCollapsed={isCollapsed}>
                                    <NodeContent value='Boron' />
                                </Node>
                                <NodeAddNew />
                            </NodeParent>
                        </Node>
                        <NodeAddNew />
                    </NodeParent>
                </FrameContent>
            </Frame>
        </div>
    )
}

export default Canvas
