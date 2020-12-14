const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PremiumSchema = new Schema ({
    super_like: {
        type: Number,
        default: 0,
        required: true
    },
    liked: {
        type: Number,
        default: 0,
        required: true
    },
    passport: {
        type: Number,
        default: 0,
        required: true
    },
    rewind: {
        type: Number,
        default: 0,
        required: true
    },
    boost: {
        type: Number,
        default: 0,
        required: true
    },
    top_picks: {
        type: Number,
        default: 0,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Premium = mongoose.model('User', PremiumSchema);

module.exports = Premium;