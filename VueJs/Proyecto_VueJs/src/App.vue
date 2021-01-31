<template>
  <div v-if="logon" id="app" class="container">
    <div class="col-12 text-primary">
      <h1>Lista de gastos</h1>
    </div>
    <div v-if="view">
      <div id="ocultar" class="col-12 btn btn-primary center" v-on:click="manejarClick($event)">-</div>
      <div class="row border rounded text-primary lead p-2 mt-3">
        <div class="col-6">Nombre del gasto</div>
        <div class="col-6">
          <input v-model="nombregasto" class="text-primary" type="text" />
        </div>
        <div class="col-6">Tipo del gasto</div>
        <div class="col-6">
          <select v-model="tipogasto" class="text-primary">
            <option>Hogar</option>
            <option>Trabajo</option>
            <option>Carros</option>
          </select>
        </div>
        <div class="col-6">Monto del gasto</div>
        <div class="col-6">
          <input v-model="montogasto" class="text-primary" type="number" />
        </div>
        <div v-if="edit" class="col-12">
          <div id="actualizar" class="btn btn-primary" v-on:click="manejarClick($event)">Actualizar gasto</div>
        </div>
        <div v-else class="col-12">
          <div id="agregar" class="btn btn-primary" v-on:click="manejarClick($event)">Agregar gasto</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div id="mostrar" class="col-12 btn btn-primary center" v-on:click="manejarClick($event)">+</div>
    </div>

    <div class="container border rounded text-primary mt-4">
      <div class="row lead border rounded font-weight-bold">
        <div class="col-3">Nombre del gasto</div>
        <div class="col-3">Tipo del gasto</div>
        <div class="col-3">Monto del gasto</div>
        <div class="col-3">Accion</div>
      </div>
      <gastosComponente
        v-for="(gasto, index) in gastos"
        v-bind:gasto="gasto"
        v-bind:id="gasto.id"
        v-bind:indice="index"
        v-bind:key="index"
        v-on:eliminargasto="eliminar($event)"
        v-on:detallegasto="detalle($event)"
      ></gastosComponente>
      <div class="row lead border rounded font-weight-bold">
        <div class="col-6">Total Gastos</div>
        <div class="col-6">{{totalGastos}}</div>
      </div>
    </div>
  </div>
  <div v-else>
    <loginForm
      v-bind:firebase="firebase"
      v-on:ingresoCorrecto="ingresoCorrecto($event)"
    ></loginForm>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import gastosComponente from "./components/GastosComponente";
import loginForm from "./components/loginForm.vue";

export default {
  name: "app",
  data: function () {
    return {
      gastos: [],
      nombregasto: "",
      tipogasto: "",
      montogasto: "",
      coleccion: {},
      logon: false,
      view: true,
      edit: false,
      gastoIdM: "",      
      firebase: "",
      idUsuario: "",
      db: "",
      userName: "",
      montos: [],
      totalGastos: 0,
    };
  },
  methods: {
    manejarClick: function (evento) {
      if (evento.target.id === "agregar") {
        const gastoData = {
          nombre: this.nombregasto,
          tipo: this.tipogasto,
          monto: this.montogasto,
        };
        this.coleccion.add(gastoData)
        this.gastos = [];
        this.montos = [];     
        this.mostrarListado(this.userName);
        this.nombregasto = "";
        this.tipogasto = "";
        this.montogasto = "";    
        console.log("montos22222",this.montos);
        console.log("total", this.totalGastos)        
      }
      if (evento.target.id === "actualizar") {
        const gastoData = {
          nombre: this.nombregasto,
          tipo: this.tipogasto,
          monto: this.montogasto,
        };
        this.coleccion.doc(this.gastoIdM).set(gastoData);
        this.gastos = [];
        this.montos = [];
        this.mostrarListado(this.userName);
        this.nombregasto = "";
        this.tipogasto = "";
        this.montogasto = "";
        this.edit = "false";         
      }      
      if (evento.target.id === "mostrar") {
        this.view = true;
        this.edit = false;
      }
      if (evento.target.id === "ocultar") {
        this.view = false;
      }
    },
    eliminar: function (gastoID) {
      this.coleccion.doc(gastoID.id).delete();
      this.gastos = [];
      this.montos = [];
      this.mostrarListado(this.userName);
    },
    detalle: function (gastoID) {
      console.log(gastoID)
      this.edit = true;
      this.view = true;
      this.nombregasto = gastoID.nombre;
      this.tipogasto = gastoID.tipo;
      this.montogasto = gastoID.monto;
      this.gastoIdM = gastoID.id;
    },
    mostrarListado: function (usuario){
      this.coleccion = this.db.collection("/usuarios/" + usuario + "/gastos");
      this.coleccion.get().then((gastos) => {
        this.totalGastos = 0;
        gastos.forEach((gasto) => {
          this.gastos.push({
            id: gasto.id,
            nombre: gasto.data().nombre,
            tipo: gasto.data().tipo,
            monto: gasto.data().monto,
          });
          this.montos.push(parseInt(gasto.data().monto));
          for(var i=0;i<this.montos.length;i++){
            this.totalGastos= this.totalGastos + this.montos[i];
          }
        });
      });
    },
    ingresoCorrecto: function (usuario) {
      console.log("User: " + usuario);
      this.idUsuario = usuario;
      this.logon = true;
      this.userName = usuario;
      console.log("userName:",this.userName);
      this.totalGastos = 0;
      this.mostrarListado(this.userName);
    },
  },
  components: {
    gastosComponente,
    loginForm,
  },
  beforeMount: function () {
    var config = {
      apiKey: "AIzaSyBZ_-V49Y_1XJ6DPZ054XFhkFyURxUJKM4",
      authDomain: "proyectovue-2cbfe.firebaseapp.com",
      databaseURL: "https://proyectovue-2cbfe.firebaseio.com",
      projectId: "proyectovue-2cbfe",
      storageBucket: "proyectovue-2cbfe.appspot.com",
      messagingSenderId: "81326642279",
      appId: "1:81326642279:web:f816de208d9c5f10feb0c2",
    };
    firebase.initializeApp(config);
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
    this.firebase = firebase;
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
