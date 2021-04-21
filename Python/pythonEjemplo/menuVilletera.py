# variable que imprime las opciones  del "menú"
menu_opciones1=(" 1.Recibir cantidad \n 2.Transferir monto  \n 3.Mostrar balance de una moneda  \n 4.Mostrar balance general  \n 5.Mostrar historico de transacciones  \n 6.Salir")

print("Bienvenido al programa de Gestion de Criptomonedas, por favor selecciona una opcion de las que se listan a continuacion: ") # se imprime el mensaje de Bienvenida
def menu(menu_opciones): # función del menú
    print (menu_opciones1) # se imprimen las opneopciones :D
    menu_seleccion = input("Seleccione la opcion que desea ejecutar: ") # se solicita la opción para disparar el menú.

    if menu_seleccion==("1"): # opción 1
        print("Opción 1") # se imprime opción
    elif menu_seleccion==("2"): # opción 2
        print("Opción 2") # se imprime opción
    elif menu_seleccion==("3"): # opción 3
        print("Opción 3") # se imprime opción
    elif menu_seleccion==("4"): # opción 4
        print("Opción 4") # se imprime opción
    elif menu_seleccion==("5"): # opción 5
        print("Opción 5") # se imprime opción
    elif menu_seleccion==("6"): # opción 6
        menu_cont=input("Desea salir de su villetera virtual?  Contestar 'Si' o 'No' ") # Se solicita confirmación para salir del programa :D
        if menu_cont==("Si"): # se valida si es Si
            print("Gracias por usar el programa de Gestion de Criptomonedas, su sesion ha sido finalizada.") # imprime el mensaje XD
            SystemExit # Cierra el programa
        else: # si no
            menu(menu_seleccion) # solicita numente continuar con el sistema :D
    else: # en caso tal de que no Seleccione nada del menú o sea incorrecto la opción
        print("Para continuar, debe ingresar una de las opciones listadas al inicio del programa. ") # imprimir validación
        menu(menu_seleccion) # solita nuemante la opción

# Aquí se llama la función que dispara el menú
menu(menu_opciones1)
