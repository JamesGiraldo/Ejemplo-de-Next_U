moneda1 = input("Ingrese el nombre de la primera moneda: ")
cant1 = float(input("Ingresa la cantidad de " + moneda1 + ": "))

moneda2 = input("Ingrese el nombre de la segunda moneda: ")
cant2 = float(input("Ingresa la cantidad de " + moneda2 + ": "))

moneda3 = input("Ingrese el nombre de la tercera moneda: ")
cant3 = float(input("Ingresa la cantidad de " + moneda3 + ": "))

# Si la cantidad 1 es mayor que la cantidad 2 y si cantidad 1 es mayor que cantidad 3
if cant1 > cant2 and cant1 > cant3:
    # impirmir moneda 1 junto su cantidad 1
    print(moneda1,cant1)
    # validar si la cantidad 2 es mayor que la cantidad 3
    if cant2>cant3:
        #  impirmir moneda 2 junto su cantidad
        print(moneda2,cant2)
        #  impirmir moneda 3 junto su cantidad
        print(moneda3,cant3)
        #  si no
    else:
        #  impirmir la moneda 3 con su respectiva cantidad
        print(moneda3,cant3)
        #  impirmir moneda 2 junto su cantidad
        print(moneda2,cant2)
#  si no si => la cantidad 2 es mayor que la cantidad 1 y si la cantidad 2 es mayor que la cantidad 3
elif cant2 > cant1 and cant2 > cant3:
    #  impirmir la moneda 2 con su cantidad
    print(moneda2,cant2)
    #  validar si la cantidad 1 es mayor que la cantidad 3
    if cant1 > cant3:
        # impirmir moneda 1 junto su cantidad
        print(moneda1,cant1)
        #   impirmir moneda 3 junto su cantidad
        print(moneda3,cant3)
        #  caso contrario
    else:
        #   impirmir moneda 3 junto su cantidad
        print(moneda3,cant3)
        #  impirmir moneda 1 junto su cantidad
        print(moneda1,cant1)
# Si no se cumple ninguna condición entonces
else:
    # impirmir la moneda 3 con su cantidad
    print(moneda3,cant3)
    #  y si cantidad 1 es mayor a 2
    if cant1 > cant2:
        #  impirmir moneda 1 con su cantidad
        print(moneda1,cant1)
        #  impirmir moneda 2 con su cantidad
        print(moneda2,cant2)
        # si no
    else:
        #  impirmir moneda 2 con su cantidad
        print(moneda2,cant2)
        #  impirmir moneda 1 con su cantidad
        print(moneda1,cant1)
