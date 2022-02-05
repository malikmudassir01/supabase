
<template>
  <q-page className="background">
    <h4 className=" no-margin q-pa-xl text-white text-center font-change">Order Details</h4>
    <div class="q-my-lg">
      <q-select
        v-model="selected"
        :options="companies"
        label="Companies"
        options-dense
        dense
        class="q-pa-xl"
      />
    </div>
    <div class="q-px-xl">
      <q-input v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer" round color="primary">
            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
<div class="q-pa-xl">
    <q-table
      v-if="display"
      class="q-ma-xl"
      flat
      title="All Orders"
      :rows="display"
      row-key="ord_id"
      :pagination="{ rowsPerPage: 25 }"
      :rows-per-page-options="[25, 50, 100]"
    />
</div>

  </q-page>
</template>

<script>
import {ref, defineComponent, onMounted} from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

const { post, getById, update, list } = useApi();
export default {
  name: "displayOrder",

  data() {
    return {
      companies: ['abc'],
      selected: '',
      date: ref({ from: '2022/02/06', to: '2022/02/12' }),
      display: ['']
    }
  },
  mounted() {
    this.display=list("ordhdr");
    this.display.forEach(async (row) => {
      console.log("Row:", `${row.ord_id} - ${row.ord_num}`);
    });
  }
}
</script>

<style>
.background{
  background: #005AA7;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFDE4, #005AA7);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFDE4, #005AA7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.font-change{
  font-family: cursive;
}
</style>
