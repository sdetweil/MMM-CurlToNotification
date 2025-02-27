
const NodeHelper = require("node_helper");
const express = require('express')
module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === 'config') {
            this.expressApp.use(express.json());
            this.expressApp.post("/" + payload.name, express.json({ type: '*/*' }), (req, res) => {
                // echo json
                //let x=res.json(req.body);
                //console.log("request=", req)
                // redirect to config form                
                const notificationInfo = req.body

                this.sendSocketNotification(notificationInfo.notification, notificationInfo.payload)
                res.end()
            });
        }
    }
})