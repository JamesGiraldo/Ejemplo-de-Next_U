# Declaraciones de variables
nombreCripto = ""
cantCripto = 0
cotizacion = 0
valorTotal = 0

# solicitud de información al usuario
nombreCripto = input("Nombre de la Criptomoneda: ")
# imprimir el resultado en la variable nombreCripto
print("Moneda: " + nombreCripto)
# solicitar nuevamente la información al usuario
cantCripto = int(input("Cantidad acumulada de la criptomoneda: "))
cotizacion = float(input("Cotización por US$ del día de la criptomoneda: "))
# operación
valorTotal = cantCripto * cotizacion
# imprimir valor final
print("Usted pose un total de US$" + str(valorTotal))
