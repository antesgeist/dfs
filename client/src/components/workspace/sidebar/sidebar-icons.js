import React from 'react'

import { Link } from 'react-router-dom'

import styles from './sidebar.module.scss'

import {
    Logo,
    Frames,
    Workspaces,
    Favourites,
    History,
    Trash,
    Github,
    Help,
    Message,
    Expand
} from '../../icons/icons'

export const SidebarLogo = () => (
    <div className={styles.sidebarLogoContainer}>
        <div className={styles.svgContainer}>
            <span className={styles.sidebarLogo}>
                <Link to='/'>
                    <Logo />
                </Link>
            </span>
        </div>
    </div>
)

export const SidebarTools = () => (
    <div className={styles.sidebarTools}>
        <div className={styles.sidebarPrimary}>
            <span className={styles.svgContainer}>
                <Frames />
            </span>
            <span className={styles.svgContainer}>
                <Workspaces />
            </span>
            <span className={styles.svgContainer}>
                <Favourites />
            </span>
            <span className={styles.svgContainer}>
                <History />
            </span>
            <span className={styles.svgContainer}>
                <Trash />
            </span>
        </div>
        <div className={styles.sidebarSecondary}>
            <span className={styles.svgContainer}>
                <Github />
            </span>
            <span className={styles.svgContainer}>
                <Help />
            </span>
            <span className={styles.svgContainer}>
                <Message />
            </span>
            <span className={styles.svgContainer}>
                <Expand />
            </span>
        </div>
    </div>
)
