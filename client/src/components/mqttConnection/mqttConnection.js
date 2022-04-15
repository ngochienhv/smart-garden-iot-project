import mqtt from 'mqtt/dist/mqtt';

require('events').EventEmitter.prototype._maxListeners = 0;

const url = 'mqtt://ngochienhv:aio_hRKe39xRu3EXPo7mbFJWfEoMHbqU@io.adafruit.com';

const lightTopic = 'ngochienhv/feeds/bbc-light';
const humiTopic = 'ngochienhv/feeds/bbc-humi';
const moistTopic = 'ngochienhv/feeds/bbc-soil';
const tempTopic = 'ngochienhv/feeds/bbc-temp';
const pumpTopic = 'ngochienhv/feeds/bbc-pump';
const ledTopic = 'ngochienhv/feeds/bbc-led';
const tempLimitTopic =  'ngochienhv/feeds/bbc-temp-limit';
const lightLimitTopic = 'ngochienhv/feeds/bbc-light-limit';
const soilLimitTopic = 'ngochienhv/feeds/bbc-soil-limit';
const humidLimitTopic = 'ngochienhv/feeds/bbc-humi-limit';

let instance = null;

class MqttConnection {
    constructor() {
        this._conn = null;
    }

    connect() {
        if (this._conn === null) {
            console.log('Adafruit Connnected!');
            this._conn = mqtt.connect(url, 8883);
        }
        else {
            console.log('Adafruit already connected!');
        }
    }

    getConn() {
        return this._conn;
    }

    static getInstance() {
        if (!instance) {
            console.log(`Creating mqtt connection instance!`);
            instance = new MqttConnection();
        }
        else {
            console.log(`Mqtt instance is already created!`);
        }
        return instance;
    }
}

const mq = MqttConnection.getInstance();
mq.connect();
const mqttClient = mq.getConn();

mqttClient.on('connect', () => {
    mqttClient.subscribe([lightTopic, moistTopic, humiTopic, tempTopic, pumpTopic, ledTopic, tempLimitTopic, soilLimitTopic, lightLimitTopic, humidLimitTopic]);
});

export default mqttClient;