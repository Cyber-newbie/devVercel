const Profile = require('../models/Profile')
const User = require('../models/Users')

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar'])
        if (profile) {
            res.status(200).json(profile)
        } else {
            res.status(404).json({})
        }
    } catch (error) {
        res.json({
            error
        })
    }


}

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({}).populate('user', ['name', 'avatar'])
        if (!profiles) {
            return res.status(404).json({
                profile: 'there are no profiles'
            })
        }
        const count = await Profile.count()
        res.status(200).json(profiles)
        console.log(count);
    } catch (error) {
        res.status(404).json({
            profile: 'there are no profiles',
            error
        })
    }
}

const profileByHandle = async (req, res) => {
    let errors = {}
    try {
        const profile = await Profile.findOne({
            handle: req.params.handle
        }).populate('user', ['name', 'avatar'])
        if (!profile) {
            errors.noprofile = 'there is no profile for this user'
            return res.status(400).json({
                errors
            })
        }
        res.status(200).json(profile)
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong',
            error
        })
    }
}

const profileById = async (req, res) => {
    let errors = {}
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar'])
        if (!profile) {
            errors.noprofile = 'there is no profile for this user'
            return res.status(400).json({
                errors
            })
        }
        res.status(200).json(profile)
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong',
            error
        })
    }
}

const userProfile = async (req, res) => {
    let errors = {};
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    console.log(profileFields.social.youtube);
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        if (profile) {
            const uptProfile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            })

            return res.status(201).json({
                msg: 'profile updated',
                uptProfile
            })
        }

        // check if handle exists
        const profileHandle = await Profile.findOne({
            handle: profileFields.handle
        })
        if (profileHandle) {
            errors.handle = 'handle already exist'
            return res.status(400).json({
                errors
            })
        }
        //create profile
        const newProfile = new Profile(profileFields)
        console.log('profile created');
        const createdProfile = await newProfile.save()
        res.status(201).json({
            createdProfile
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            if (errors.skills) {
                errors.skills = 'please enter your skills'
            }

            if (errors.website) {
                errors.website = 'invalid url'
            }

            if (errors["social.twitter"]) {
                errors["social.twitter"] = 'invalid twitter url'

            }

            if (errors["social.youtube"]) {
                errors["social.youtube"] = 'invalid youtube url'

            }

            if (errors["social.linkedin"]) {
                errors["social.linkedin"] = 'invalid linkedin url'

            }

            if (errors["social.facebook"]) {
                errors["social.facebook"] = 'invalid facebook url'

            }

            if (errors["social.instagram"]) {
                errors["social.instagram"] = 'invalid instagram url'

            }

            return res.status(400).json(errors)

        }
        // res.status(500).json('something went wrong');
        console.log(error);
    }
}

const addExperience = async (req, res) => {
    let errors = {};
    try {
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body
        const profile = await Profile.findOne({
            user: req.user.id
        })
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        profile.experience.unshift(newExp)
        await profile.save()
        res.status(201).json(profile)
    } catch (error) {
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((err) => {
                if (err == 'experience.0.title') {
                    errors.title = 'please enter title field'
                }
                if (err == 'experience.0.company') {
                    errors.company = 'please enter company field'
                }
                if (err == 'experience.0.from') {
                    errors.from = 'please enter from date field'
                }
            });
            return res.status(400).json(errors)
        }
        // res.status(500).json('something went wrong');
        console.log(error);
    }
}

const addEducation = async (req, res) => {
    let errors = {};
    try {
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body
        const profile = await Profile.findOne({
            user: req.user.id
        })
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }
        profile.education.unshift(newEdu)
        await profile.save()
        res.status(201).json(profile)
    } catch (error) {
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((err) => {
                if (err == 'education.0.school') {
                    errors.school = 'please enter school field'
                }
                if (err == 'education.0.degree') {
                    errors.degree = 'please enter degree field'
                }
                if (err == 'education.0.fieldofstudy') {
                    errors.fieldofstudy = 'please enter study field'
                }
                if (err == 'education.0.from') {
                    errors.from = 'please enter from date field'
                }
            });
            return res.status(400).json(errors)
        }
        // res.status(500).json('something went wrong');
        console.log(error);
    }
}


const deleteExperience = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        const index = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
        profile.experience.splice(index, 1)
        const newProfile = await profile.save()
        res.status(201).json(newProfile)
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}

const deleteEducation = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        const index = profile.education.map(item => item.id).indexOf(req.params.edu_id)
        profile.education.splice(index, 1)
        const newProfile = await profile.save()
        res.status(201).json(newProfile)
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}

const deleteUserandProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({
            user: req.user.id
        })
        await User.findOneAndRemove({
            _id: req.user.id
        })
        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }

}



module.exports = {
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
}