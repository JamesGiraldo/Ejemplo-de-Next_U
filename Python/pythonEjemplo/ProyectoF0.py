from tkinter import *
from tkinter import ttk
import requests
import json
import os
from datetime import datetime
#M3 es el código propio, para ejecutar cualquier transacción se debe dar click en el botón (Ejecutar) luego de haber seleccionado la transacción correspondiente
destinatarios=("M3","A0","B0","C0","A1","B1","C1","A2","B2","C2")#Destinatarios a enviar, M3 es el código propio
opciones=("1.Recibir cantidad", "2.Transferir monto", "3.Mostrar balance de una moneda", "4.Mostrar balance general", "5.Mostrar histórico de transacciones", "6. Salir del programa")
saldo_d={}#Info del balance por moneda
af=open(os.path.dirname(__file__)+"/info_balance_total.txt", "w")#Archivo de balance por moneda
af.write("Nombre, Total \n")
ah=open(os.path.dirname(__file__)+"/info_historial.txt", "w")#Archivo de historial
class Application(Frame):
    headers = {#Esto lo encientro en la documentación
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': '6cef7d47-3d68-46e3-8c78-72b7bc99d36a',
    }
    url= 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    respuesta = requests.get(url, headers=headers)#De forma general, hago el llamado
    info = respuesta.json()
    for var in info["data"]:
        saldo_d[var["name"]]=0#Creo el diccionario con moneda:saldo y todos los saldos son 0

    def get_info(self):
        return self.info #Para poder obtener la información del json desde otra función

    def set_saldo(self,valor,detalle,moneda):#Modificar el saldo de cada moneda: valor, suma/resta, moneda
        if detalle:
            saldo_d[moneda]+=float(valor)
        else:
            saldo_d[moneda]-=float(valor)

    def get_balance_u(self, moneda):#Devuelvo un diccionario con Moneda:equivalente del saldo de esa moneda en usd
        return {"Crypt":saldo_d[moneda],"Suma":saldo_d[moneda]*float(self.get_precio(moneda))}#Crypt:11, Suma:11*cot

    def get_balance_g(self):#Imprimo en el archivo el detalle de cada moneda y la cantidad de la misma
        saldo_n=0
        for var in saldo_d:
            saldo_n+=saldo_d[var]*self.get_precio(var)
            af.write(">>> %s : %s\n"% (var, saldo_d[var]))#Moneda: cantidad
        af.write("Su balance total en dólares es de %s USD"% saldo_n)#Imprimo el balance que se tiene en dolares, sumando los saldos
        af.close()

    def get_precio(self, moneda):#Para retornar el precio de la moneda es USD
        for var in self.get_info()["data"]:
            if var["name"]==moneda:
                return (var["quote"]["USD"]["price"])#Dada una moneda, devuelvo su cotización en USD

    def es_moneda(self, moneda):#Valido si esa moneda existe
        mv=False
        nombre=""
        for var in self.get_info()["data"]:
            if var["symbol"]==str(moneda):#Si la moneda fue validada
                mv=True
                nombre=var["name"]
                break
        return {"find":mv,"nombre":nombre}#Retorno si existe y el nombre

    def es_numero(self, numero):#Valido si la cantidad es un numero
        mv=False
        if numero.replace('.','',1).isdigit():##Si es una cantidad válida
            mv=True
        return mv

    def es_codigo(self, codigo):#Valido que el codigo exista en destinatarios, y que sea diferente al propio (M3)
        return (str(codigo)!="M3" and str(codigo) in destinatarios)

    def __init__(self, main_window):        
        super().__init__(main_window)
        main_window.configure(width=550, height=320)  #Tamaño de la ventana 
        self.fun=0#No he seleccionado ninguna transacción a realizar
        self.funciones= {1:self.recibir,2:self.transferir,3:self.balance_u,4:self.balance,5:self.historial,6:self.salir}#Creo un diccionario con transacción:función de la misma
        self.label_0=Label(main_window, text="Seleccione lo que desea realizar y pulse aceptar")#Texto
        self.label_0.place(x=10,y=10)#Posición del label
        self.lista_op=ttk.Combobox(Ventana)#Menú de opciones
        self.lista_op['values']=opciones#Le indico las opciones
        self.lista_op.place(x=15,y=40,width=200, height=25)
        self.lista_op.bind("<<ComboboxSelected>>", self.val_lista)#Cuando selecciono una opción del menú, se actualizan los botones y labels
        self.r_moneda_l=Label(main_window, text="")#
        self.v10=StringVar()#Para que quede guardado el tipo de moneda
        self.r_moneda_e=Entry(main_window, textvariable=self.v10)#Cuadro de texto
        self.r_cantidad_l=Label(main_window, text="")#Texto
        self.v11=StringVar()#Para que quede guardada la cantidad
        self.r_cantidad_e=Entry(main_window, textvariable=self.v11)#Cuadro de texto
        self.r_codigo_l=Label(main_window, text="")#Texto
        self.v12=StringVar()#Para que quede guardado el destinatario
        self.r_codigo_e=Entry(main_window, textvariable=self.v12)#Cuadro de texto
        self.l_info=Label(main_window, text="")#Texto donde digo si la transacción fue exitosa
        self.l_info.place(x=10,y=220)
        self.b_calculo_0=Button(main_window, text="Ejecutar", command=self.transaccion)#Botón para ejecutar la transacción seleccionada

    def val_lista(self, event):
        self.b_calculo_0.place(x=15,y=250,height=25)#Muestro el botón ejectutar
        self.r_moneda_l.place(x=10,y=80)
        self.r_moneda_e.place(x=15,y=100,width=50, height=20)
        self.r_cantidad_l.place(x=10,y=130)
        self.r_cantidad_e.place(x=15,y=150,width=50, height=20)
        self.r_codigo_l.place(x=10,y=180)
        self.r_codigo_e.place(x=15,y=200,width=50, height=20)
        self.l_info.config(text="")#Borro el texto para una nueva transacción
        self.r_moneda_l.config(text="")#Borro el texto para una nueva transacción
        self.r_cantidad_l.config(text="")#Borro el texto para una nueva transacción
        self.r_codigo_l.config(text="")#Borro el texto para una nueva transacción
        self.funciones[int(self.lista_op.get()[0])]()#Llamo la función que está en el diccionario

    def transaccion(self):#Transacciones según la opción seleccionada
        nom=self.es_moneda(str(self.v10.get()).upper())["nombre"]#Me devuelve el nombre de la criptomoneda
        if self.fun==1 or self.fun==2:#Si voy a enviar o a recibir, valido los campos tipo de moneda, cantidad y codigo destinatario
            cond0=self.es_moneda(str(self.v10.get()).upper())["find"]#Valido si es moneda
            cond1=self.es_numero(str(self.v11.get()))#Valido si es numero
            cond2=self.es_codigo(str(self.v12.get()).upper())#Valido si el codigo es valido
            if (cond0 and cond1 and cond2):#Si todo está bien, ejecuto la transacción que corresponda                
                valor=float(str(self.v11.get()))#valor=cantidad
                if self.fun==1:
                    self.set_saldo(valor,1,nom)#Uno para sumar(recibir), cero para restar(enviar)
                    ah.write("[%s] >> Moneda:%s (s): Recibió de %s, cantidad:%s %s(s) equivalente a %s USD \n"% (datetime.now(), nom, str(self.v12.get()).upper(), valor, nom, round((valor*float(self.get_precio(nom))),2)))#Escribo en el archivo de historial
                    self.l_info.config(fg="green", font=("Arial",10), text="Transacción exitosa, se agregó %s USD a su cuenta, (Recibió %s %s (s))" % (round((valor*float(self.get_precio(nom))),2), round(float(str(self.v11.get())),2), nom))#Confirmo a transacción en el label
                else:#Si es la transacción 2, (Enviar)
                    self.set_saldo(valor,0,nom)#Uno para sumar, cero para restar
                    ah.write("[%s] >> Moneda:%s (s): Envió a %s, cantidad:%s %s(s) equivalente a %s USD \n"% (datetime.now(), nom, str(self.v12.get()).upper(), valor, nom, round((valor*float(self.get_precio(nom))),2)))#Escribo en el archivo de historial
                    self.l_info.config(fg="green", font=("Arial",10), text="Transacción exitosa, se debitó %s USD de su cuenta, (Envió %s %s (s))" % (round((valor*float(self.get_precio(nom))),2), round(float(str(self.v11.get())),2), nom))#Confirmo a transacción en el label
            else:#Si no se validó alguna condición, se indica que se debe revisar la información             
                self.l_info.config(fg="red", font=("Arial", 10), text="Transacción fallida, revise la información ingresada e intente de nuevo")
                ah.write("[%s] >> Transacción fallida, ingresó información incorrecta \n"% datetime.now())

        if self.fun==3:#Si es la transacción 3           
            if self.es_moneda(str(self.v10.get()).upper())["find"]:#Si la moneda exixte, realizo la validación del balance
                self.l_info.config(fg="green", font=("Arial", 8), text="Usted tiene %s %s (%s) cuya cotización actual es de %s USD,\n su balance dólares de esta moneda es %s USD"% (round(saldo_d[nom], 2), nom, str(self.v10.get()).upper(), round(self.get_precio(nom),2), round(self.get_balance_u(nom)["Suma"],2)))
                ah.write("[%s] >> Realizó consulta del balance actual de la moneda %s \n"% (datetime.now(), nom))
            else:#Indico que la moneda no existe
                self.l_info.config(fg="red", font=("Arial", 10), text="La moneda ingresada no existe, revise la información e intente de nuevo")
        
        if self.fun==4:#Si es la transacción 4           
            self.get_balance_g()#Llamo la función se crea el archivo con el balance total
            self.l_info.config(fg="green", font=("Arial", 8), text="Se generó el archivo info_balance_total.txt en \n %s/info_balance_total.txt" % os.path.dirname(__file__))#Confirmo la transacción
            ah.write("[%s] >> Realizó consulta del balance total, se generó el archivo %s \n"% (datetime.now(), (os.path.dirname(__file__)+"/info_balance_total.txt")))#Agrego en el historial

        if self.fun==5:#Como el archivo historial se está escribiendo mientras el programa se ejecuta, al llamar esta función, lo cierro para que el usuario pueda abrirlo y visualizar
            ah.close()#Para que al darle click en aceptar, el archivo se cierre y se pueda abrir por el usuario
            self.l_info.config(fg="green", font=("Arial", 8), text="Se generó el archivo info_historial.txt en \n %s/info_historial.txt" % os.path.dirname(__file__))#Confirmo que el archivo se creó            

        if self.fun==6:
           root.quit()#Cierro el programa

    def recibir(self):#Escribo en los labels e indico que la función es 1 para que al dar click en ejecutar, se realice la tarea correspondiente a la transacción 1
        self.r_moneda_l.config(text="Digite el tipo de moneda") 
        self.r_cantidad_l.config(text="Digite la cantidad a recibir")   
        self.r_codigo_l.config(text="Digite el codigo desde donde recibe")
        self.fun=1
    def transferir(self):
        self.r_moneda_l.config(text="Digite el tipo de moneda")
        self.r_cantidad_l.config(text="Digite la cantidad a enviar")   
        self.r_codigo_l.config(text="Digite el codigo a donde envia")
        self.fun=2
    def balance_u(self):
        self.r_moneda_l.config(text="Digite la moneda a validar")
        self.r_cantidad_e.place_forget()#Borro los campos que no voy a usar, solo necesito validar si la moneda existe para mostrar el balance
        self.r_codigo_e.place_forget()
        self.fun=3
    def balance(self):
        self.r_moneda_l.config(text="Presione ejecutar para generar el archivo de texto con la información")
        self.r_moneda_e.place_forget()#Como es balance general, no necesito que el usuario proporcione información, entonces borro los cuadros de texto
        self.r_cantidad_e.place_forget()
        self.r_codigo_e.place_forget()
        self.fun=4
    def historial(self):
        self.r_moneda_l.config(text="Presione ejecutar para generar el archivo de texto con el historial")
        self.r_moneda_e.place_forget()
        self.r_cantidad_e.place_forget()
        self.r_codigo_e.place_forget()
        self.fun=5
    def salir(self):
        self.r_moneda_l.config(text="")
        self.r_moneda_e.place_forget()
        self.r_cantidad_e.place_forget()
        self.r_codigo_e.place_forget()
        self.fun=6

Ventana = Tk()
Ventana.title("Wallet")
root=Application(Ventana)
Ventana.mainloop()
