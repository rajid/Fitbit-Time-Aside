import {
    settingsStorage
} from "settings";
import * as messaging from "messaging";

settingsStorage.onchange = function(evt) {
    //  console.log("key: " + evt.key);
    //  console.log("new value" + evt.newValue);
    sendValue(evt.key, evt.newValue);
}

messaging.peerSocket.onopen = function() {
    // Ready to send or receive messages
    for (let i = 0; i < settingsStorage.length; i++) {
        let key = settingsStorage.key(i);
        sendValue(settingsStorage.key(i), settingsStorage.getItem(key));
    }
}

function sendValue(key, val) {
    if (val) {
        sendSettingData({
            key: key,
            value: JSON.parse(val)
        });
    }
}

function sendSettingData(data) {
    // If we have a MessageSocket, send the data to the device
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}