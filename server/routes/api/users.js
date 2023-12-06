const express = require('express')
const {
    getAllUsers,
    registerUser,
    loginUser
} = require('../../controllers/users')
const passport = require('passport')
const router = express.Router()

//routes@   /api/users
//access@   public
router.get('/', getAllUsers);

//routes@   /api/users/register
//access@   public
router.post('/register', registerUser);

//routes@   /api/users/login    
//access@   public
router.post('/login', loginUser);

router.get('/current', passport.authenticate('jwt', {
        session: false,
    }),
    (req, res) => {
        res.status(200).json({
            msg: 'success',
            user: req.user
        });
    })

module.exports = router