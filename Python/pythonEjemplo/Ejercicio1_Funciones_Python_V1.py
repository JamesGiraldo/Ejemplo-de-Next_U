def esmoneda(cripto): # Función
    criptos = ["BTC","BCC","LTC","ETH","ETC","XRP"] # variable de arreglo
    if cripto in criptos: # vcondicional de criptos
        return True
    else:
        return False

def esnumero(numero): # función
    return numero.replace('.','',1).isdigit()

total = 0 # Se declara en 0 por que no se sabe el valor final
i = 0 # se declara en 0 por que es el punto de partida
while (i < 3): # bucle while que recorre 3 veces desde nuetro punto de partida i
    cripto = input("Ingrese el nombre de la moneda: ") # se solicita la moneda
    if esmoneda(cripto): # se valida la función y se recibe la moneda del usuario
        i = i + 1 # se itera de uno en uno el conteno del bucle para que solo sea lo que se especifico en la condición del while y no pase de 3
        cant = "" # inicializa vacia por que no se sabe que valor tendra la cantidad
        while not esnumero(cant):
            cant = input("Indique la cantidad de "+cripto+":") # Se solicita la cantidad de la moneda
        cotiz = "" # inicializa vacia por que no se sabe que valor tendra la cotización
        while not esnumero(cotiz):
            cotiz = input("Indique la cotización en USD de "+cripto+":") # se solicita la cotización de la moneda
        total = total + float(cant) * float(cotiz) # operación
    else:
        print("Moneda invalida.") # caso contrario que no exita la moneda
print("El tota en USD que tiene el usuario es de ",str(total)) # resultado final OK
