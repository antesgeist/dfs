import React from 'react'
import styles from './node.module.scss'

const Node = ({ children }) => <li className={styles.node}>{children}</li>

export default Node
