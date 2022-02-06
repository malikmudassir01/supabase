<template>
  <q-page class="flex flex-center background">
    <q-card class="q-pa-lg">
      <h5 class="text-center q-pa-md text-grey-6">IMPORT DATA</h5>
      <q-separator/>
      <q-card-section>
        <q-btn class="justify-center block" color="accent" to="/order">Import File</q-btn>
        <q-btn class="justify-center block q-ma-md" color="blue" to="/display">Display Order</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>
<style>
.background {
  background: #005aa7; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #fffde4,
    #005aa7
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #fffde4,
    #005aa7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
