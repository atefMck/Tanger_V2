const express = require('express');
const router = express.Router();

// Models importation
const ProfileInfo = require('../../models/Profile').ProfileInfo;
const ProfileSettings = require('../../models/Profile').ProfileSettings;
const ProfilePhotos = require('../../models/Profile').ProfilePhotos;

// @route   GET api/<users_id>/profile_info
// @desc    GET user profile info
// @access  Public
router.get('/:user_id/profile_info', (req, res) => {
    ProfileInfo.findOne({user_id: req.params.user_id})
        .then(profile_info => res.json(profile_info))
        .catch(err => res.status(404).json({status: false}))
});

// @route   GET api/<users_id>/profile_settings
// @desc    GET user profile settings
// @access  Public
router.get('/:user_id/profile_settings', (req, res) => {
    ProfileSettings.findOne({user_id: req.params.user_id})
        .then(profile_settings => res.json(profile_settings))
        .catch(err => res.status(404).json({status: false}))
});

// @route   GET api/<users_id>/profile_photos
// @desc    GET user profile photos
// @access  Public
router.get('/:user_id/profile_photos', (req, res) => {
    ProfilePhotos.findOne({user_id: req.params.user_id})
        .then(profile_photos => res.json(profile_photos))
        .catch(err => res.status(404).json({status: false}))
});

// @route   PUT api/<users_id>/profile_info
// @desc    UPDATE user profile info
// @access  Public
router.put('/:user_id/profile_info', (req, res) => {
    const newValues = {$set: req.body};
    ProfileInfo.findOneAndUpdate({user_id: req.params.user_id}, newValues, { new: true }, (err, profile_info) => {
        if (err) return res.status(404).json({status: false});
        res.json(profile_info);
    });
});

// @route   PUT api/<users_id>/profile_settings
// @desc    UPDATE user profile settings
// @access  Public
router.put('/:user_id/profile_settings', (req, res) => {
    const newValues = {$set: req.body};
    ProfileSettings.findOneAndUpdate({user_id: req.params.user_id}, newValues, { new: true }, (err, profile_settings) => {
        if (err) return res.status(404).json({status: false});
        res.json(profile_settings);
    });
});

// @route   PUT api/<users_id>/profile_photos
// @desc    UPDATE user profile photos
// @access  Public
router.put('/:user_id/profile_photos', (req, res) => {
    const newValues = {$set: req.body};
    ProfilePhotos.findOneAndUpdate({user_id: req.params.user_id}, newValues, { new: true }, (err, profile_photos) => {
        if (err) return res.status(404).json({status: false});
        res.json(profile_photos);
    });
});

module.exports = router;