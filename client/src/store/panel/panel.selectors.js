import { createSelector } from 'reselect'

const selectPanel = state => state.panels

export const selectPanels = createSelector(
    [selectPanel],
    panels => panels.panelGroup
)

export const selectIsWorkspaceFetching = createSelector(
    [selectPanel],
    panel => panel.isFetching
)

export const selectActivePanel = createSelector(
    [selectPanel],
    panel => panel && panel.activePanel
)

export const selectActiveFramesUID = createSelector(
    [selectPanels],
    panels =>
        panels &&
        panels
            .filter(panel => panel.is_active)
            .reduce(
                (framesUIDString, { frames_uid }) => frames_uid,
                ''
            )
)

export const selectFramesIdFilter = createSelector(
    [selectPanels],
    panels =>
        panels &&
        panels.reduce((cur, panel) => {
            const { frames_uid } = panel
            return [...frames_uid]
        }, [])
)
