import requests #esto hace que el programa use el modulo requests que se usa para consulta APIS, para usar este import tuviste que instalarlo con pip install requests en la terminal de windows

def esmoneda(cripto):#funcion que verifica que la moneda ingresada este dentro de la tupla llamada monedas
    return cripto in monedas

def nombre(cripto): #funcion que recibe el simbolo y retorna el nombre
    monedas_dict={}
    for coin in data["data"]:
        monedas_dict[coin["symbol"]]=coin["name"]
    return monedas_dict.get(cripto) #devuelve el nombre

#inicializamos elemento
monedas=()
diccionario={}

COINMARKET_API_KEY = "2448e9c9-b938-4f0e-85f1-9878a7b41c87" # Esta es la llave de la API que nos permite hacer peticiones a la direccion URL de la API
headers = { #esto son los parametros que necesitamos pasar en la peticion para que la API nos pueda devolver la informacion
  'Accepts': 'application/json', # esto indica que el formato de la respuesta de la API sera JSON, que es un formato legible para Python, asi podra usar la informacion
  'X-CMC_PRO_API_KEY': COINMARKET_API_KEY #aqui asignamos que usaremos la clave de la API que definimos arriba
}

data=requests.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",headers=headers).json() #aqui almacenamos  en data el resultado de la peticion a la direccion de la API usando requests.get y pasamos los parametros que definimos arriba
print(data)
for cripto in data["data"]:# aqui creamos un for para recorrer todos los datos o cripto como se especifica en el for que estan en "data" que es el valor dentro de la variable data que tiene todas las criptomonedas de la API
    diccionario[cripto["symbol"]]=cripto["quote"]["USD"]["price"] #cada que recorremos la data almacenamos en el diccionario los datos de symbolo que es la abreviacion por ejemplo BTC junto con el precio de la moneda que consulta con quote.USD.price en el json
monedas = diccionario.keys() #almecenamos en monedas los simbolos del diccionario con el metodo keys()
 #imprimimos la variable monedas para verificar que elementos quedaron guardados ahi
moneda=input("Indique el nombre de la moneda a verificar: ") #ingresamos la moneda a verificar
while not esmoneda(moneda): #validamos que la moneda cumpla la validacion de la funcion esmoneda en que caso de que no sea moneda seguira pidiendo el dato hasta que lo sea
        print("Moneda Invalida.")
        moneda=input("Ingrese el nombre de la moneda: ")
else:
    print("La moneda de nombre ",nombre(moneda)," con symbol:",moneda," tiene un valor en Dolares de :",diccionario.get(moneda),
          "es valida porque existe en coimnmarketcap.com") #ya cuando sea moneda correcta imprimira el mensaje de que es valida por que se encontro en coinmarketcap y que tiene un valor en dolares de tanto
