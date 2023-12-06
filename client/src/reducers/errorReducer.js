import {
    CLEAR_ERROR,
    GET_ERROR
} from "../type";
const initalState = {}

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_ERROR:
            return action.payload
        case CLEAR_ERROR:
            return {}
            default:
                return state;
    }
}