# -*- coding: utf-8 -*-
"""
Created on Fri Apr 10 11:12:10 2020

@author: LEEN SU DIAZ
"""
from datetime import datetime
""" CODIGO  PARA ENTRAR ENTRAR AL API DE COIN MASTER Y DEVOLVER UN JSON CON LAS MONEDAS"""
from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
parameters = {
  'start':'1',
  'limit':'5000',
  'convert':'USD'
}

headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': 'c345cab1-59c7-4b32-8b99-93f585476ef8',
}

session = Session()
session.headers.update(headers)
response = session.get(url, params=parameters)
data = json.loads(response.text)

""" FIN DE CODIGO PARA TRAER EL JSON DEL API  """

""" ---------------------------------- CLASES Y METODOS PARA OPERACIONES ------------- """
  
#CLASE PARA VALIDAR EL INGRESO DE UNA OPCION DEL MENU ---------------
class verificaMenu():
    def __init__(self, dato):
        self.dato = dato
        
    #VALIDA SI ES UN ENTERO
    def verificaNumero(self):
        while True:
            try:
                self.dato = int(input("ingrese opcion: "))
                return self.dato
            except ValueError:
                print("ingrese un valor numerico...")
    
    #VALIDA SI ES UN UNA OPCION DEL MENU
    def verificaOpcMenu(self):
        if self.dato >= 0 and self.dato < 6:
            return self.dato
        else:
            print("Opcion no valida.")

#CLASE PARA RECIBIR MONEDA
class Transacciones(object):
    def __init__(self, operacion, moneda, cantidad, codigo, saldo):
        self.operacion = operacion
        self.moneda = moneda
        self.cantidad = cantidad
        self.codigo = codigo
        self.saldo = saldo
        
    def Operaciones(self):
        FechaHora = datetime.now()
        HistorialTexto = "Historial.txt"
        archivo = open(HistorialTexto,"a")
        if self.operacion == "Recibio":
            nuevaEntrada = "Usuario("+self.codigo+") -- Fecha("+FechaHora.strftime("%A, %d de %B de %Y a las %I:%M:%S%p")+") -- Moneda("+self.moneda+") -- Cantidad("+str(self.cantidad)+") -- Monto Total("+str(int(self.saldo)+self.cantidad)+")"
        if self.operacion == "Transferencia":
            nuevaEntrada = "Usuario("+self.codigo+") -- Fecha("+FechaHora.strftime("%A, %d de %B de %Y a las %I:%M:%S%p")+") -- Moneda("+self.moneda+") -- Cantidad("+str(self.cantidad)+") -- Monto Total("+str(int(self.saldo)-self.cantidad)+")"
        archivo.write("\n"+self.operacion+":"+nuevaEntrada)
        archivo.close
    
    def OpeMoneda(self):
        MonedaTexto = "Moneda.txt"
        archivo = open(MonedaTexto,"a")
        if self.operacion == "Recibio":
            nuevoRegistro = int(self.saldo) + self.cantidad
        elif self.operacion == "Transferencia":
            nuevoRegistro = int(self.saldo) - self.cantidad
        archivo.write("\n"+self.moneda+":"+str(nuevoRegistro))
        archivo.close
        
    #IMPRIME EL HISTORIAL DE TRANSACCIONES 
    def imprimeTexto(self):
        HistorialTexto = "Historial.txt"
        with open(HistorialTexto) as h:
            texto = h.read()
        print(texto)
   
#CLASE PARA EL PROCESAMIENTO DE LA MONEDA     
class ProcesosMoneda(object):
    def __init__(self, moneda, data):
        self.moneda = moneda
        self.data = data
        
    def VerificaMoneda(self):
        tuplaMonedas=()
        dicionarioMonedas={}
        #por cada moneda va creando una clave-valor = simbolo-nombre
        for cMoneda in self.data["data"]:
            dicionarioMonedas[cMoneda["symbol"]]=cMoneda["name"]
        #se crea una tupla con cada simbolo del diccionario
        tuplaMonedas = dicionarioMonedas.keys()
        if self.moneda not in tuplaMonedas:
            print("Moneda invalida")
            return False
        else:
            return True
    
    def verSaldoMoneda(self):
        MonedaTexto = "Moneda.txt"
        archivo = open(MonedaTexto,"r")
        texto = archivo.read()
        archivo.close()
        lineas = texto.splitlines()
        diccionario={}
        for linea in lineas:
            termino = linea.split(":")
            diccionario[termino[0]]=termino[1]   
        encontrado = diccionario.get(self.moneda)
        if encontrado:
            return encontrado
        else:
            print("Moneda Erronea.")
            return None
    
    def SaldoGeneralMoneda(self):
        MonedaTexto = "Moneda.txt"
        archivo = open(MonedaTexto,"r")
        texto = archivo.read()
        archivo.close()
        lineas = texto.splitlines()
        diccionario={}
        tuplaMonedas=[]
        for linea in lineas:
            termino = linea.split(":")
            diccionario[termino[0]]=termino[0]
        #POR CADA CLAVE -VALOR DEL DICCIONARIO AGREGO UN KEY A MI LISTA
        for key,value in diccionario.items():
            tuplaMonedas.append(value)
        #POR CADA KEY EN LA LISTA IMPRIMO SUS VALORES
        for i in range(0,len(tuplaMonedas)):
            mon = tuplaMonedas[i]
            ProcMon = ProcesosMoneda(mon,data)
            respuesta = ProcMon.verSaldoMoneda()
            nombre,cotiza = ProcMon.DatosMoneda()
            print("\n"+nombre+":  \n     Saldo: "+str(respuesta)+" "+mon+"  \n     Cambio a USD: "+str(int(respuesta)*int(cotiza))+" USD")
    
    def DatosMoneda(self):
        dicionarioNomMonedas={}
        dicionarioUSDMonedas={}
        #por cada moneda va creando una clave-valor = simbolo-nombre
        for cMoneda in self.data["data"]:
            dicionarioNomMonedas[cMoneda["symbol"]]=cMoneda["name"]
            dicionarioUSDMonedas[cMoneda["symbol"]]=cMoneda["quote"]["USD"]["price"]
        nombreM = dicionarioNomMonedas.get(self.moneda) 
        UsdM = dicionarioUSDMonedas.get(self.moneda)
        return nombreM,UsdM
        
#CLASE PARA VERIFICAR EL INGRESO DEL USUARIO
class ProcesosUsuario(object):
    def __init__(self, codigo):
        self.codigo = codigo
        
    def VerificaUsuario(self):
        CodigoTexto = "Codigo.txt"
        archivo = open(CodigoTexto,"r")
        texto = archivo.read()
        archivo.close()
        lineas = texto.splitlines()
        diccionario={}
        for linea in lineas:
            termino = linea.split(":")
            diccionario[termino[0]]=termino[1]
            
        encontrado = diccionario.get(self.codigo)  
        if encontrado:
            if self.codigo == "240514":
                print("No puede realizar la operacion con su codigo, digite uno diferente.")
                return None
            else:
                return encontrado
        else:
            print("Codigo de usuario no existe.")
            codigoNew = input("Desea ingresar este codigo(s/n):")
            if (codigoNew=='s'):
                archivo = open(CodigoTexto,"a")
                NombreNew = input("Indique el nombre del usuario "+self.codigo+":")
                archivo.write("\n"+self.codigo+":"+NombreNew)
                archivo.close()
            return None

""" ---------------------------------- FIN DE LAS CLASES ------------- """

print("--------- MENU --------")
print("1.- Recibir")
print("2.- Transferir")
print("3.- Balance por moneda")
print("4.- Balance General")
print("5.- Historia Transaccional")
print("0.- Salir")

opcion = ""
#MIENTRAS NO SE PRESIONE LA OPCION DE SALIR
while opcion != 0:
    verifica = verificaMenu(opcion)
    opcion = verifica.verificaNumero()
    opcion = verifica.verificaOpcMenu()
    if opcion == 1:
        respuesta = False
        vUsuario = None
        operacion = "Recibio"
        while respuesta == False:
            moneda = input("Ingrese la moneda a recibir: ")
            ProcMon = ProcesosMoneda(moneda,data)
            respuesta = ProcMon.VerificaMoneda() 
            saldo = ProcMon.verSaldoMoneda()
        cantidad = int(input("Ingrese la cantidad a recibir: "))
        #VERIFICA EL CODIGO DE USUARIO Y DEVUELVE EL NOMBRE DEL USUARIO
        while vUsuario == None:
            codigo = input("Ingrese su codigo: ")
            verUsu = ProcesosUsuario(codigo)
            vUsuario = verUsu.VerificaUsuario()
        transac = Transacciones(operacion,moneda,cantidad,codigo,saldo)
        newTran = transac.Operaciones()
        newOpeMon = transac.OpeMoneda()
        print(operacion+" con exito el Dinero depositado por: "+str(vUsuario))
         
    elif opcion == 2:
        respuesta = False
        vUsuario = None
        saldo = 0
        operacion = "Transferencia"
        while respuesta == False:
            moneda = input("Ingrese la moneda a transferir: ")
            ProcMon = ProcesosMoneda(moneda,data)
            respuesta = ProcMon.VerificaMoneda()
            saldo = ProcMon.verSaldoMoneda()
        cantidad = int(input("Ingrese la cantidad a transferir: "))
        #VERIFICA EL CODIGO DE USUARIO Y DEVUELVE EL NOMBRE DEL USUARIO
        while vUsuario == None:
            codigo = input("Ingrese el codigo del usuario a transferir: ")
            verUsu = ProcesosUsuario(codigo)
            vUsuario = verUsu.VerificaUsuario()
        transac = Transacciones(operacion,moneda,cantidad,codigo,saldo)
        newTran = transac.Operaciones()
        newOpeMon = transac.OpeMoneda()
        print("Realizo la "+operacion+" de dinero con exito al usuario: "+str(vUsuario))
        
    elif opcion == 3:
        respuesta = None
        while respuesta == None:
            moneda = input("ingrese moneda: ")
            ProcMon = ProcesosMoneda(moneda,data)
            respuesta = ProcMon.verSaldoMoneda()
            nombre,cotiza = ProcMon.DatosMoneda()
            print("Usted cuenta con "+respuesta+" "+nombre+" al precio de "+str(cotiza)+" USD, cuenta con "+str(int(respuesta)*int(cotiza))+" USD")
            
    elif opcion == 4:
        ProcMon = ProcesosMoneda(moneda,data)
        ProcMon.SaldoGeneralMoneda()
        
    elif opcion == 5:
        historial = Transacciones("","","","","")        
        reporte = historial.imprimeTexto()
        
        