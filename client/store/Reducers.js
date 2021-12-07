import { ACTIONS } from './Actions'

const reducers = (state, action) => {
    console.log('actionnnnnnnnn', ACTIONS)
    switch (action.type) {
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            };
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            };
        case ACTIONS.ADD_CARD:
            return {
                ...state,
                card: action.payload
            };
        case ACTIONS.ADD_MODAL:
            return {
                ...state,
                modal: action.payload
            };
        case ACTIONS.ADD_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        default:
            return state
    }
}
export default reducers;

