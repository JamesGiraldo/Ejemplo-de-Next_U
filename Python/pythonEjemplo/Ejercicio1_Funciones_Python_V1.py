def esmoneda(cripto):
    criptos = ["BTC","BCC","LTC","ETH","ETC","XRP"]
    if cripto in criptos:
        return True
    else:
        return False

def esnumero(numero): 
    return numero.replace('.','',1).isdigit()

total=0
i=0
while (i < 3):
    cripto = input("Ingrese el nombre de la moneda: ")
    if esmoneda(cripto):
        i=i+1
        cant = ""
        while not esnumero(cant):
            cant = input("Indique la cantidad de "+cripto+":")
        cotiz=""
        while not esnumero(cotiz):
            cotiz = input("Indique la cotización en USD de "+cripto+":")
        total = total + float(cant) * float(cotiz)
    else:
        print("Moneda invalida.")
print("El tota en USD que tiene el usuario es de ",str(total))