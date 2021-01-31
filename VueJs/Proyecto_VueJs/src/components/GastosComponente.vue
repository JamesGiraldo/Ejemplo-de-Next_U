<template>
  <div class="row lead my-1">
    <div class="col-3">{{ gasto.nombre }}</div>
    <div class="col-3">{{ gasto.tipo }}</div>
    <div class="col-3">{{ gasto.monto }}</div>
    <div class="col-2">
      <div id="eliminar" class="btn btn-primary" v-on:click="manejarClick($event, { indice: indice, id: id })"> X</div>
      <div id="detalle" class="btn btn-primary" v-on:click="manejarClick($event, { indice: indice, id: id, nombre: gasto.nombre, tipo: gasto.tipo, monto: gasto.monto  })">M</div>      
    </div>
  </div>
</template>

<script>
export default {
  name: "gastos",
  props: ["gasto", "id", "indice"],
  data: function () {
    return {
      test: "test",
    };
  },
  methods: {
    manejarClick: function (evento, gastoID) {
      if (evento.target.id === "eliminar") {
        this.$emit("eliminargasto", gastoID);
      }
      if (evento.target.id === "detalle") {
        this.$emit("detallegasto", gastoID);
      }      
    },
  },
};
</script>

<style>
</style>
