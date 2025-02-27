Module.register("MMM-CurlToNotification", {
    defaults:{
        url_name:"testreq",
    },
    start: function(){
        this.sendSocketNotification('config', { name:this.config.url_name,id:this.identifier})
    },
    socketNotificationReceived: function (notification, notification_data) {
        if(notification_data.id === this.identifier)
            this.sendNotification(notification, notification_data.payload)
    }
})