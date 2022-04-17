import sys
import random
import time
import datetime
import requests
import serial.tools.list_ports
from Adafruit_IO import MQTTClient

#---------- Adafruit IO connection information --------#
AIO_FEED_IDS = ["bbc-led", "bbc-pump", "bbc-temp-limit", "bbc-soil-limit", "bbc-light-limit"]
AIO_USERNAME = "ngochienhv"
AIO_KEY = "aio_hRKe39xRu3EXPo7mbFJWfEoMHbqU"

tempLimit = requests.get("https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-temp-limit/data/retain")
humiLimit = requests.get("https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-humi-limit/data/retain")
lightLimit = requests.get("https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-light-limit/data/retain")
soilLimit = requests.get("https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-soil-limit/data/retain")

tempLimitValue = tempLimit.text.split(',')[0]
humiLimitValue = humiLimit.text.split(',')[0]
soilLimitValue = soilLimit.text.split(',')[0]
lightLimitValue = lightLimit.text.split(',')[0]

#---------- Subscribing to bbc-led and bbc-pump feeds -------#
def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)

def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thanh cong ...")

def setLimit():
    ser.write((":" + tempLimit + "#").encode())
    time.sleep(0.5)
    ser.write(("," + soilLimit + "#").encode())
    time.sleep(0.5)
    ser.write(("." + lightLimit + "#").encode())

setLimit()

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)

#---- Getting data from server and send to microbit -----#
def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)
    if feed_id == "bbc-temp-limit":
        ser.write((":" + str(payload) + "#").encode())
    if feed_id == "bbc-soil-limit":
        ser.write(("," + str(payload) + "#").encode())
    if feed_id == "bbc-light-limit":
        ser.write(("." + str(payload) + "#").encode())
    else:
        ser.write((str(payload) + "#").encode())

#---- Getting port of microbit ------#
def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

#------- Connecting to microbit ---------#
isMicrobitConnected = False
if getPort() != "None":
    ser = serial.Serial( port=getPort(), baudrate=115200)
    isMicrobitConnected = True  

#------- Processing data sent from microbit ------#
def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    query = ""
    #---- Temperature data ----#
    if splitData[1] == "TEMP":
        client.publish("bbc-temp", splitData[2])
    #---- Humid data -----#
    elif splitData[1] == "HUMI":
        client.publish("bbc-humi", splitData[2])
    #---- Soil moisture data-----#
    elif splitData[1] == "SOIL":
        client.publish("bbc-soil", splitData[2])
    #---- Light data -----#
    elif splitData[1] == "LIGHT":
        client.publish("bbc-light", splitData[2])
    #---- Light turned on event ------#
    elif splitData[1] == "LIGHTON":
        client.publish("bbc-led", "1")
    #---- Light turned off event ------#
    elif splitData[1] == "LIGHTOFF":
        client.publish("bbc-led", "0")
    #---- Pump turned on event ------#
    elif splitData[1] == "PUMPON":
        client.publish("bbc-pump", "2")
    #---- Pump turned off event ------#
    elif splitData[1] == "PUMPOFF":
        client.publish("bbc-pump", "3")

#--------- Reading message sent from microbit -----------#
mess = ""
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:] 

client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    if isMicrobitConnected:
        readSerial()
    time.sleep(15)