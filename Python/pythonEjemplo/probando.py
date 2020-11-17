#A continuacion importo los modulos de consulta a sitios web y fecha que seran utilizados en este programa
import requests
_ENDPOINT="https://api.coinmarket.com"

from datetime import date
d=date.today()
d=d.strftime(" %A %d/%B/%Y")

solicit_cantidad=float()

class Criptomoneda(object):
    def __init__(self,solicit_id,solicit_moneda,solicit_cantidad,saldo_cripto,tipo_operacion):
        self.solicit_id = solicit_id
        self.solicit_moneda = solicit_moneda
        self.solicit_cantidad = solicit_cantidad
        self.saldo_cripto = saldo_cripto
        self.tipo_operacion = tipo_operacion
    
    def ingresar_codigo(self,solicit_id):
        self.solicit_id=solicit_id

    def ingresar_moneda(self,solicit_moneda):
        self.solicit_moneda=solicit_moneda
    
    def ingresar_cantidad(self,solicit_cantidad):
        self.solicit_cantidad=solicit_cantidad

    def ingresar_saldo(self,saldo_cripto):
        self.saldo_cripto=saldo_cripto
    
    def menu_opera(self,tipo_operacion):
        self.tipo_operacion=tipo_operacion

    def mostrar_codigo(self):
        return self.solicit_id

    def mostrar_moneda(self):
        return self.solicit_moneda

    def mostrar_cantidad(self):
        return self.solicit_cantidad

    def mostrar_saldo(self):
        return self.saldo_cripto
    
    def mostrar_opera(self):
        return self.tipo_operacion
    
    def actualizar_saldo(self,tipo_operacion):
        if tipo_operacion== "Recepcion de criptomoneda":
            return self.saldo_cripto+self.solicit_cantidad
        else:
            return self.saldo_cripto-self.solicit_cantidad

#A continuacion defino variables de la funcion que se utilizan para ejecutar el programa
monedas=()
moneda_dict={}
solicit_id=()
solicit_moneda=()
solicit_recepci=()
saldo_cripto=float()
respuesta_confirm=()
menu_cont=('Si','No')
menu_opciones=("1.Recibir cantidad \n",'2.Transferir monto','3.Mostrar balance de una moneda', '4.Mostrar balance general','5.Mostrar historico de transacciones','6.Salir')
menu_seleccion=("1","2","3","4","5","6")
monedas = moneda_dict.keys()
tipo_operacion=("Recepcion de criptomoneda","Envio de criptomoneda")

#En esta seccion, estoy estableciendo funciones para consultar en coinmarketcap.com la existencia de monedas mediante una API consultadas por el usuario
def esmoneda(cripto):
    return cripto in monedas

headers = { 'Accepts': 'aplication.json','X-CMC_PRO_API_KEY': '83264d3c-4e71-4743-81c6-18e401113c3d'}

def _URL(api):
    return _ENDPOINT+api

def confirm(cripto):
    parametros = {'symbol':symbol}
    return requests.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",headers=headers,params=parametros)

#Recordemos que para poder presentar historicos, debemos de crear archivos de texto para almacenar informacion y luego presentar estos
nombre_registro = "RegistrosCripto.txt"
archivo=open(nombre_registro,'a')

#Esta es la API que estamos utilizando para validar la existencia de la moneda en coinmarketcap.com

data=requests.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",headers=headers,).json()
for cripto in data["data"]:
    moneda_dict[cripto["symbol"]]=cripto["name"]

#A continuacion defino la funcion a emplear para la ejecucion del programa
def menu(menu_seleccion,solicit_id,solicit_moneda,solicit_cantidad,solicit_recepci, saldo_cripto,respuesta_confirm,menu_cont,moneda_dict,monedas,tipo_operacion):
    print("Bienvenido al programa de Gestion de Criptomonedas, por favor selecciona una opcion de las que se listan a continuacion: ")
    print (menu_opciones)

    menu_seleccion=input("Seleccione la opcion que desea ejecutar: ")

    if menu_seleccion==("1"):
        tipo_operacion=("Recepcion de criptomoneda")
        solicit_id=input("Ingrese su codigo personal: ")
        solicit_moneda=input("Ingrese el simbolo de la criptomoneda que desea recibir: ")
        solicit_cantidad=(input("Introduzca la cantidad que desea recibir: "))
        solicit_recepci=input("Especifique el codigo de procedencia de su envio: ")
        respuesta_confirm=input("Por favor confirmar "+tipo_operacion+ " de "+str(solicit_cantidad)+" de "+solicit_moneda+ " del codigo "+solicit_recepci+" con fecha " +str(d)+ "?  Por favor responder con ´Si' o 'No'. ")
        if respuesta_confirm==("Si"):
            saldo_cripto=Criptomoneda(solicit_id,solicit_moneda,solicit_cantidad,saldo_cripto,tipo_operacion)
            saldo_cripto.actualizar_saldo(tipo_operacion)
            print("Se confirma la transaccion adonde recibio la cantidad de "+str(solicit_cantidad) +" abonada a su codigo "+solicit_id+" para un saldo de "+str(saldo_cripto.actualizar_saldo())+" efectuado en "+str(d)+ ".")
        archivo=open("nombre_registro.txt","a")
        archivo.write("\n"+tipo_operacion+","+solicit_id+","+solicit_moneda+","+str(solicit_cantidad)+","+str(saldo_cripto)+str(d))
        archivo.close()
        menu_cont=input("Desea realizar otra operacion?  Contestar 'Si' o 'No'.")
        if menu_cont==("Si"):
            menu(menu_seleccion,solicit_id,solicit_moneda,solicit_cantidad,solicit_recepci, saldo_cripto,respuesta_confirm,menu_cont,moneda_dict,monedas,tipo_operacion)
        else:
            print("Gracias por usar el programa de Gestion de Criptomonedas, su sesion ha sido finalizada.")
            SystemExit
    elif menu_seleccion==("2"):
        tipo_operacion=("Envio de criptomoneda")
        solicit_id=input("Ingrese el codigo personal del destinatario: ")
        solicit_moneda=input("Ingrese el simbolo de la criptomoneda que desea enviar: ")
        solicit_cantidad=(input("Introduzca la cantidad que desea enviar: "))
        respuesta_confirm=input("Esta seguro que desea enviar "+solicit_cantidad+ " de "+solicit_moneda+ " al codigo "+solicit_id+" con fecha "+str(d)+"?  Por favor responder con 'Si' o 'No'. ")
        if respuesta_confirm==("Si"):
            saldo_cripto=Criptomoneda(solicit_id,solicit_moneda,solicit_cantidad,saldo_cripto,tipo_operacion)
            saldo_cripto.actualizar_saldo(tipo_operacion)
            print("Se confirma la transaccion de envio a "+solicit_id+ ", su nuevo saldo es de "+str(saldo_cripto.actualizar_saldo()) +" efectuado en "+str(d)+".")
        archivo=open("nombre_registro.txt","a")
        archivo.write("\n"+tipo_operacion+","+solicit_id+","+solicit_moneda+","+str(solicit_cantidad)+","+str(saldo_cripto)+str(d))
        archivo.close()
        menu_cont=input("Desea realizar otra operacion?  Contestar 'Si' o 'No'.")
        if menu_cont==("Si"):
            menu(menu_seleccion,solicit_id,solicit_moneda,solicit_cantidad,solicit_recepci, saldo_cripto,respuesta_confirm,menu_cont,moneda_dict,monedas,tipo_operacion)
        else:
            print("Gracias por usar el programa de Gestion de Criptomonedas, su sesion ha sido finalizada.")
            SystemExit
    elif menu_seleccion==("3"):
        solicit_moneda=input("Digite el simbolo de la moneda a consultar: ")
        while not esmoneda(solicit_moneda):
            print("Moneda invalida. ")
            solicit_moneda=input("Ingrese una moneda valida: ")
        else:
            print("La moneda con simbolo "+solicit_moneda+ " y nombre "+moneda_dict.get(solicit_moneda)+" existe segun lo confirma el sitio de coinmarket.com ")
            menu_cont=input("Desea realizar otra operacion?  Contestar 'Si' o 'No' .")
        if menu_cont==("Si"):
            menu(menu_seleccion,solicit_id,solicit_moneda,solicit_cantidad,solicit_recepci, saldo_cripto,respuesta_confirm,menu_cont,moneda_dict,monedas,tipo_operacion)
        else:
            print("Gracias por usar el programa de Gestion de Criptomonedas, su sesion ha sido finalizada.")
            SystemExit
    elif menu_seleccion==("5"):
        print("El registro de transacciones presentado por renglon es el siguiente:")
        archivo=open("nombre_registro.txt","r")
        read=archivo.read()
        myline=read.splitlines()
        print(myline)
        archivo.close()
        menu_cont=input("Desea realizar otra operacion?  Contestar 'Si' o 'No' .")
        if menu_cont==("Si"):
            menu(menu_seleccion,solicit_id,solicit_moneda,solicit_cantidad,solicit_recepci, saldo_cripto,respuesta_confirm,menu_cont,moneda_dict,monedas,tipo_operacion)
        else:
            print("Gracias por usar el programa de Gestion de Criptomonedas, su sesion ha sido finalizada.")
            SystemExit
    elif menu_seleccion==("6"):
        print("Gracias por utilizar el programa de gestion de Criptomonedas, su sesion ha sido finalizada.")
        SystemExit
    else:
        print("Para continuar, debe ingresar una de las opciones listadas al inicio del programa. ")
        menu(menu_seleccion,solicit_id,solicit_moneda,solicit_cantidad,solicit_recepci, saldo_cripto,respuesta_confirm,menu_cont,moneda_dict,monedas,tipo_operacion)

#A partir de aca, comienza la ejecucion del programa siguiendo todas las instrucciones definidas en los diferentes elementos
menu(menu_seleccion,solicit_id,solicit_moneda,solicit_cantidad,solicit_recepci, saldo_cripto,respuesta_confirm,menu_cont,moneda_dict,monedas,tipo_operacion)