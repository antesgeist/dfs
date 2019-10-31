import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'

import { selectCanvasFrames } from '../../redux/canvas/canvas.selectors'

import Button from '../common/button/button'
import { MenuDown, MenuRight } from '../icons/icons'

import Node from '../node/node'
import NodeContent from '../node-content/node-content'
import NodeAddNew from '../node-add-new/node-add-new'

import styles from './node-parent.module.scss'

const mapNodesToParent = (nodeArray, toggle) =>
    nodeArray.map(({ id, value, descendant, state }) => (
        <Node key={id} expanded={state.expanded}>
            <NodeContent title={value} />
            {descendant.length > 0 && (
                <NodeParent
                    nodes={descendant}
                    collapsed={state.collapsed}
                    id={id}
                    toggle={toggle}
                />
            )}
        </Node>
    ))

const NodeParent = ({ root, nodes, collapsed, toggle, id }) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed)

    const collapseNode = () => {
        setIsCollapsed(!isCollapsed)
        toggle(id)
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
                {mapNodesToParent(nodes, toggle)}
                <NodeAddNew />
            </ul>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    frame: selectCanvasFrames(state)[0] // get first frame
})

export default connect(mapStateToProps)(NodeParent)
