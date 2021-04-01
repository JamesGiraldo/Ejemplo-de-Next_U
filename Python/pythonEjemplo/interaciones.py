import random # modulo random

moneda = input("Ingrese el nombre de la moneda:") # Se solicita la moneda
cantidad = float(input("Ingrese el monto de "+ moneda + " que posee: ") ) # se solicita la cantidad de la moneda

dias = 0 # estos son los días inicializados en 0
while dias < 7: # Aquí es para decir que si el día es mayor a 7
    porcentaje = random.uniform(-0.03,0.03) # Esto lo que  hace es dar un numero aleatorio entre 0 y 3 segu la documentación que le compartí
    cantidad = cantidad + (cantidad * porcentaje) # Aqui se Calcula la cantidad por el porcentaje + la cantidad inicial almacenada en la cantidad
    dias = dias + 1 # Aquí se itera de 1 en 1 los días para que no se pase de la condición especificada en el while
    print("Saldo de ",moneda," el dia ",dias," es de: %6.7f "%cantidad+". Ganacia de %6.2f "%(porcentaje*100),"%") # Se empirme el resultado final


# es_primo=True
# i=2
# num = 3
# while (es_primo and i<num):
#     es_primo=(num%i)!=0
#     i+=1
#     if es_primo:
#         print(num,"Es numero primo")
