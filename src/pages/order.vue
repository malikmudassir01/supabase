<template>
  <q-page class="background ">
    <h4 class=" no-margin q-pa-xl text-white text-center font-change">Order Data</h4>

        <div class="q-my-lg">
          <q-select
            v-model="selected"
            :options="csvfiles"
            label="File Type"
            options-dense
            dense
            class="q-pa-xl"
          />

          <div v-if="selected" class="text-caption">
            <div v-if="selected.value == 'ordhdr'" class="q-px-xl">
              <b>Order Headers </b><br />
              <vue-csv-import
                v-model="csvfile"
                :fields="{
                  ord_id: { required: true, label: 'ord_id' },
                  ord_num: { required: true, label: 'ord_num' },
                  ord_name: { required: true, label: 'ord_name' },
                  ord_createAt: { required: true, label: 'ord_createAt' },
                  ord_updateAt: { required: true, label: 'ord_updateAt' },
                  ord_closeAt: { required: true, label: 'ord_closeAt' },
                  ord_amtTotal: { required: true, label: 'ord_amtTotal' },
                  ord_amtDisc: { required: true, label: 'ord_amtDisc' },
                  ord_amtTax: { required: true, label: 'ord_amtTax' },
                  ord_amtShip: { required: true, label: 'ord_amtShip' },
                  ord_amtRefund: { required: true, label: 'ord_amtRefund' },
                  ord_payAmt: { required: true, label: 'ord_payAmt' },
                  ord_payMeth: { required: true, label: 'ord_payMeth' },
                  ord_payType: { required: true, label: 'ord_payType' },
                  ord_payGate: { required: true, label: 'ord_payGate' },
                  ord_payRef: { required: true, label: 'ord_payRef' },
                  cus_id: { required: true, label: 'cus_id' },
                  cus_fname: { required: true, label: 'cus_fname' },
                  cus_lname: { required: true, label: 'cus_lname' },
                  ord_status: { required: true, label: 'ord_status' },
                  ord_cancelAt: { required: true, label: 'ord_cancelAt' },
                }"
              >
                <vue-csv-toggle-headers />
                <vue-csv-errors />
                <vue-csv-input />
                <vue-csv-map />
              </vue-csv-import>
            </div>

            <div v-if="selected.value == 'orditm'" class="q-px-xl">
              <b >Order Lines</b><br />
              <vue-csv-import
                v-model="csvfile"
                :fields="{
                  ord_id: { required: true, label: 'ord_id' },
                  ord_num: { required: true, label: 'ord_num' },
                  orl_id: { required: true, label: 'orl_id' },
                }"
              >
                <vue-csv-toggle-headers />
                <vue-csv-errors />
                <vue-csv-input />
                <vue-csv-map />
              </vue-csv-import>
            </div>
          </div>
        </div>
    <div class="q-px-xl">
            <q-select
                  v-model="company"
                  label="Company"
                  options-dense
                  :options="companies"
                  dense
                />
      <q-space />
    </div>
          <div v-if="csvfile" class="q-mx-sm q-pb-xl">
             <q-table
              class="q-ma-xl"
              v-if="selected.value == 'ordhdr'"
              flat
              title="Import Preview"
              :rows="csvfile"
              row-key="ord_id"
              :pagination="{ rowsPerPage: 25 }"
              :rows-per-page-options="[25, 50, 100]"
            >
              <template v-slot:top>
                <h5>Import Preview</h5>
                <q-space/>
                <q-btn class=" no-shadow" color="blue-12" label="Import data" />
                <q-btn class="q-ml-xl no-shadow" color="blue-12" to="/display" label="Display Orders" />
              </template>
            </q-table>

            <q-table
              v-if="selected.value == 'orditm'"
              class="q-ma-xl"
              flat
              title="Import Preview"
              :rows="csvfile"
              row-key="ord_id"
              :pagination="{ rowsPerPage: 25 }"
              :rows-per-page-options="[25, 50, 100]"
            >
              <template v-slot:top>
                <h5>Import Preview</h5>
                <q-space/>
                <q-btn class=" no-shadow" color="blue-12" label="Import data" />
                <q-btn class="q-ml-xl no-shadow" color="blue-12" to="/display" label="Display Orders" />
              </template>
            </q-table>
          </div>


  </q-page>
</template>

<script>
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import {
  VueCsvToggleHeaders,
  VueCsvMap,
  VueCsvInput,
  VueCsvErrors,
  VueCsvImport,
} from "vue-csv-import";

import { defineComponent, ref, onMounted, computed } from "vue";
const { post, getById, update, list } = useApi();

export default defineComponent({
  name: "order",

  components: {
    VueCsvToggleHeaders,
    VueCsvMap,
    VueCsvInput,
    VueCsvErrors,
    VueCsvImport,
  },

  setup() {
    const { notifyError, notifySuccess } = useNotify();

    const allOrders = ref([]),
      company = ref(null),
      selected = ref(null),
      csvfile = ref(null),
      csvfiles = [
        {
          value: "ordhdr",
          label: "Order Header",
        },
        {
          value: "orditm",
          label: "Order Item",
        },
      ],
      companies = ["ABC"];
    onMounted(() => {
      getList();
    });
    const getList = async () => {
      try {
        allOrders.value = await list("ordhdr");
        console.log("all", allOrders.value);
      } catch (error) {
        notifyError(error.message);
      }
    };
    const onSubmit = () => {
      //   console.log("csv", csvfile.value);
      // sample test only to import ordhdr
      csvfile.value.forEach(async (row) => {
        console.log("Row:", `${row.ord_id} - ${row.ord_num}`);
      });
    };
    return {
      allOrders,
      onSubmit,
      company,
      selected,
      csvfile,
      csvfiles,
      companies,
    };
  },
});
</script>

<style scoped>
.card-height {
  height: 150px;
}
.background{
  background: #005AA7;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFDE4, #005AA7);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFDE4, #005AA7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.font-change{
  font-family: cursive;
}
</style>
