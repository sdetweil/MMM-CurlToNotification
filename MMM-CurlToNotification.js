Module.register("MMM-CurlToNotification", {
    defaults:{
        url_name:"testreq",
    },
    start: function(){
        this.sendSocketNotification('config', { name:this.config.url_name,id:this.identifier})
    },
    socketNotificationReceived: function(notification, payload){
        this.sendNotification(notification,payload)
    }
})