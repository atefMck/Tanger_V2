const express = require('express');
const router = express.Router();

// Models importation
const User = require('../../models/User');
const Payment = require("../../models/Payment").Payment;
const Order = require("../../models/Payment").Order;

// @route   GET api/<users_id>/payment
// @desc    GET user payment methods
// @access  Public
router.get('/:user_id/payments', (req, res) => {
    Payment.find({user_id: req.params.user_id})
        .then(payment => res.json(payment))
        .catch(err => res.status(404).json({status: false}))
});

// @route   GET api/<users_id>/<payment_id>/orders
// @desc    GET user payment method's orders
// @access  Public
router.get('/:user_id/:payment_id/orders', (req, res) => {
    Order.find({payment_id: req.params.payment_id})
        .then(order => res.json(order))
        .catch(err => res.status(404).json({status: false}))
});

// @route   POST api/<users_id>/payment
// @desc    POST new user payment method
// @access  Public
router.post('/:user_id/payments', (req, res) => {
    const newPayment = new Payment({
        card_number: req.body.card_number,
        exp_date: req.body.exp_date,
        cryptogramme: req.body.cryptogramme,
        user_id: req.params.user_id
    });
    User.updateOne({_id: req.params.user_id}, {$push: {payment_methods: newPayment._id}}, (err) => {
        if (err) return res.status(404).json({status: false});
    });
    newPayment.save().then(payment_method => res.json(payment_method));;
});

// @route   POST api/<users_id>/<payment_method_id>/order
// @desc    POST new user payment method order
// @access  Public
router.post('/:user_id/:payment_method_id/order', (req, res) => {
    const newOrder = new Order({
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        tva: req.body.tva,
        tax_stamp: req.body.tax_stamp,
        status: req.body.status,
        payment_id: req.params.payment_method_id
    });
    Payment.updateOne({_id: req.params.payment_method_id}, {$push: {orders: newOrder._id}}, (err) => {
        if (err) return res.status(404).json({status: false});
    });
    newOrder.save().then(order => res.json(order));;
});

// @route   DELETE POST api/<users_id>/<payment_method_id>
// @desc    DELETE a user's payment method
// @access  Private
router.delete('/:user_id/:payment_method_id', (req, res) => {
    Payment.findById(req.params.payment_method_id)
        .then(payment_method => payment_method.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({status: false}))
});

// @route   DELETE POST api/<users_id>/<payment_method_id>
// @desc    DELETE a user's payment method
// @access  Private
router.delete('/:user_id/:payment_method_id/:order_id', (req, res) => {
    Order.findById(req.params.order_id)
        .then(order => order.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({status: false}))
});

module.exports = router;