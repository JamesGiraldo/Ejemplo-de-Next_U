numero = int(input("Indique el valor entero: "))
if numero%3 == 0 and numero%5 == 0:
    print("FizzBuzz")
elif numero%3 == 0:
    print("Fizzz")
elif numero%5 == 0:
    print("Buzzz")
else:
    print(numero)
