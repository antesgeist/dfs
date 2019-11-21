import { createSelector } from 'reselect'

const selectPanel = state => state.panel

export const selectPanels = createSelector([selectPanel], panel => panel.panels)

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
            .reduce((framesUIDString, { frames_uid }) => frames_uid, '')
)
