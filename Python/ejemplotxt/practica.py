nombre_archivo = "info.txt"
archivo = open(nombre_archivo,"r")

moneda = input("Moneda a guardar: ")
cantidad = float(input("Cantidad de la moneda: "))

archivo = open(nombre_archivo,"a")
archivo.write(moneda+" "+ str(cantidad))
archivo.close()
