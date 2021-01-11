import requests
_ENDPOINT = "https://api.binance.com"

def _url(api):
    return _ENDPOINT + api

def get_price(cripto):
    return requests.get(_url("/api/v3/ticker/price?symbol="+cripto))

def esmoneda(cripto):
    criptos = ["BTC","BCC","LTC","ETH","ETC","XRP"]
    return cripto in criptos

def esnumero(numero):
    return numero.replace('.','',1).isdigit()

monedas = []
cantidades = []
cotizaciones = []
i = 0

while i < 3:
    moneda = input("Ingrese el nombre de la moneda: ")
    while not esmoneda(moneda):
        print("Moneda Invalida.")
        moneda = input("Ingrese el nombre de la moneda: ")
    else:
        monedas.append(moneda)
        data = get_price(moneda + "USDT").json()
        cotizaciones.append(float(data["price"]))
        cantidad = input("Indique la cantidad de " + moneda + ": ")
        while not esnumero(cantidad):
            cantidad = input("Indique la cantidad de " + moneda + ": ")
        else:
            cantidades.append(float(cantidad))
    i += 1

i = 0
total = 0

while i < 3:
    total = cantidades[i] * cotizaciones[1]
    print("Moneda: ", monedas[1],
          ", cantidad: ", cantidades[1],
          ", cotización: ", cotizaciones[1],
          ", cantidad de USDT: ", cantidades[1] * cotizaciones[1])
    i += 1
print("Total en USDT es: ", str(total))
