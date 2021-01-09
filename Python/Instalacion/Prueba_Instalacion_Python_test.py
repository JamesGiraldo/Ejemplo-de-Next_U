#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Fundamentos basicos de programacion en Python, NextU
# Actividad Final Unidad 1
#
# Observe las acciones realizadas en este programa y la
# salida que produce al ejecutar: python3 test.py
#

import platform

# print (float(2 * (3-1) - (1+1)**(5-2))/ 2 * 20.08) 
# print ("Estoy aumentando mi portafolio", len("mejores criptomonedas del 2018: Ethereum, Bitcoin, Icon y Neo") >= 10 and len("soy muy feliz") < 15 )

print('Curso             : Fundamentos basicos de programacion en Python')
print('Unidad            : 1')
print()

# Informacion del ambiente de desarrollo
print('Version de Python :', platform.python_version())
print('Plataforma        :', platform.platform())
print('Sistema           :', platform.system())
print('Nombre Nodo       :', platform.node())
print('Version kernel    :', platform.version())
print('Maquina/procesador:', platform.machine()+"/"+platform.processor())
