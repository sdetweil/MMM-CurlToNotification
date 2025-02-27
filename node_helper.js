
const NodeHelper = require("node_helper");
const express = require('express')
module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === 'config') {
            try {            
                this.expressApp.use((err, req, res, next) => {
                    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                        return res.status(400).send({ status: 400, message: 'Invalid JSON payload' });
                    }
                    next();
                });
                this.expressApp.use(express.json());
                this.expressApp.post("/" + payload.name, express.json({ type: '*/*' }), (req, res) => {
            
                    const notificationInfo = req.body

                    this.sendSocketNotification(notificationInfo.notification, { payload: notificationInfo.payload, id: payload.id })
                    res.end()
                });
            }
            catch (error) {
                console.log(this.name+" message error=json formatting error")
            }
        }
    }
})