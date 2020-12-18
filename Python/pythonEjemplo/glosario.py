nombre_archivo = "Glosario.txt"
archivo = open(nombre_archivo,"r")

texto = archivo.read()
archivo.close()
lineas = texto.splitlines()
terminos = texto.split(":")
diccionario={}
print("==========Lista de datos actuales==========")
for linea in lineas:
    termino = linea.split(":")
    diccionario[termino[0]]=termino[1]
    print(linea)

buscar = input("Indique el termino a buscar en el diccionario: ")
encontrado = diccionario.get(buscar)
if encontrado:
    print(buscar+":"+" "+encontrado)
else:
    print("Termino no existe ene l glosario")
    ingresar_termino = input("Desea ingresar este termino(s/n):")
    if (ingresar_termino=='s'):
        archivo = open(nombre_archivo,"a")
        nuevo_termino = input("Indique la descripción del termino "+buscar+":")
        archivo.write(buscar+":"+nuevo_termino+"\n")
        archivo.close()
