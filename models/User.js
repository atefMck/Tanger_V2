const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const ProfileInfo = require('./Profile').ProfileInfo;
const ProfileSettings = require('./Profile').ProfileSettings;
const ProfilePhotos = require('./Profile').ProfilePhotos;
const Payment = require("./Payment").Payment;

const UserSchema = new Schema ({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date_of_creation: {
        type: Date,
        default: Date.now
    },
    profile_info: {
        type: Schema.Types.ObjectId,
        ref: "ProfileInfo",
        default: null
    },
    profile_settings: {
        type: Schema.Types.ObjectId,
        ref: "ProfileSettings",
        default: null
    },
    profile_photos: {
        type: Schema.Types.ObjectId,
        ref: "ProfilePhotos",
        default: null
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "Match",
        default: null
    }],
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        default: null
    }],
    payment_methods: [{
        type: Schema.Types.ObjectId,
        ref: "Payment",
        default: null
    }],
    stats: {
        type: Schema.Types.ObjectId,
        ref: "Premium",
        default: null
    },
    inventory: {
        type: Schema.Types.ObjectId,
        ref: "Premium",
        default: null
    }
});

UserSchema.pre('remove', function(next, res) {
    ProfileInfo.findById(this.profile_info)
        .then(profile_info => profile_info.remove())
        .catch(err => next(err))
    ProfileSettings.findById(this.profile_settings)
        .then(profile_settings => profile_settings.remove())
        .catch(err => next(err))
    ProfilePhotos.findById(this.profile_photos)
        .then(profile_photos => profile_photos.remove())
        .catch(err => next(err))
    Payment.deleteMany({_id: {$in: this.payment_methods}})
        .catch(err => next(err))
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;