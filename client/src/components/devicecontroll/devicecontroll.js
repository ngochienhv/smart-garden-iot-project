import mqttClient from '../mqttConnection/mqttConnection';

export default function deviceControll(data, feed) {
    const curTopic = `ngochienhv/feeds/${feed}`;
    console.log(curTopic);
    mqttClient.publish(curTopic, data, (err) => {
        console.log(err);
    });
}