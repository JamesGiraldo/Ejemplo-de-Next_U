peso = int(input("Indique el peso  a verificar: "))
estatura = float(input("Indique la altura  a verificar: "))

imc = peso/(estatura**2)

print("la masa corporal es:" + str(imc))
