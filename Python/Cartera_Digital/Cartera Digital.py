# importaciones
import random, requests, string, sys
from datetime import datetime

# Declaracion de diccionarios globales
monedasCMC = dict()
monedasBilletera = dict()
transacciones = list()
direccionBilletera = "HELLO"

# menu
def imprimirAyuda():

    print("""Comandos:

Ayuda:          Imprime esta lista de comandos.
Balance:        Balance de una moneda.
General:        Balance General.
Historial:      Imprime lista de transacciones.
Recibir:        Recibir una tranferencia desde otra cuenta.
Transferir:     Transferir a otra cuenta.
Monedas:        Lista de Monedas de CoinMarketCap.com

Salir:      Salir de su Billetera digital
""")


# cabecera de las peticiones del modulo requests al servicio  coinmarketcap.com
def CMC():
    COINMARKET_API_KEY = "2448e9c9-b938-4f0e-85f1-9878a7b41c87"
    headers = {'Accepts': 'application/json', 'X-CMC_PRO_API_KEY': COINMARKET_API_KEY}

    data=requests.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",headers=headers).json()

    for cripto in data["data"]:
        monedasCMC[cripto["symbol"]] = float(cripto["quote"]["USD"]["price"])

#  leer el archivo billetera.txt donde se almacenan valores 
def leer():
    global direccionBilletera
    f = open("billetera.txt", "r")
    while True:
        a = f.readline()
        l = a.split(":")
        if not a:
            break
        if l[0] == "Direccion":
            direccionBilletera = l[1].rstrip()
            print("\n    "+direccionBilletera)
        else:
            monedasBilletera[l[0]] = float(l[1])
    f.close()

    f2 = open("transacciones.txt", "r")
    count = 0
    while True:
        a = f2.readline()
        if not a:
            break
        if count == 0:
            pass
        else:
            transacciones.append(a)
        count += 1
    f2.close()

#  alojar datos en el archivo que se leyo 
def escribir():
    f = open("billetera.txt", "w")
    f.write("Direccion:"+direccionBilletera.rstrip())
    for key, value in monedasBilletera.items():
        f.write("\n"+key+":"+str(value))
    f.close()

#  salir del programa
def salir():
    escribir()
    print("\n\tAdios\n")
    sys.exit()

#  opcion 1 del menú  recibir una criptomoneda 
def recibir(cuenta, moneda, cantidad):
   
    now = datetime.now()
    fechaHora = now.strftime("%d/%m/%Y %H:%M:%S")
    linea = "IN\t"+fechaHora+" "+cuenta+"\t\t "+moneda+" "+str(cantidad)
    f = open("transacciones.txt", "a")
    f.write("\n"+linea)
    f.close()
    transacciones.append(linea)


    if moneda in monedasBilletera.keys():
        monedasBilletera[moneda] = monedasBilletera[moneda] + cantidad 
    
    else:
        monedasBilletera[moneda] = cantidad
    
    
    print("\tTransferencia Exitosa")
    print(linea+"\n")

#  opcion 2 del menú  transferir una moneda
def transferir(cuenta, moneda, cantidad):
    
    
    if not moneda in monedasBilletera.keys():
        print(f"**** No tienes { moneda } en tu billetera ****\n")
        return
    
    
    if monedasBilletera[moneda] < cantidad:
        print("**** No tienes suficiente saldo ****\n")
        return

    
    now = datetime.now()
    fechaHora = now.strftime("%d/%m/%Y %H:%M:%S")
    linea = "OUT\t"+fechaHora+" "+cuenta+"\t\t "+moneda+" "+str(cantidad)
    f = open("transacciones.txt", "a")
    f.write("\n"+linea)
    f.close()
    transacciones.append(linea)

 
    monedasBilletera[moneda] = monedasBilletera[moneda] - cantidad
    
    
    print("\tTransferencia Exitosa")
    print(linea+"\n")

#  opcion 3 del menú  mostar el balance de una moneda
def balance(moneda):
    print()
    if not moneda in monedasBilletera.keys():
        print(f"**** No tienes { moneda } en tu billetera ****\n")
        return
    montoUSD = monedasCMC[moneda]*monedasBilletera[moneda]
    montoRedondeado = "{:.2f}".format(montoUSD)
    print(moneda+": " + str(monedasBilletera[moneda]) + "  =  USD$ " + montoRedondeado)
    print()
    
#  opciona 4 del menú  mostrar el balance general
def general():
    print()
    totalUSD = 0
    for key, value in monedasBilletera.items():
        montoUSD = monedasCMC[key]*monedasBilletera[key]
        montoRedondeado = "{:.2f}".format(montoUSD)
        print(key+":\t " + str(monedasBilletera[key]) + "  =  USD$ " + montoRedondeado)
        totalUSD += montoUSD
    print()
    totalRedondeado = "{:.2f}".format(totalUSD)
    print("Total USD$ : " + totalRedondeado)
    print()

#  leer el archivo de trsnacciones y mostrar las transacciones
def historial():
    print()
    for text in transacciones:
        print(text.rstrip("\n"))
    print()

# validacion de moneda 
def esmoneda(cripto):
    return cripto.upper() in monedasCMC

#  valdiacion de monedas en el diccionario 
def listaMonedas():
    for key, value in monedasCMC.items():        
        print(key + "\tPrecio USD: $"+"{:.2f}".format(value))
    print()


def isfloat(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

try: 
    f = open("billetera.txt")
    f.close()
    print("\n\t\t¡Bienvenido a tu Billetera digital!")
    
   
except: 
    print("    Es primera ves que corres este programa")
    print("\n\t\t¡Bienvenido a tu Billetera digital!\n")
    m = True
    while m:
        a = input("Desea crear una nueva Billetera? S/N: ").strip()
        if a.lower() == "s" or a.lower() == "si":
            f = open("billetera.txt","w+")
            f2 = open("transacciones.txt","w+")
            letters = string.ascii_letters + string.digits
            nuevoCodigo = ''.join(random.choice(letters) for i in range(50))
            f.write("Direccion:"+nuevoCodigo)
            f2.write("Direccion:"+nuevoCodigo)
            f.close()
            f2.close()
            m = False

        elif a.lower() == "n" or a.lower() == "no":
            print("\n\tAdios\n")
            sys.exit()
        
#  ejecucion de funciones declaradas 
CMC() 
leer() 
print()
imprimirAyuda() 

#  condicion de ejecucion
while True:
    command = input("Ingrese comando: ").strip()
    if command.lower() == "salir":
        salir()
    
    elif command.lower() == "ayuda":
        print()
        imprimirAyuda()
    
    elif command.lower() == "recibir":
        print()
        
        direccion = input("Ingrese direccion de la billetera: ").strip()
        

        while direccion == direccionBilletera.strip() or direccion == "":
            print("\n**** Direccion invalida o vacia: ingrese una direccion distinta a la suya ****\n")
            direccion = input("Ingrese direccion de la billetera: ").strip()

        nombre = input("Ingrese nombre de 3 letras de la moneda: ").strip()
        
        while not esmoneda(nombre):
            print("\n**** Moneda Invalida ****\n")
            nombre = input("Ingrese nombre de 3 letras de la moneda: ").strip()
        
        cantidad = input("Ingrese el monto de la transferencia: ").strip()
        
        while "," in cantidad or not isfloat(cantidad) or float(cantidad) <0:
            print("\n**** Use  '.' para dar valores decimales ****")
            print("**** Ingresar solamente numeros, no texto ****")
            print("**** Ingresar solamente numeros positivos ****\n")
            cantidad = input("Ingrese el monto de la transferencia: ").strip()
        cantidad = float(cantidad)
        print()
    
        recibir(direccion, nombre.upper(), cantidad)
        
    elif command.lower() == "transferir":
        print()
        direccion = input("Ingrese direccion de la billetera: ").strip()
        
        while direccion == direccionBilletera.rstrip() or direccion == "":
            print("\n**** Direccion invalida o vacia: ingrese una direccion distinta a la suya ****\n")
            direccion = input("Ingrese direccion de la billetera: ").strip()

        nombre = input("Ingrese nombre de 3 letras de la moneda: ").strip()
       
        while not esmoneda(nombre):
            print("\n**** Moneda Invalida ****\n")
            nombre = input("Ingrese nombre de 3 letras de la moneda: ").strip()
        
        cantidad = input("Ingrese el monto de la transferencia: ").strip()
        
        while "," in cantidad or not isfloat(cantidad) or float(cantidad) <0:
            print("\n**** Use '.' para dar valores decimales ****")
            print("**** Ingresar solamente numeros, no texto ****")
            print("**** Ingresar solamente numeros positivos ****\n")
            cantidad = input("Ingrese el monto de la transferencia: ").strip()
        cantidad = float(cantidad)
        print()
        
        transferir(direccion, nombre.upper() , cantidad)
    
    elif command.lower() == "balance":
        
        print()
        nombre = input("Ingrese nombre de 3 letras de la moneda: ").strip()
        
        while not esmoneda(nombre):
            print("\n**** Moneda Invalida ****\n")
            nombre = input("Ingrese nombre de 3 letras de la moneda: ").strip()
        balance(nombre.upper())
    
    elif command.lower() == "general":
        general()
    
    elif command.lower() == "historial":
        historial()

    elif command.lower() == "monedas":
        print()
        listaMonedas()
    
    else:
        print("\n**** Comando Invalido ****\n")