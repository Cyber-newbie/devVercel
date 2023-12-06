import {
    GET_ERROR,
    SET_CURRENT_USER,
    CLEAR_ERROR
} from "../type";
import jwt_decode from 'jwt-decode'
export const registerUser = (userData, navigate) => async dispatch => {
    const user = await fetch("https://dev-vercel-hassan-haiders-projects.vercel.app/api/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userData),
        // mode: "no-cors",
    });
    if (user.ok) {
        await user.json()
        dispatch({
            type: CLEAR_ERROR
        })
        return navigate("/login")
    }
    // (created.name === "name is required" || created.email === "email is required" || created.password === "password is required")
    else {
        const created = await user.json()
        return dispatch({
            type: GET_ERROR,
            payload: created

        })
    }



}

export const loginUser = userData => async dispatch => {

    const user = await fetch("https://dev-vercel-hassan-haiders-projects.vercel.app/api/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userData),
        // mode: "no-cors",
    })
    if (user.ok) {
        const loggedUser = await user.json()
        const {
            token
        } = loggedUser
        //set token in ls
        localStorage.setItem('jwtToken', token)
        // decode token
        const decoded = jwt_decode(token)
        //set current user
        dispatch(setCurrentUser(decoded))
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const loggedUser = await user.json()
        dispatch({
            type: GET_ERROR,
            payload: loggedUser
        })
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    dispatch(setCurrentUser({}))
    window.location.href = "/login";
}