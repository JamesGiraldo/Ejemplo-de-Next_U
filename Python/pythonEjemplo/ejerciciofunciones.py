x=int(input("Introduce el primer numero: "))
y=int(input("Introduce el segundo numero: "))


def max(a,b):
    """ Esta función calcula en máximo entre dos números """
    if a>b:
        maximo=a
    else:
        maximo=b
    return maximo        
print("El Maximo entre ",str(x)," y",str(y)," es ",max(x,y))
