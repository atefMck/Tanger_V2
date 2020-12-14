const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    first_is_matched: {
        type: Boolean,
        default: null
    },
    second_is_matched: {
        type: Boolean,
        default: null
    },
    super_like: {
        type: Boolean,
        default: null
    },
    first_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    second_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const ConversationSchema = new Schema({
    date_creation: {
        type: Date,
        default: Date.now,
        required: true
    },
    first_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    second_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

const MessageSchema = new Schema({
    date_sent: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    conversation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    }
});

const Match = mongoose.model('Match', MatchSchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);
const Message = mongoose.model('Message', MessageSchema);


module.exports = {
    Match: Match,
    Conversation: Conversation,
    Message: Message
}