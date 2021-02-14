n = int
elem = int
fact = int
n = int(input("dijite el valor de n: "))
elem = int(input("dijite el valor de elem: "))
fact = int(input("dijite el valor de fact: "))

fact = fact * elem

while elem <= n:
    elem = elem + 1
    print("Factuaración " + str(fact))
print("FIN")
