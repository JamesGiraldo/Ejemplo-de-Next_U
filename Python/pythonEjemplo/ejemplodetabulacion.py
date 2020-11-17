import requests
def validarCripto(nombreMoneda):
    moneda=["BTC","BCC","LTC","ETH","ETC","XRP"]
    if nombreMoneda not in moneda:
        nombreMoneda=input("El nombre de la moneda no es valido. Ingrese el nombre de la moneda: ")
    else:
        return True
def cotiz(nombreCripto):
    url=requests.get("https://api.binance.com/api/v3/ticker/price?symbol="+nombreCripto+"USDT")
    url_1=url.json()
    precio=float(url_1["price"])
    return precio

cripto=input("Indique el nombre de su criptomoneda: ")
validarCripto(cripto)
print(cripto+": USD %6.2f"%cotiz(cripto))