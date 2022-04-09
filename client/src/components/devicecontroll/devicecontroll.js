import mqtt from 'mqtt/dist/mqtt';

export default function deviceControll(data, feed) {
    const url = 'mqtt://ngochienhv:aio_hRKe39xRu3EXPo7mbFJWfEoMHbqU@io.adafruit.com';
    const topic = `ngochienhv/feeds/${feed}`;

    const mqtt_client = mqtt.connect(url, 8883);
    console.log(mqtt_client);
    mqtt_client.on('connect', function () {
        mqtt_client.subscribe(topic, (err) => {
            if (!err) {
                mqtt_client.publish(topic, data);
            }
        });
    });
}