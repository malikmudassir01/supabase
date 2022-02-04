<template>
  <q-page>
    <div class="row">
      <div class="col-3 q-pl-sm">
        <div class="q-my-lg">
          <q-select
            v-model="selected"
            :options="csvfiles"
            label="File Type"
            options-dense
            outlined
            dense
            class="q-pr-sm"
          />

          <div v-if="selected" class="text-caption">
            <div v-if="selected.value == 'ordhdr'">
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

            <div v-if="selected.value == 'orditm'">
              <b>Order Lines</b><br />
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
      </div>

      <div class="col-9 q-pr-sm q-py-md">
        <q-card>
          <q-form class="q-pa-sm" @submit.prevent="onSubmit">
            <div class="row">
              <div class="col-3">
                <q-select
                  v-model="company"
                  label="Company"
                  options-dense
                  :options="companies"
                  outlined
                  dense
                />
              </div>
              <q-space />
              <div class="col-4 text-right">
                <q-btn
                  v-if="csvfile && company"
                  label="Confirm Import Data"
                  color="primary"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
          <div v-if="csvfile" class="q-mx-sm q-pb-xl">
            <q-table
              v-if="selected.value == 'ordhdr'"
              flat
              title="Import Preview"
              :rows="csvfile"
              row-key="ord_id"
              :pagination="{ rowsPerPage: 25 }"
              :rows-per-page-options="[25, 50, 100]"
            />

            <q-table
              v-if="selected.value == 'orditm'"
              flat
              title="Import Preview"
              :rows="csvfile"
              row-key="ord_id"
              :pagination="{ rowsPerPage: 25 }"
              :rows-per-page-options="[25, 50, 100]"
            />
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { defineComponent, ref, onMounted, computed } from "vue";
const { post, getById, update, list } = useApi();
const { notifyError, notifySuccess } = useNotify();

export default defineComponent({
  name: "order",

  components: {},

  setup() {
    let allOrders = ref([]);
    onMounted(() => {
      getList();
    });
    const getList = async () => {
      try {
        allOrders = await list("ordhdr");
        console.log(allOrders);
      } catch (error) {
        notifyError(error.message);
      }
    };
    const onSubmit = () => {
      // sample test only to import ordhdr
      this.csvfile.forEach(async (row) => {
        console.log("Row:", `${row.ord_id} - ${row.ord_num}`);
      });
    };
    return {
      list: allOrders,
      onSubmit,
      company: ref(null),
      selected: ref(null),
      csvfile: ref(null),
      csvfiles: [
        {
          value: "ordhdr",
          label: "Order Header",
        },
        {
          value: "orditm",
          label: "Order Item",
        },
      ],
      companies: ["ABC"],
    };
  },
});
</script>

<style scoped>
.card-height {
  height: 150px;
}
</style>
