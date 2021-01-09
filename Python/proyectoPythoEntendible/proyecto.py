import requests #Intalar la libreria request e importarla para hacer peticiones a una pagina web
from datetime import datetime #Importar la libreria datatime para tomar la hora y fecha
import json #Importar la libreria json para poder guardar y leer este tipo de archivos

#Cabecera de peticion en el metodo get la cual contiene el tipo de archivo a recibir y el token de la api
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': '7a158dc2-bc56-4cf4-958c-68a12572b921',
}

valid_alpha_user = "1234567890" #Variable usada para la validacion de los codigos en el menu 1 y 2 que sea solo numerico
monedas=() #Variable usada para verificar los nombres de simbolos
monedasNombre_dict={} #Diccionario para guardar los simbolos y nombres de las monedas
monedasPrecio_dict={} #Diccionario para guardar los simbolos y precios de las monedas
saldo_dict={} #Diccionario para guardar los simbolos y saldos de el usuario
now = datetime.now() #Variable que toma la fecha y hora actuales
format = now.strftime('%d/%m/%Y  %H:%M:%S') #Variable que toma la fecha y hora actuales con un formato establecido
#Se guarda en el diccionario saldo_dict el archivo json por medio de un ciclo while para poder ser modificado
with open("saldo.json") as f:
    saldo_dict = json.load(f)

data=requests.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",headers=headers).json() #Variable que recibe la peticion realizada a la pagina web
#Este for es usado para tomar los datos obtenidos en la variable data y asi llenar los diccionarios  monedasNombre_dict y monedasPrecio_dict
for cripto in data["data"]:
    monedasNombre_dict[cripto["symbol"]]=cripto["name"]    
    monedasPrecio_dict[cripto["symbol"]]=cripto["quote"] ["USD"]["price"]

monedas = monedasNombre_dict.keys() #Asignar a variable monedas los simbolos disponibles

#funcion para verificar si es una de las monedas habilitadas
def esmoneda(cripto):
    return cripto in monedas

salir = False #Variable usada para mantener el menu activo
opcion = 0 #Variable usada para recorrer el menu
#Este ciclo while permite mantener el menu mientras no se use la opcion de salir
while not salir:
 
    print("Tu código es: 3548974521") #codigo del usuario
    print ("1. Recibir cantidad") #Imprime en pantalla
    print ("2. Transferir monto") #Imprime en pantalla
    print ("3. Mostrar balance una moneda") #Imprime en pantalla
    print ("4. Mostrar balance general") #Imprime en pantalla
    print ("5. Mostrar histórico de transacciones") #Imprime en pantalla
    print ("6. Salir del programa") #Imprime en pantalla
     
    opcion=input("Elige una opción: ") #Lee la opcion que elige el usuario
 
    if opcion == "1": #Opcion para recibir dinero
        moneda=input("Ingrese el código de la moneda: ") #Lee la moneda que elige el usuario
        cantidad=input("Ingrese la cantidad a recibir en dolares: ") #Lee la cantidad que elige el usuario
        codigo=input("Ingrese el código de 10 dígitos de la persona a enviar: ") #Lee el codigo que elige el usuario
        if codigo != "3548974521": #Verifica si el codigo ingresado no es el del usuario
            if(len(codigo) == 10): #Verifica que el codigo ingresado sea igual a 10 caracteres
                a=set(valid_alpha_user) #Variable a toma el valor de valid_alpha_user
                b=set(codigo) #Variable b toma el valor de codigo
                if(len(b-a)>0): #Verifica si el codigo tiene solo numeros o tiene otro caracter
                    print("Código invalido.") #Imprime en pantalla
                else: #Indica que el codigo es valido
                    if esmoneda(moneda):  #Verifica si la moneda existe en el diccionario 
                        archivo = open('balance.txt', 'r') #Abre el archivo balance.txt
                        contenido = archivo.read()   #Lee el archivo balance.txt y asigna el valor a la variavle contenido
                        if contenido=='': #Verifica si el archivo esta vacio
                            archivo.close()  #Cierra el archivo balance.txt
                            archivo = open ('balance.txt','w') #Abre el archivo balance.txt
                            archivo.write('Fecha y hora: '+str(format)+' Moneda: '+str(moneda)+' codigo recibido: '+str(codigo)+' valor: $'+str(cantidad))  #Registra en el archivo la transaccion
                            archivo.close() #Cierra el archivo balance.txt            
                            saldo_dict[moneda]+=float(cantidad) #Guarda el valor en el diccionario segun el simbolo 
                            print("Dinero recibido correctamente")    #Imprime en pantalla
                        if not contenido=='': #Verifica si el archivo no esta vacio
                            archivo.close() #Cierra el archivo balance.txt
                            archivo = open('balance.txt','a') #Abre el archivo balance.txt
                            archivo.write('\nFecha y hora: '+str(format)+' Moneda: '+str(moneda)+' codigo recibido: '+str(codigo)+' valor: $'+str(cantidad))  #Registra en el archivo la transaccion
                            archivo.close() #Cierra el archivo balance.txt
                            saldo_dict[moneda]+=float(cantidad) #Guarda el valor en el diccionario segun el simbolo 
                            print("Dinero recibido correctamente")     #Imprime en pantalla           
                    if not esmoneda(moneda):    #Verifica si la moneda existe en el diccionario
                        print("Moneda invalida")      #Imprime en pantalla
            else:
                print("Código invalido.") #Imprime en pantalla
        else:
            print("No se puede enviar dinero a si mismo") #Imprime en pantalla
    elif opcion == "2": #Opcion para transferir dinero
        moneda=input("Ingrese el código de la moneda: ") #Lee la moneda que elige el usuario
        cantidad=input("Ingrese la cantidad a enviar en dolares: ") #Lee la cantidad que elige el usuario
        codigo=input("Ingrese el código de 10 dígitos de la persona a enviar: ") #Lee el codigo que elige el usuario
        if codigo != "3548974521": #Verifica si el codigo ingresado no es el del usuario
            if(len(codigo) == 10): #Verifica que el codigo ingresado sea igual a 10 caracteres
                a=set(valid_alpha_user) #Variable a toma el valor de valid_alpha_user
                b=set(codigo) #Variable b toma el valor de codigo
                if(len(b-a)>0): #Verifica si el codigo tiene solo numeros o tiene otro caracter
                    print("Código invalido.") #Imprime en pantalla
                else: #Indica que el codigo es valido
                    if esmoneda(moneda):  #Verifica si la moneda existe en el diccionario        
                        if saldo_dict[moneda] >= float(cantidad):
                            archivo = open('balance.txt', 'r') #Abre el archivo balance.txt
                            contenido = archivo.read()    #Lee el archivo balance.txt y asigna el valor a la variavle contenido
                            if contenido=='': #Verifica si el archivo esta vacio
                                archivo.close() #Cierra el archivo balance.txt
                                print("Aun no tiene dinero para transferencias")      #Imprime en pantalla       
                            if not contenido=='': #Verifica si el archivo no esta vacio
                                archivo.close() #Cierra el archivo balance.txt
                                archivo = open('balance.txt','a') #Abre el archivo balance.txt
                                archivo.write('\nFecha y hora: '+str(format)+' Moneda: '+str(moneda)+' codigo transferencia: '+str(codigo)+' valor: $-'+str(cantidad))  #Registra en el archivo la transaccion
                                archivo.close() #Cierra el archivo balance.txt
                                saldo_dict[moneda]-=float(cantidad) #Guarda el valor en el diccionario segun el simbolo 
                                print("Transferencia enviada correctamente")   #Imprime en pantalla 
                        else:
                            print("No tiene el saldo suficiente, verifique el saldo en la opcion 4") #Imprime en pantalla
                    if not esmoneda(moneda):    #Verifica si la moneda existe en el diccionario
                        print("Moneda invalida")     #Imprime en pantalla
            else:
                print("Código invalido.")   #Imprime en pantalla
        else:
            print("No se puede transferir dinero a si mismo") #Imprime en pantalla
    elif opcion == "3": #Opcion para ver precio de monedas
        moneda=input("Ingrese el código de la moneda a verificar: ") #Lee la moneda que elige el usuario
        if esmoneda(moneda): #Verifica si la moneda existe en el diccionario y de estarlo imprime el valor
            print("La moneda con symbol:",moneda,"y nombre:",monedasNombre_dict.get(moneda)) #Imprime en pantalla
            print("valor de la moneda en dolares: $",monedasPrecio_dict.get(moneda)) #Imprime en pantalla
        else:            
            print("Moneda invalida") #Imprime en pantalla
    elif opcion == "4": #Opcion para ver el saldo que se tiene en cada moneda
        print("Saldo con el que se cuenta actualmente en dolares:") #Imprime en pantalla
        for key in saldo_dict: #Imprime en pantalla los diferentes valores del diccionario saldo_dict el cual contiene el saldo actual con el que cuanta el cliente para cada moneda
            print (key, ": $", saldo_dict[key]) 
    elif opcion == "5": #Opcion para ver el historial de transacciones
        archivo = open('balance.txt', 'r') #Abre el archivo balance.txt
        contenido = archivo.read()  #Lee el archivo balance.txt y guarda los datos en la variable contenido
        print(contenido) #Imprime en pantalla el contenido guardado en el archivo balance.txt el cual contiene los movimientos realizados por el usuario
        archivo.close() #Cierra el archivo balance.txt
    elif opcion == "6": #Opcion para salir
        salir = True #Permite la salida del ciclo while
    else:
        print ("Introduce un numero entre 1 y 5, o 6 para salir.")  #Imprime en pantalla
    
    with open("saldo.json", "w") as f: #El ciclo while permite guardar en el archivo saldo.json el diccionario saldo_dict para no perder la informacion y usarla nuevamente al abrir el aplicativo
        json.dump(saldo_dict, f)

print("Datos guardados correctamente")  #Imprime en pantalla
print ("Fin") #Imprime en pantalla