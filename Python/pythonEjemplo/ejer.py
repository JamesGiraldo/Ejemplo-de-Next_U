
print("Hola, me llamo ######, \n y esto es un salto de línea, \n y este otro")
# Se declara una función con def
def capturar_moneda():
    # se declaran las variables
    # esta es tipo string
    cripto   = ""
    # esta es tipo float o sea de tipo numeros decimales
    cant     = float
    cotiz    = float
    # se declara un input o sea una caja de texto el cual lo que escriba en la consola se guarda en la variable definida como cripto
    cripto   = input("ingrese el nombre la moneda: ")
    # se declara un input que almacenara lo que escribe en la variable cantidad
    cant     = float(input("Ingrese" + '\n' + "la cantidad de la moneda: "))
    # se declara un input que almacenara lo que escribe en la variable cotiz
    cotiz    =  float(input("Ingrese la cotización en USD de la moneda: "))
    # operación multiplica la cantidad por la cotización
    return cant * cotiz
# se inicializa otra variable 1  que es igual a 0
i=0
valor=0.0
# esto es para hacer un recorrido de que miesntras i sea menor a 5 va a recorrer 5 veces la función definida arriba
while i < 5:
 valor = valor + capturar_moneda()
 i=1+1
 # imprime el resultado
print("Usted tiene " + valor + " Dólares Americanos")
