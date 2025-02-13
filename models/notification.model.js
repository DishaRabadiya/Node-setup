const mongoose = require('mongoose')

const notificationModel = new mongoose.Schema({
    notification_title:{type:String},
    notification_description:{type:String},
    user_id:{type:Number},
    createdAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('notifications',notificationModel)