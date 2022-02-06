
<template>
  <q-page className="background">
    <h4 className=" no-margin q-pa-xl text-white text-center font-change">
      Order Details
    </h4>
    <q-form  @submit.prevent="datechecker">
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
        <q-input v-model="enddate" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" round color="primary">
              <q-popup-proxy
                ref="qDateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="enddate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="flex flex-center">
          <q-btn class="q-ma-lg text-white" label="Submit" type="submit"/>
        </div>
      </div>
    </q-form>
    <div class="q-pa-xl">
      <q-table
        v-if="datecheck"
        class="q-ma-xl"
        flat
        title="All Orders"
        :rows="display"
        row-key="ord_id"
        :pagination="{ rowsPerPage: 25 }"
        :rows-per-page-options="[25, 50, 100]"

      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                color="blue"
                round
                dense
                @click="comment=true"
                icon="chat_bubble_outline"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-dialog v-model="comment">
            <q-card class="q-pa-lg">
              <q-card-section>
                <q-input
                  model-value=""
                  v-model="commentValue"
                  label="Add your Comment"
                ></q-input>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import moment from "moment";

const { post, getById, update, list, createOrUpdate, customLogic, getByDate } =
  useApi();
export default {
  name: "displayOrder",

  setup() {
    const { notifyError, notifySuccess, showLoader, hideLoader } = useNotify();

    const companies = ref(["abc"]),
      datecheck=ref(false),
      selected = ref(""),
      enddate=ref(moment().format("YYYY/MM/DD")),
      startdate = ref(moment(enddate.value, "YYYY/MM/DD").subtract(7, 'days').format("YYYY/MM/DD")),
      display = ref([]),
      comment =ref(false),
      commentValue =ref("");

    const datechecker =async () => {
      try {
        datecheck.value=true;
        showLoader();
        display.value = await getByDate('ordhdr',startdate.value,enddate.value);
        hideLoader();
      } catch (error) {
        notifyError(error.message);
      }
    };
    return {
      companies,
      selected,
      startdate,
      display,
      comment,
      commentValue,
      enddate,
      datecheck,
      datechecker


    };
  },

};
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
.font-change {
  font-family: cursive;
}
</style>
