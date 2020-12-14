const express = require('express');
const router = express.Router();

// Models importation
const User = require('../../models/User');
const ProfileInfo = require('../../models/Profile').ProfileInfo;
const ProfileSettings = require('../../models/Profile').ProfileSettings;
const ProfilePhotos = require('../../models/Profile').ProfilePhotos;

// @route   GET api/users
// @desc    GET all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({date_of_creation: -1})
        .then(users => res.json(users))
});

// @route   POST api/users
// @desc    POST new user
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        phone: req.body.phone,
    });

    const newProfileInfo = new ProfileInfo({
        user_id: newUser._id
    });

    const newProfileSettings = new ProfileSettings({
        user_id: newUser._id
    });

    const newProfilePhotos = new ProfilePhotos({
        user_id: newUser._id
    });

    newUser.profile_info = newProfileInfo._id;
    newUser.profile_settings = newProfileSettings._id;
    newUser.profile_photos = newProfilePhotos._id;

    newProfileInfo.save();
    newProfileSettings.save();
    newProfilePhotos.save();
    
    newUser.save().then(user => res.json(user));
});

// @route   DELETE api/users
// @desc    DELETE a user
// @access  Private
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then( user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({status: false}))
});

// @route   PUT api/users
// @desc    UPDATE an existant user
// @access  Private
router.put('/:id', (req, res) => {
    const newValues = {$set: req.body};
    User.findOneAndUpdate({_id: req.params.id}, newValues, { new: true }, (err, user) => {
        if (err) return res.status(404).json({status: false});
        res.json(user);
    });
});

module.exports = router;