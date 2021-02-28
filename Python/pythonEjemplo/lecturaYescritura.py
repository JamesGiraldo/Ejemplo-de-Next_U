# moneda = input("Indique el nombre de la moneda: ")
# cantidad = float(input("Indique la cantidad de la moneda que posee: "))
# dias = int(input("Indique la cantidad de días que negociará la moneda: "))
# ganancia = float(input("Indique el porcentaje de ganancia esperada por día: "))
#
# ganancia_total = cantidad * ganancia / 100 * dias
# cant_total = cantidad + ganancia_total
# print("La ganancia de", moneda ,"durante los ",str( dias ),"es",str( ganancia_total ) )
# print("El monto total de", moneda ,"a los",str( dias ),"es de",str( cant_total ) )


print("Bienvenido a su calculadora de ganacias de criptomonedas")

NombreCriptomoneda = input("Ingrese el nombre de la criptomoneda --> ")
CantidadCriptomoneda = float(input("Ingrese la cantidad de la criptomoneda --> "))
CantidadDias = int(input("Ingrese la cantidad de dias --> "))
GanaciaFija = int(input("Ingrese su ganacia --> "))

GanciaCripto = CantidadCriptomoneda * GanaciaFija / 100 * CantidadDias
MontoTotal = CantidadCriptomoneda + GanciaCripto

print("La ganacia en cantidad de criptomoneda es: " , str( GanciaCripto ))
print("La cantidad de dias negociados son: " , str( CantidadDias ))
print("El monto total es: " , str( MontoTotal ))
