# import random
# print("Text")
# moneda=input("Ingrese la moneda: ")
# cantidad=float(input("Ingrese la cantidad de "+moneda+": "))
# count=0
# while count < 7:
#     profit=random.uniform(-0.03,0.03)
#     cantidad=cantidad+(cantidad*profit)
#     count=count+1
#     print("Saldo de",moneda,"el dia",count,"es de: %6.7f"%cantidad+". Ganacia de %6.2f"%(profit*100),"%")



import random

print("=====================Bienvenid@======================")
#solicitar la moneda
moneda = input(" ingrese el nombre de la criptomoneda: ")
#solicitar la cantidad
cantidad = float( input( "Ingrese la cantidad de la: " + moneda + ": " ) )
# solicitar los dias que quieres especificar de iteracion por días
dias = int( input(" Ingrese la cantidad de días ") )

contador = 0 
#ciclo ietrativo segun los dias
while contador < dias:
    # almacenar un valor aleatorio con el rango de -0.03, 0.03 usando random
    procentaje = random.uniform(-0.03,0.03)
    # operacion
    cantidad =  cantidad + ( cantidad * procentaje )
    # contador ietrativo que va de 1 en 1 para que no se un bucle infinito si no que llegue hasta 7
    contador = contador + 1
    # print("Saldo de", moneda, "el dia", contador, "es de: ", cantidad + ". Ganacia de ",  str( procentaje * 100 ), "% ")
    print("Saldo de", moneda, "el dia", contador, "es de: %6.7f"%cantidad + ". Ganacia de %6.2f"%( procentaje * 100 ), "% ")
