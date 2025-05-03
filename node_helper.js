
const NodeHelper = require("node_helper");
const express = require('express')
module.exports = NodeHelper.create({
    config:null,
    socketNotificationReceived(notification, payload) {
        if (notification === 'config') {
            try {            
                this.config=payload
                if(payload.debug === true)
                    console.log(this.name+ "received request to setup")
                this.expressApp.use((err, req, res, next) => {
                    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                        if(payload.debug === true){
                            console.log(this.name+ " received request to post notification JSON data syntax error")
                        }
                        return res.status(400).send({ status: 400, message: 'Invalid JSON payload' });
                    }
                    next();
                });
                this.expressApp.use(express.json());
                if(payload.debug === true)
                    console.log(this.name+ "setup for express route="+payload.name)
                this.expressApp.post("/" + payload.name, express.json({ type: '*/*' }), (req, res) => {
            
                    const notificationInfo = req.body
                    if(this.config.debug === true){
                        console.log(this.name+ "received request to post notification ",notificationInfo , " with id="+this.config.id)
                    }
                    this.sendSocketNotification(notificationInfo.notification, { payload: notificationInfo.payload, id:this.config.id })
                    res.end()
                });
            }
            catch (error) {
                console.log(this.name+" message error=json formatting error")
            }
        }
    }
})