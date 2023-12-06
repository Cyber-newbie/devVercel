import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE
} from "../type";
import isEmpty from "../validation/is-empty";

const initalState = {
    profile: null,
    profiles: null,
    loading: false,
    profileExist: false
}

export default function (state = initalState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
            case GET_PROFILE:
                return {
                    ...state,
                    profile: action.payload,
                        profileExist: !isEmpty(action.payload),
                        loading: false
                }
                case GET_PROFILES:
                    return {
                        ...state,
                        profiles: action.payload,
                            loading: false
                    }
                    case CLEAR_CURRENT_PROFILE:
                        return {
                            ...state,
                            profile: null
                        }
                        default:
                            return state;
    }
}