Module.register("MMM-CurlToNotification", {
    defaults:{
        url_name:"testreq",
        debug: false
    },
    config:null,
    notificationReceived: function (notification){
        if(notification === 'ALL_MODULES_STARTED')
        this.sendSocketNotification('config', { name:this.config.url_name,id:this.identifier, debug:this.config.debug})
    },
    socketNotificationReceived:function(notification, notification_data){
        if(notification_data.id === this.identifier){
            if(this.config.debug)
                Log.debug("received request to send notication ",notification," with payload ", notification_data.payload)
            this.sendNotification(notification, notification_data.payload)
        }
    }
})