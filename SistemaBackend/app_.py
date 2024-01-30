#!/usr/bin/python
# -*- coding: iso-8859-15 -*-
import smbus
import time

pic_address = 0x11

bus = smbus.SMBus(1)

while True:
    try:
        time.sleep(0.1)
        
        data = bus.read_i2c_block_data(pic_address, 0,8) 
        print("Datos recibidos desde el PIC:", data)

        time.sleep(0.2)
        
    except IOError as e:
        print("Error de comunicaciÃ³n I2C:" , e)
