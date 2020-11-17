
print("Hola, me llamo James, \n y esto es un salto de línea, \n y este otro")
def capturar_moneda():
    cripto   = ""
    cant     = float
    cotiz    = float
    cripto   = input("ingrese el nombre la moneda: ")
    cant     = float(input("Ingrese" + '\n' + "la cantidad de la moneda: "))
    cotiz    =  float(input("Ingrese la cotización en USD de la moneda: "))
    return cant * cotiz    
i=0
valor=0.0
while i < 5:
 valor = valor + capturar_moneda()
 i=1+1
print("Usted tiene " + valor + " Dólares Americanos")