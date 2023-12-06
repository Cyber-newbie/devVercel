import {
    PROFILE_LOADING,
    GET_PROFILE,
    GET_PROFILES,
    CLEAR_CURRENT_PROFILE,
    GET_ERROR,
    SET_CURRENT_USER
} from "../type";

//get current profile
export const getCurrentProfile = () => async dispatch => {
    dispatch(setProfileLoading())
    const profile = await fetch("/api/profile", {
        headers: {
            Authorization: localStorage.jwtToken
        }
    })
    const newProfile = await profile.json()
    if (newProfile) {
        dispatch({
            type: GET_PROFILE,
            payload: newProfile
        })
    } else {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }
}

//get profile by handle
export const getProfileByHandle = (handle) => async dispatch => {
    dispatch(setProfileLoading())
    const profile = await fetch(`/api/profile/${handle}`)
    const newProfile = await profile.json()
    if (newProfile) {
        dispatch({
            type: GET_PROFILE,
            payload: newProfile
        })
    } else {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }
}


export const createProfile = (profileData) => async dispatch => {
    const profile = await fetch("/api/profile", {
        method: "POST",
        headers: {
            Authorization: localStorage.jwtToken,
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(profileData),
        // mode: "no-cors",
    })

    const newProfile = await profile.json()

    if (newProfile.hasOwnProperty('createdProfile')) {
        dispatch({
            type: GET_PROFILE,
            payload: newProfile

        })


    }
    if (newProfile.hasOwnProperty('uptProfile')) {



    } else if (!newProfile.hasOwnProperty('status') || !newProfile.hasOwnProperty('handle') || !newProfile.hasOwnProperty('skills')) {
        dispatch({
            type: GET_ERROR,
            payload: newProfile

        })
    }
}

export const addExperience = (addExp, navigate) => async dispatch => {

    const added = await fetch("/api/profile/experience", {
        method: "POST",
        headers: {
            Authorization: localStorage.jwtToken,
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(addExp),
        // mode: "no-cors",
    })

    const Exp = await added.json()

    if (Exp.title === "please enter title field" || Exp.company === "please enter company field" || Exp.from === "please enter from date field") {
        return dispatch({
            type: GET_ERROR,
            payload: Exp

        })
    }

    navigate("/dashboard")
}


export const addEducation = (addEdu, navigate) => async dispatch => {

    const added = await fetch("/api/profile/education", {
        method: "POST",
        headers: {
            Authorization: localStorage.jwtToken,
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(addEdu),
        // mode: "no-cors",
    })

    const Edu = await added.json()
    if (Edu.school === "please enter school field" || Edu.degree === "please enter degree field" || Edu.fieldofstudy === "please enter study field" || Edu.from === "please enter from date field") {
        return dispatch({
            type: GET_ERROR,
            payload: Edu

        })
    }

    navigate("/dashboard")

}

export const deleteExperience = (id) => async dispatch => {

    //API to delete an experience from user's profile

    try {
        const profile = await fetch(`/api/profile/experience/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.jwtToken,
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
            // mode: "no-cors",
        })
        if (!profile.ok) {
            throw new Error("Failed to delete experience");
        }

        const newProfile = await profile.json()
        dispatch({
            type: GET_PROFILE,
            payload: newProfile
        })

    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}


export const deleteEducation = (id) => async dispatch => {

    //API to delete an Education from user's profile

    try {
        const profile = await fetch(`/api/profile/education/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.jwtToken,
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
            // mode: "no-cors",
        })
        if (!profile.ok) {
            throw new Error("Failed to delete Education");
        }

        const newProfile = await profile.json()
        dispatch({
            type: GET_PROFILE,
            payload: newProfile
        })

    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}


export const getProfiles = () => async dispatch => {
    //get all the profiles
    dispatch(setProfileLoading())
    try {
        const profiles = await fetch(`/api/profile/all`, {
            method: "GET"
            // mode: "no-cors",
        })
        // if (!profile.ok) {
        //     throw new Error("Failed to delete experience");
        // }

        const newProfiles = await profiles.json()
        dispatch({
            type: GET_PROFILES,
            payload: newProfiles
        })

    } catch (error) {
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    }
}

//delete user's account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? this cannot be undone!')) {
        try {
            await fetch("/api/profile", {
                method: "DELETE",
                headers: {
                    Authorization: localStorage.jwtToken,
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                }
                // mode: "no-cors",
            })
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })

        } catch (err) {
            dispatch({
                type: GET_ERROR,
                payload: err
            })
        }

    }
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}