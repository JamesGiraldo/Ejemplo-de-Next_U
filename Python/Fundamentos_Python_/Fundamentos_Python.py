import requests
from datetime import datetime

_ENDPOINT = "https://api.binance.com"
nombre_archivo = "TRANSACCIONES.txt"

class Usuario(object):
    def __init__(self, codigo):
        self.codigo = codigo
    
    def mostrarCodigo(self):
        return self.codigo

class Criptomoneda(object):
    def __init__(self, nombre, cantidad):
        self.nombre = nombre
        self.cantidad = cantidad
    
    def indicarCantidad(self, cantidad):  
        self.cantidad=cantidad

    def mostrarNombre(self):
        return self.nombre
    
    def mostrarCantidad(self):  
        return  self.cantidad
    
    def calcularSaldo(self, cotizacion):  
        return self.cantidad*cotizacion

def _url(api):
    return _ENDPOINT+api

def get_price(cripto):
    data = requests.get(_url("/api/v3/ticker/price?symbol="+cripto)).json()
    precio = float(data["price"])
    return precio

def esmoneda(cripto):
    criptos = ["BTC","BCC","LTC","ETH"]
    if cripto in criptos:
        return True
    else:
        print("INGRESE UNA MONEDA VÁLIDA (BTC,BCC,LTC,ETH)")
        return False

def validarCodigo(codigo):
    if codigo == usuario.codigo:
        print("\n       ¡TRANSACCIÓN FALLÍDA!, EL CÓDIGO ES INVÁLIDO")
        return False
    else:
        return True

def cantidadSuficiente(moneda, cantidad):
    aux = True
    if(moneda== "BTC"):
        if(BTC.cantidad >= cantidad):
            return True
        else:
            aux = False
    if(moneda== "ETH"):
        if(ETH.cantidad >= cantidad):
            return True
        else:
            aux = False
    if(moneda== "BCC"):
        if(BCC.cantidad >= cantidad):
            return True
        else:
            aux = False
    if(moneda== "LTC"):
        if(LTC.cantidad >= cantidad):
            return True
        else:
            aux = False
    if(aux==False):
        print("     ¡TRANSACCIÓN RECHAZADA!, SALDO : "+ moneda+ " ES INSUFICIENTE")
        return False

def GuardarRegistro(moneda, operacion, codigo, cantidad, cantTotal):
    archivo = open(nombre_archivo,"a")
    dt = datetime.now()
    precio =  get_price(moneda+"USDT")
    archivo.write("\n"+"FECHA"+ ":" + dt.strftime("%A %d/%m/%Y %I:%M:%S%p") +",MONEDA " +":"+str(moneda)+", TRANSACCIÓN " +":"+ operacion+", CÓDIGO USUARIO "+ ":"+ str(codigo) + ",CANTIDAD "+ ":"+ str(cantidad) + ",TOTAL DE OPERACIÓN EN $ "+":"+ str(precio*cantidad) +", TOTAL ACUMULADO EN CUENTA EN $ " + ":"+ str(precio*cantTotal))
    archivo.close()
    return

BTC = Criptomoneda("BTC",2.5)
ETH = Criptomoneda("ETH",0.6734)
BCC = Criptomoneda("BCC",8.5)
LTC = Criptomoneda("LTC",7.36)
monedas = [BTC,ETH,BCC,LTC]
usuario = Usuario(2161)

while True:
    print("------------------------------------------------------------")
    print("<<<<<<<<<<<<<<< BILLETERA DIGITAL >>>>>>>>>>>>>>>")
    print("------------------------------------------------------------")
    print("CÓDIGO DE USUARIO: " + str(usuario.mostrarCodigo()))
    print("MENÚ DE OPCIONES: ")
    print(("1. RECIBIR CANTIDAD \n"
           "2. TRANSFERIR DINERO\n"
           "3. MOSTRAR BALANCE DE MONEDA\n"
           "4. MOSTRAR BALANCE GENERAL\n"
           "5. MOSTRAR HISTORIAL DE TRANSACCIONES\n"
           "6. SALIR DEL PROGRAMA"))
    seleccion = int(input("SELECCIONA UNA OPCIÓN PARA CONTINUAR"))

    if(seleccion==1):
        moneda = input("    INGRESE LA MONEDA A RECIBIR: ")
        while not esmoneda(moneda):
            moneda = input("    INGRESE LA MONEDA A RECIBIR: ")
        cantidad = float(input("        INGRESE LA CANTIDAD A RECIBIR DE " + moneda+ ":"))
        codigo = int(input("        INGRESE CÓDIGO DEL BENEFICIARIO: "))
        while not validarCodigo(codigo):
            codigo = int(input("        INGRESE CÓDIGO DEL EMISOR: "))
        if(moneda=="BTC"):
            BTC.indicarCantidad(BTC.cantidad + cantidad)
            GuardarRegistro(moneda,"Recibido",codigo, cantidad, BTC.mostrarCantidad())
        elif(moneda=="ETH"):
            ethe.indicarCantidad(ETH.cantidad + cantidad)
            GuardarRegistro(moneda,"Recibido",codigo, cantidad,ETH.mostrarCantidad())
        elif(moneda=="BCC"):
            BCC.indicarCantidad(BCC.cantidad + cantidad)
            GuardarRegistro(moneda,"Recibido",codigo, cantidad,BCC.mostrarCantidad())
        elif(moneda=="LTC"):
            LTC.indicarCantidad(LTC.cantidad + cantidad)
            GuardarRegistro(moneda,"Recibido",codigo, cantidad,LTC.mostrarCantidad())
        print("\n       ¡TRANSACCIÓN EXITOSA!, EL SALDO FUE AÑADIDO CORRECTAMENTE")
        

    elif(seleccion==2):
        moneda = input("    INGRESE LA MONEDA A TRANSFERIR: ")
        while not esmoneda(moneda):
            moneda = input("    INGRESE LA MONEDA A TRANSFERIR: ")
        cantidad = float(input("        INGRESE LA CANTIDAD A TRANSFERIR DE " + moneda+ ":"))
        while not cantidadSuficiente(moneda, cantidad):
            cantidad = float(input("        INGRESE LA CANTIDAD A TRANSFERIR DE " + moneda+ ":"))
        codigo = int(input("        INGRESE CÓDIGO DEL BENEFICIARIO: "))
        while not validarCodigo(codigo):
            codigo = int(input("        INGRESE CÓDIGO DEL BENEFICIARIO: "))
        if(moneda=="BTC"):
            BTC.indicarCantidad(BTC.cantidad - cantidad)
            GuardarRegistro(moneda,"Enviado",codigo, cantidad, BTC.mostrarCantidad())
        elif(moneda=="ETH"):
            ETH.indicarCantidad(ETH.cantidad - cantidad)
            GuardarRegistro(moneda,"Enviado",codigo, cantidad, ETH.mostrarCantidad())
        elif(moneda=="BCC"):
            BCC.indicarCantidad(BCC.cantidad - cantidad)
            GuardarRegistro(moneda,"Enviado",codigo, cantidad, BCC.mostrarCantidad())
        elif(moneda=="LTC"):
            LTC.indicarCantidad(LTC.cantidad - cantidad)
            GuardarRegistro(moneda,"Enviado",codigo, cantidad, LTC.mostrarCantidad())
        print("\n       ¡TRANSACCIÓN EXITOSA!, El saldo fue descontado correctamente de su billetera")
        
    elif(seleccion==3):
        moneda = input("    INGRESE LA MONEDA A CONSULTAR: ")
        while not esmoneda(moneda):
            moneda = input("    INGRESE LA MONEDA A CONSULTAR: ")
        precio = get_price(moneda+"USDT")
        if(moneda=="BTC"):
            print("Moneda: " + moneda + " Cantidad: "+ str(BTC.mostrarCantidad()) +" Saldo disponible: $."+ str(BTC.calcularSaldo(precio)))
        elif(moneda=="ETH"):
             print("Moneda: " + moneda + " Cantidad: "+str(ETH.mostrarCantidad()) +" Saldo disponible: $."+str(ETH.calcularSaldo(precio)))
        elif(moneda=="BCC"):
             print("Moneda: " + moneda + " Cantidad: "+str(BCC.mostrarCantidad()) + " Saldo disponible: $."+str(BCC.calcularSaldo(precio)))
        elif(moneda=="LTC"):
             print("Moneda: " + moneda + " Cantidad: "+ str(LTC.mostrarCantidad()) +" Saldo disponible: $."+str(LTC.calcularSaldo(precio)))

    elif(seleccion==4):
        moneda = ""
        totalUSD = 0
        for moneda in monedas:
            precio = get_price(moneda.mostrarNombre()+"USDT")
            totalUSD += moneda.calcularSaldo(precio)
            print("Moneda: " + moneda.mostrarNombre() + " Cantidad: "+ str(moneda.mostrarCantidad()) +" Saldo disponible: $."+ str(moneda.calcularSaldo(precio)) +"\n")
        print("EL MONTO ACUMULADO TOTAL DE TODAS LAS CRIPTOMONEDAS SON $." + str(totalUSD))

    elif(seleccion==5):
        archivo = open(nombre_archivo,"r")
        texto = archivo.read()
        archivo.close()
        lineas = texto.splitlines()
        print(texto)
    elif(seleccion==6):
        print("\nGRACIAS POR SU PREFERENCIA")
        break
    else:
        print("\nPOR FAVOR, SELECCIONE UNA OPCIÓN VÁLIDA")
