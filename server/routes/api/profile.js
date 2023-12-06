const express = require('express')
const Profile = require('../../models/Profile')
const {
    getProfile,
    userProfile,
    profileByHandle,
    profileById,
    getAllProfiles,
    addExperience,
    addEducation,
    deleteExperience,
    deleteEducation,
    deleteUserandProfile
} = require('../../controllers/profile')
const passport = require('passport')
const router = express.Router()

router.get('/delete/:delete', async (req, res) => {
    await Profile.findByIdAndDelete({
        id: req.params.delete
    })
})

//routes@   /api/proifle
//access@   public
router.get('/', passport.authenticate('jwt', {
    session: false,
}), getProfile)


//routes@  GET /api/profile/all
//access@   public
router.get('/all', getAllProfiles)

//routes@  GET /api/profile/:handle
//access@   public
router.get('/:handle', profileByHandle)

//routes@  GET /api/profile/user/:user_id
//access@   public
router.get('/user/:user_id', profileById)



//routes@   /api/profile
//access@   private
router.post('/', passport.authenticate('jwt', {
    session: false,
}), userProfile)

//routes@   /api/profile/experience
//access@   private
router.post('/experience', passport.authenticate('jwt', {
    session: false,
}), addExperience)

//routes@   DELETE /api/profile/experience/:exp_id
//access@   private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false,
}), deleteExperience)

//routes@   /api/profile/experience
//access@   private
router.post('/education', passport.authenticate('jwt', {
    session: false,
}), addEducation)

//routes@    DELETE /api/profile/education/:edu_id
//access@   private
router.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false,
}), deleteEducation)

//routes@    DELETE /api/profile
//access@   private
router.delete('/', passport.authenticate('jwt', {
    session: false,
}), deleteUserandProfile)


module.exports = router