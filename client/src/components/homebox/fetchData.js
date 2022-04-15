import axios from 'axios';
import mqttClient from '../mqttConnection/mqttConnection';

export default function fetching(setData, setDataArr, setConnectionStatus, feed) {
    const curTopic = `ngochienhv/feeds/${feed}`;
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

    mqttClient.on('message', (topic, message) => {
        setConnectionStatus(true);
        if (topic === curTopic) {
            const value = parseInt(message.toString());
            let tempData = value;
            let temp = {
                "time": new Date().toISOString(),
                "value": value
            };
            setDataArr(prev => [...prev, temp]);
            setData(tempData);
            setConnectionStatus(false);
        }
    });

}