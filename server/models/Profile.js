const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
    isUrl
} = require('../middleware/validate')

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: [true, 'please enter handle'],
        unique: [true, 'handle already exists'],
        max: 40,
    },
    company: {
        type: String
    },
    website: {
        type: String,
        validate: isUrl
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: [true, 'please enter your status']
    },
    skills: {
        type: [String],
        validate: v => Array.isArray(v) && v.length > 0
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [{
        title: {
            type: String,
            required: [true, 'please enter title field!']
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type: String,
            required: [true, 'enter your field']
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social: {
        youtube: {
            type: String,
            validate: isUrl
        },
        twitter: {
            type: String,
            validate: isUrl
        },
        facebook: {
            type: String,
            validate: isUrl
        },
        linkedin: {
            type: String,
            validate: isUrl
        },
        instagram: {
            type: String,
            validate: isUrl
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);