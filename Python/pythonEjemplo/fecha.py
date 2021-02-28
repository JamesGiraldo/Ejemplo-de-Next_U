from datetime import datetime

hora=datetime.now()
aja = hora.strftime("%A %d/ de %B/ de %Y a las %I:%M:%S%p")

ncripto = input("Nombre de tu criptomoneda: ")
cantcripto = int(input("Cuántas criptomonedas tienes acumuladas? "))
cotcripto = float(input("Coloca el valor en dólares de tu criptomoneda: "))

total = (cantcripto * cotcripto)

print("Usted tiene un total de $:", str(total),"/ Por sus:",str(cantcripto), str(ncripto),"/ al",str(aja) )


# nombreCripto=input("Nombre de la Criptomoneda: ")
# cantCripto=float(input("Cantidad acumulada de la Criptomoneda: "))
# cotizacion=float(input("Cotización por US$ del día de la Criptomoneda: "))
# ahora = datetime.now()
# print("La fecha completa y hora en la que obtuvo la información fue: " +ahora.strftime("%A %d/ de %B/ de %Y a las %I:%M:%S%p"))
