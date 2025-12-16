to install

git clone https://github.com/sdetweil/MMM-CurlToNotification

add to config.js

```
{ 
  module:"MMM-CurlToNotification",
  config:{
    url_name:"testreq" // the path of the url for curl post
    debug: true  //  false is the default
  }
}
```

to send a notification from any system on the network (accessible by MMM address/ipWhitelist)

here is a request to show an alert message using the Alert default module, note the last part of the host is the url_path

note: this notification is what the ALERT module needs, you need to examine the doc(README file) for the module to know exactly how the format should be<br><br>
the values true and false and null must NOT be quoted, else they turn into a string, and a string is always true <br>
for example 
```
 -data '{"notification":"USER_PRESENCE","payload":false}'
```


```
curl --header "Content-Type: application/json"   --request POST   --data '{"notification":"SHOW_ALERT","payload":{"message":"fribble"}}' http://localhost:8080/testreq
```

watch out, using curl from windows the quotes need to be handled differently

```
curl --header "Content-Type: application/json"   --request POST   --data "{\"notification\":\"SHOW_ALERT\",\"payload\":{\"message\":\"fribble\"}}" http://localhost:8080/testreq
```

multiple instances of this module with  different url_names is supported.
