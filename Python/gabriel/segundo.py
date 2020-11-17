sus=[100,20]
bs=[220,60]
euros=[10,30]
cada_valor = [sus, bs, euros]
lista2 = []
nume = 0

sus_a_sus=1
bs_a_sus=0.5
euros_a_sus=1.5
cada_mul = [sus_a_sus,bs_a_sus, euros_a_sus]

for k in range(len(cada_valor)):
    print(cada_valor[k])
    suma = 0
    for x in range(len(cada_valor[k])):
        suma = suma + cada_valor[k][x] * bs_a_sus    
    lista2.append(suma)
print('Lista', lista2)
print('============================')
for i in cada_valor:
    for m in i:
        nume += m
print('Total' , nume)
