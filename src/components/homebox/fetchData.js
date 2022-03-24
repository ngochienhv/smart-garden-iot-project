import axios from 'axios';
import mqtt from 'mqtt/dist/mqtt';

export default function fetching(setData, setDataArr, setConnectionStatus, feed) {
    const url = 'mqtt://ngochienhv:aio_hRKe39xRu3EXPo7mbFJWfEoMHbqU@io.adafruit.com';
    const topic = `ngochienhv/feeds/${feed}`;
    axios.get(`https://io.adafruit.com/api/v2/ngochienhv/feeds/${feed}/data`)
        .then((response) => {
            let tempDataArr = [];
            let tempData = response.data[0]["value"];
            for (let i = 0; i < 4; i++) {
                let temp = {
                    "time": "",
                    "value": 0
                }
                temp["time"] = new Date(response.data[i]["created_at"]).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).replace(",", "");
                temp["value"] = parseInt(response.data[i]["value"]);
                tempDataArr.push(temp);
            }
            tempDataArr.reverse();
            setData(tempData);
            setDataArr(tempDataArr);
        })

    const mqtt_client = mqtt.connect(url, 8883);
    console.log(mqtt_client);
    mqtt_client.on('connect', function () {
        setConnectionStatus(true);
        mqtt_client.subscribe(topic, () => { });
    });
    mqtt_client.on('message', (topic, message) => {
        const value = parseInt(message.toString());
        let tempData = value;
        let temp = {
            "time": new Date().toISOString(),
            "value": value
        };
        setDataArr(prev => [...prev, temp]);
        setData(tempData);
        setConnectionStatus(false);
        mqtt_client.end();
    });
}