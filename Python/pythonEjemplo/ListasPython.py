cripto = []
cant = []
cotiz = []

i = 0
while i < 5:
    cripto.append(input("Ingrese el nombre de la moneda: "))
    cant.append(float(input("Ingrese la cantidad de "+cripto[i]+": ")))
    cotiz.append(float(input("Ingrese la cotización en USD de "+cripto[i]+": ")))
    i = i + 1

i = 0
while i < 5:
    print("Moneda: "+ str(cripto[i])+", cantidad: "+ str(cant[i])+", precio en USD: "+str(cotiz[i]))
    i = i + 1