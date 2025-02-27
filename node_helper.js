
const NodeHelper = require("node_helper");
const express = require('express')
module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === 'config') {
            this.expressApp.use(express.json());
            this.expressApp.post("/" + payload.name, express.json({ type: '*/*' }), (req, res) => {
            
                const notificationInfo = req.body

                this.sendSocketNotification(notificationInfo.notification, { payload: notificationInfo.payload, id: payload.id })
                res.end()
            });
        }
    }
})