const express = require('express')
const {
    createPost,
    getPost,
    getAllPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment
} = require('../../controllers/posts')
const passport = require('passport')
const router = express.Router()

//routes@   /api/posts/:id
//access@   public
router.get('/:id', getPost)

//routes@   /api/posts/:id
//access@   private
router.delete('/:id', passport.authenticate('jwt', {
    session: false,
}), deletePost)

//routes@   /api/posts
//access@   public
router.get('/', getAllPost)

//routes@   /api/posts
//access@   private
router.post('/', passport.authenticate('jwt', {
    session: false,
}), createPost)

//routes@   /api/posts/like/:id
//access@   private
router.get('/like/:id', passport.authenticate('jwt', {
    session: false,
}), likePost)

//routes@   /api/posts/unlike/:id
//access@   private
router.get('/unlike/:id', passport.authenticate('jwt', {
    session: false,
}), unlikePost)

//routes@   /api/posts/comment/:id
//access@   private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false,
}), commentPost)

//routes@   /api/posts/comment/:id
//access@   private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false,
}), deleteComment)



module.exports = router