nombreCripto1 = ""
nombreCripto2 = ""
nombreCripto3 = ""
cantCripto1 = 0
cotizacion1 = 0
cantCripto2 = 0
cotizacion2 = 0
cantCripto3 = 0
cotizacion3= 0
valorTotal = 0
nombreCripto1 = input("Nombre de la Primera Criptomoneda: ")
cantCripto1 = float(input("Cantidad acumulada de la Primera Criptomoneda: "))
cotizacion1= float(input("Cotización por US$ del día de la Primera Criptomoneda: "))
nombreCripto2 = input("Nombre de la Segunda Criptomoneda: ")
cantCripto2 = float(input("Cantidad acumulada de la Segunda Criptomoneda: "))
Cotizacion2 = float(input("Cotización por US$ del día de la Segunda Criptomoneda: "))
valorTotal = cantCripto1 * cotizacion1 + cantCripto2 * cotizacion2
print("Ud. Posee un total de US$ " + str(valorTotal))
