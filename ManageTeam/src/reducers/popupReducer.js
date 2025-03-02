// Reducer for handling the visibility of popups
export const initialState = {
    showPopupEvent: false,
    showPopupEventDelete: false,
    showPopupEventUpdate: false,
    selectedEventId: null,
};

export const popupReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ASSIGN_POPUP':
            return {
                ...state,
                showPopupEvent: true,
                selectedEventId: action.eventId,
            };
        case 'SHOW_DELETE_POPUP':
            return {
                ...state,
                showPopupEventDelete: true,
                selectedEventId: action.eventId,
            };
        case 'SHOW_UPDATE_POPUP':
            return {
                ...state,
                showPopupEventUpdate: true,
                selectedEventId: action.eventId,
            };
        case 'CLOSE_POPUP':
            return {
                ...state,
                showPopupEvent: false,
                showPopupEventDelete: false,
                showPopupEventUpdate: false,
                selectedEventId: null,
            };
        default:
            return state;
    }
};
