const Post = require('../models/Posts')

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({
            message: 'page not found'
        })
    }


}

const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        let errors = {}
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json(errors)

        }
        res.status(500).json('something went wrong');
        console.log(error);
    }

}

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['name', 'avatar']).sort({
            date: -1
        })
        res.status(201).json(posts)
    } catch (error) {
        res.status(400).json({
            message: 'posts not found'
        })
    }


}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.user.toString() !== req.user.id) {
            return res.status(400).json({
                message: 'unauthorized'
            })
        } else {
            await post.remove()
            return res.status(200).json({
                message: 'your post has been removed'
            })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.filter(item => item.user.toString() == req.user.id).length > 0) {
            return res.status(400).json({
                message: 'you have already liked this post'
            })
        }
        post.likes.unshift({
            user: req.user.id
        })
        const newPost = await post.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error)
    }
}

const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.filter(item => item.user.toString() == req.user.id).length == 0) {
            return res.status(400).json({
                message: 'you have not liked this post'
            })
        }
        const index = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
        post.likes.splice(index, 1)
        const newPost = await post.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error)
    }
}

const commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const {
            text,
            name,
            avatar,

        } = req.body

        const comment = {
            text,
            name,
            avatar,
            user: req.user.id
        }
        post.comments.unshift(comment)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        let errors = {}
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((err) => {
                if (err == 'comments.0.text') {
                    errors.text = 'please enter text'
                }
            });
            return res.status(400).json(errors)
        }
        // res.status(500).json('something went wrong');
        console.log(error);
    }
}

//delete comment from post
const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length == 0) {
            return res.status(400).json({
                message: 'comment does not exist'
            })
        }
        const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id)
        post.comments.splice(removeIndex, 1)
        const newPost = await post.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json({
            message: "no post found"
        })
    }
}


module.exports = {
    createPost,
    getPost,
    getAllPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment
}