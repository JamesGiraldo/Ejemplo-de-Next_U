import requests
_ENDPOINT = "https://api.binance.com"
def _url(api):
    return _ENDPOINT+api

def get_price(cripto):
    return requests.get(_url("/api/v3/ticker/price?symbol="+cripto))

def esmoneda(cripto):
    criptos = ["BTC","BCC","LTC","ETH","ETC","XRP"]
    if cripto in criptos:
        return True
    else:
        return False

moneda=""
while not esmoneda(moneda):
    moneda = input("Ingrese la moneda a determianr el precio: ")

data = get_price(moneda+"USDT").json()
print("El precio de",moneda,"es",data["price"])
