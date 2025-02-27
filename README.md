to install

git clone https://github.com/sdetweil/MMM-CurlToNotification

add to config.js

```
{ 
  module:"MMM-CurlToNotification",
  config:{
    url_name:"testreq" // the path of the url for curl post
  }
}
```

to send a notification from any system on the network (accessible by MMM add/ipWhitelist)

here is a request to show an alert message using the Alert default module, note the last part of the host is the url_path

```
curl --header "Content-Type: application/json"   --request POST   --data '{"notification":"SHOW_ALERT","payload":{"message":"fribble"}}' http://localhost:8080/testreq
```

multiple instances of this module with  different url_names is supported.




