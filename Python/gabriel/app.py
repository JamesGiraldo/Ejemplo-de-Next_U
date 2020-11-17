# leer el archivo
nombre_archivo = "transacciones.txt"
archivo = open(nombre_archivo,"r")
texto = archivo.read()

archivo.close()
# obtener linea por linea del archivo
lineas = texto.splitlines()
# crear la variable que almacenará la suma 
total = 0
# recorrer ese listado y guardarlo en una variable linea
for linea in lineas:
    # separar la información mediante los 2 puntos con que se encuentran guardados
    data = linea.split(":")
    # reemplazar los caracteres de corchetes
    # imprimir las posiciones correspondientes
    string = data[1].replace(']','').replace('[','')
    elem = string.replace('"','').split(",")
    
    total += int(elem[0]) * int(elem[1])
# mostrar el total
print(lineas , "\n")
print("El total es", str(total))
