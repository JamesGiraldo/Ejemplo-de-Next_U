moneda = input("Ingrese la moneda a comprar: ")
moneda1 = 0
moneda2 = 0
moneda3 = 0
if moneda == moneda1 or moneda==moneda2 or moneda==moneda3:
    cantidad = float(input("Ingrese la cantidad de "+moneda+" a comprar:"))
if moneda == "BTC" and cantidad>100.00:
    print("Compra Exitosa")
elif moneda == "LTC" and cantidad> 1.0:
    print("Compra Exitosa")
elif moneda == "BCC" and cantidad > 0.1:
    print("Compra Exitosa")
else:
    print("Debe ingresar una de las siguientes monedas: BTC, LTC, BCC")
