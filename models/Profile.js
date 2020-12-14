const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileInfoSchema = new Schema({
    account_plan: {
        type: String,
        enum: ['Free', 'Plus', 'Gold'],
        default: 'Free',
        required: true
    },
    plan_expire: {
        type: Date,
        default: null
    },
    score: {
        type: Number,
        default: 0,
        required: true
    },
    activity: {
        type: Number,
        default: 0,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const ProfileSettingsSchema = new Schema({
    location: {
        type: String,
        default: null,
    },
    looking_for: [{
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other',
    }],
    max_age: {
        type: Number,
        default: 60,
        required: true
    },
    max_distance: {
        type: Number,
        default: 100,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const ProfilePhotosSchema = new Schema({
    photos_url: [{
        type: String,
        default: null,
        required: true
    }],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const ProfileInfo = mongoose.model('ProfileInfo', ProfileInfoSchema);
const ProfileSettings = mongoose.model('ProfileSettings', ProfileSettingsSchema);
const ProfilePhotos = mongoose.model('ProfilePhotos', ProfilePhotosSchema);


module.exports = {
    ProfileInfo: ProfileInfo,
    ProfileSettings: ProfileSettings,
    ProfilePhotos: ProfilePhotos
}