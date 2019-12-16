import { createSelector } from 'reselect'

const selectPanel = state => state.panels

export const selectPanels = createSelector(
    [selectPanel],
    panels => panels.group
)

export const selectIsWorkspaceFetching = createSelector(
    [selectPanel],
    panel => panel.isFetching
)

export const selectActivePanel = createSelector(
    [selectPanel],
    panel => panel && panel.activeItem
)

export const selectPanelOrder = createSelector(
    [selectPanel],
    panels => panels.order
)
