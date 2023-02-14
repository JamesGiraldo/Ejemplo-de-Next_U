#Importaciones necesarias
import requests
from datetime import date

#Probar si la entrada del menú es correcta
def esopcion (menu):
  return esnumeroentero(menu) and 7>int(menu)>0
#Prueba si la moneda está dentro de coinmarketcap.com      
def esmoneda(cripto):
    return cripto in monedas
#Verifica si una entrada es un número natural
def esnumero(numero): 
    return numero.replace('.','',1).isdigit()
#Verifica si una entrada es un número entero 
def esnumeroentero(numero): 
    return numero.isdigit()
#Verifica si el codigo del remitente o destinatario de las transacciones es correcto
def escodigo(numero): 
    return esnumeroentero(numero) and int(numero)!=codigo_propio
#Verifica si la moneda relacionada a la accion está en el balance de la cuenta
def monedaEnBalance(moneda):
  return moneda in monedas_balance
#Funcion para validar la moneda ingresada por el usuario
def PreguntarMoneda(tipoTransaccion):
  moneda=input('Indique el nombre de la moneda a '+ tipoTransaccion+':' )
  while not esmoneda(moneda):
      print('')
      print('Moneda Invalida.')
      print('')
      moneda=input('Indique el nombre de la moneda a '+ tipoTransaccion+':' )
  return moneda
#Función para validar la cantidad de la moneda ingresada por el usuario
def PreguntarCantidad(moneda):
  cantidad = input('Indique la cantidad de '+moneda+':')
  while not esnumero(cantidad):
    print('')
    print('Cantidad Invalida.')
    print('')
    cantidad = input("Indique la cantidad de "+moneda+":")
  return cantidad
#Función para validar el código del emisor o receptor de la transacción ingresada por el usuario
def PedirCodigo(tipo_receptor):
  codigo = input('Indique código del '+ tipo_receptor+ ' (Este es un valor numérico entero):')
  while not escodigo(codigo):
    print('')
    print('Código Invalido.')
    print('')
    codigo = input('Indique código del '+ tipo_receptor+ ' valido:')
  return codigo
#Función para registrar las transacciones de la cuenta
def RegistrarTransaccion(moneda,tipo,codigo,cantidad,monto):
    today=date.today()
    transaccion=[]
    transaccion.append(str(today))
    transaccion.append(moneda)
    transaccion.append(tipo)
    transaccion.append(codigo)
    transaccion.append(cantidad)
    transaccion.append(monto)
    transacciones.append(transaccion)
    
#Función para recibir una transacción   
def RecibirTransaccion():
  print('')
  moneda=PreguntarMoneda('recibir')  
  cantidad = PreguntarCantidad(moneda)
  codigo = PedirCodigo('remitente')
  
  if monedaEnBalance(moneda):
    monedas_balance_dic[moneda]=monedas_balance_dic[moneda]+ float(cantidad)
    RegistrarTransaccion(moneda,'Recepción',codigo,cantidad,monedas_dic[moneda])
    print('')
    print('Se agregaron a la cuenta ',cantidad,'', moneda)
    print('')
   
  else:
    monedas_balance_dic[moneda]=float(cantidad)
    RegistrarTransaccion(moneda,'Recepción',codigo,cantidad,monedas_dic[moneda])
    print('')
    print('Se agregaron a la cuenta ',cantidad,'', moneda)
    print('')
    
#Función para realizar una transacción de envío
def TransferirMonto():
  print('')
  moneda=PreguntarMoneda('transferir')
  if not monedaEnBalance(moneda):
    print('')
    print('No tiene saldo de', moneda)
    print('')
  else:
    cantidad= PreguntarCantidad(moneda)
    if float(cantidad)>monedas_balance_dic[moneda]:
      print('')
      print('No tiene el saldo suficiente para hacer esta transacción!')
      print('')

    else:
      codigo = PedirCodigo('destinatario')
      print('')
      print('Se debitaron de la cuenta ',cantidad,'', moneda)
      print('')
      monedas_balance_dic[moneda]=monedas_balance_dic[moneda]-float(cantidad)
      if monedas_balance_dic[moneda]==0:
        del monedas_balance_dic[moneda]       
      RegistrarTransaccion(moneda,'Envío    ',codigo,cantidad,monedas_dic[moneda])
      
#Función para mostrar el balance de una moneda especificada por el usuario
def MostrarBalanceMoneda():
  print('')
  moneda = moneda=PreguntarMoneda('consultar')
  print('')
  print('Balance de ',moneda )
  print('')
  
  if monedaEnBalance(moneda):
    equivalencia=monedas_dic[moneda]*monedas_balance_dic[moneda]
    print('Tiene ',monedas_balance_dic[moneda],'' , moneda, ' que equivalen a %6.3f'%equivalencia+' USD')
    print('')
  else:
    print('No posee esta moneda en su portafolio!')
    print('')
    
#Función para mostrar el balance general de la cuenta
def MostrarBalanceGeneral():
  print('')
  print('Balance general')
  print('')
  print('Nombre     Cantidad   Valor en USD     Total Moneda en USD')
  total_USD=0
  for moneda in monedas_balance_dic:
    USDequivalente=monedas_dic[moneda] * monedas_balance_dic[moneda]
    print (moneda, '       %8.3f'%monedas_balance_dic[moneda], '   %10.3f'%monedas_dic[moneda]+ '     %15.3f'%USDequivalente   )
    total_USD+=USDequivalente
  print('')
  print('USD Totales: $%15.3f'%total_USD+' USD')
  print('')
    
#Función para mostrar el historial de transacciones de la cuenta
def MostrarTransacciones():
  print('')
  print('Historial de Transacciones')
  print('')
  print('Fecha        Moneda   Tipo de Operación  Código usuario       Cantidad        USD al momento')
  for registro in transacciones:
    print (registro[0], '   ',registro[1], '       ',registro[2], '        ',registro[3] , '               %8.3f'%float(registro[4])+ '   %15.3f '%float(registro[5])  )

  print('')
  
#Asignación del codigo del usuario
codigo_propio=132

#Creación de variables a utilizar
monedas=()
monedas_dic={}
monedas_balance=()
monedas_balance_dic={}
transacciones=[]


#Query of criptos to coinmarketcap.com

def TraerDatos():
  
    COINMARKET_API_KEY = "2448e9c9-b938-4f0e-85f1-9878a7b41c87"
    headers = {
      'Accepts': 'application/json',
      'X-CMC_PRO_API_KEY': COINMARKET_API_KEY
    }
    data=requests.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",headers=headers).json()
    for id in data["data"]:
        monedas_dic[id["symbol"]]=id["quote"]["USD"]["price"]
    
  

while 1:
  
  TraerDatos()
  monedas=monedas_dic.keys()
  print("Menú de Billetera digital: ");
  print("   1. Recibir cantidad");
  print("   2. Transferir monto");
  print("   3. Mostrar balance una moneda");
  print("   4. Mostrar balance general");
  print("   5. Mostrar histórico de transacciones");
  print("   6. Salir del programa");
  monedas_balance=monedas_balance_dic.keys()
  
  menu=input("Ingrese el número de la acción que desea realizar:");
  while not esopcion(menu):
    menu=input("Acción NO VALIDA!. Ingrese el número de la acción que desea realizar:");
  #Selección de función de acuerdo a la entrada del usuario
  if menu=="1":
    RecibirTransaccion() 

  if menu=="2":
    TransferirMonto()

  if menu=="3":
    MostrarBalanceMoneda()

  if menu=="4":
    MostrarBalanceGeneral()

  if menu=="5":
    MostrarTransacciones()

  if menu=="6":
    print('')
    print('Se cerró la apricación, ¡Hasta Pronto!')
    break



