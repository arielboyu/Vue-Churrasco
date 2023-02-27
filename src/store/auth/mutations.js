import {
    SET_AUTHENTICATION,
    SET_TOKEN
} from "../storeconstants";

export default {

    [SET_AUTHENTICATION](state, authenticated) {
        state.authenticated = authenticated
    },
    [SET_TOKEN](state, token) {
        state.token = token
    },
}