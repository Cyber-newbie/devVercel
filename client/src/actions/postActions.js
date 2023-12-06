import {
    ADD_POST,
    CLEAR_ERROR,
    DELETE_POST,
    GET_ERROR,
    GET_POST,
    GET_POSTS,
    POST_LOADING
} from "../type"

export const addPost = (postData) => async dispatch => {
    const post = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        },
        body: JSON.stringify(postData)
    })
    if (post.ok) {

        const newPost = await post.json()
        dispatch({
            type: ADD_POST,
            payload: newPost
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const errorData = await post.json();
        dispatch({
            type: GET_ERROR,
            payload: errorData
        })
    }



}

//get all posts for post feed

export const getPosts = () => async dispatch => {

    setLoading()
    const posts = await fetch("/api/posts")
    if (posts.ok) {
        const newPost = await posts.json()
        dispatch({
            type: GET_POSTS,
            payload: newPost
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {

        dispatch({
            type: GET_POSTS,
            payload: null
        })
    }


}

//get specific post from post feed

export const getPost = (id) => async dispatch => {

    setLoading()
    const posts = await fetch(`/api/posts/${id}`)
    if (posts.ok) {
        const newPost = await posts.json()
        dispatch({
            type: GET_POST,
            payload: newPost
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {

        dispatch({
            type: GET_POST,
            payload: null
        })
    }


}



//delete post from post feed

export const deletePost = (id) => async dispatch => {

    setLoading()
    const posts = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        }
    })
    if (posts.ok) {
        await posts.json()
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const error = await posts.json()
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}

//add like to the post

export const addLike = (id) => async dispatch => {

    const posts = await fetch(`/api/posts/like/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        }
    })
    if (posts.ok) {
        await posts.json()
        dispatch(getPosts())
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const error = await posts.json()
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}

//remove like from the post

export const removeLike = (id) => async dispatch => {

    const posts = await fetch(`/api/posts/unlike/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        }
    })
    if (posts.ok) {
        await posts.json()
        dispatch(getPosts())
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const error = await posts.json()
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}

//add comment to post
export const addComment = (postId, commentData) => async dispatch => {

    const post = await fetch(`/api/posts/comment/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        },
        body: JSON.stringify(commentData)
    })
    if (post.ok) {

        const newPost = await post.json()
        dispatch({
            type: GET_POST,
            payload: newPost
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const errorData = await post.json();
        dispatch({
            type: GET_ERROR,
            payload: errorData
        })
    }

}

//delete comment from post
export const deleteComment = (postId, commentId) => async dispatch => {

    setLoading()
    const posts = await fetch(`/api/posts/comment/${postId}/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        }
    })
    if (posts.ok) {
        const response = await posts.json()

        dispatch({
            type: GET_POST,
            payload: response
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const error = await posts.json()
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}

//set post loading

const setLoading = () => {
    return {
        type: POST_LOADING
    }
}