criptos = ["BTC","BCC","LTC","ETH","ETC"]
cant = ["10","20","30","40","50"]
cotiz =["100","150","200","250","300"]

total = 0
i = 0
while i < 2:
    criptos[i] = input("ingrese el nombre de la moneda: ")
    cant[i] = float(input("Indique la cantidad de "+criptos[i]+":"))
    cotiz[i]= float(input("indique la cotizacion de cripto en USD de "+criptos[i]+":"))
    i = i+1

i=0
while i < 2:
    print("el nombre de la moneda:"+criptos[i]+",cantidad:"+str(cant[i])+"precio en USD:"+str(cotiz[i]))
    i=i+1
