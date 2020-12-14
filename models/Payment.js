const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');


const PaymentSchema = new Schema({
    card_number: {
        type: Number,
        required: true
    },
    exp_date: {
        type: Date,
        required: true
    },
    cryptogramme: {
        type: Number,
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    tva: {
        type: Number,
        required: true
    },
    tax_stamp: {
        type: Number,
        required: true
    },
    date_purchased: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Not Paid'],
        default: 'Pending',
        required: true
    },
    payment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
});

const Order = mongoose.model('Order', OrderSchema);

PaymentSchema.pre('remove', function(next){
    Order.deleteMany({_id: {$in: this.orders}})
        .catch(err => next(err))
    
    // User.updateOne({_id: this.user_id}, {$pull: {payment_methods: this._id}})
    //     .catch(err => next(err))
    // next();
});

const Payment = mongoose.model('Payment', PaymentSchema);


module.exports = {
    Payment: Payment,
    Order: Order
}