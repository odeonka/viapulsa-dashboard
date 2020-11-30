<template>
  <div
    class="min-vw-100 min-vh-100 position-fixed"
    style="top: 0; left: 0; background: rgba(0, 0, 0, 0.7); z-index: 99999"
  >
    <div class="bg-white w-75 mx-auto mt-5 p-3" style="border-radius: 8px">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <b-tabs
              active-nav-item-class="font-weight-bold text-uppercase text-primary"
              content-class="mt-3"
              fill
            >
              <b-tab title="Telkomsel" active>
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="text-center"><i class="icon-globe"></i></th>
                      <th>Minimal</th>
                      <th>Maksimal</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rate, index) in ratetsel" :key="index">
                      <td class="text-center align-middle">
                        <div class="avatar">
                          <img
                            class="img-avatar"
                            src="@/assets/img/provider/telkomsel-logo.png"
                            width="60px"
                          />
                        </div>
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.min) }}
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.max) }}
                      </td>
                      <td class="align-middle">
                        {{ rate.rate }}
                      </td>
                      <td class="align-middle">
                        <button
                          class="btn btn-primary mr-2"
                          type="button"
                          @click="editRate(rate)"
                        >
                          <i class="fa fa-edit"></i> Edit
                        </button>
                        <button
                          class="btn btn-outline-danger"
                          type="button"
                          @click="hapusRate(rate)"
                        >
                          <i class="fa fa-window-close"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-tab>
              <b-tab title="XL/Axis">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="text-center"><i class="icon-globe"></i></th>
                      <th>Minimal</th>
                      <th>Maksimal</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rate, index) in ratexlaxis" :key="index">
                      <td class="text-center align-middle">
                        <div class="avatar">
                          <img
                            class="img-avatar"
                            src="@/assets/img/provider/xlaxis-logo.png"
                            width="60px"
                          />
                        </div>
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.min) }}
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.max) }}
                      </td>
                      <td class="align-middle">
                        {{ rate.rate }}
                      </td>
                      <td class="align-middle">
                        <button
                          class="btn btn-primary mr-2"
                          type="button"
                          @click="editRate(rate)"
                        >
                          <i class="fa fa-edit"></i> Edit
                        </button>
                        <button
                          class="btn btn-outline-danger"
                          type="button"
                          @click="hapusRate(rate)"
                        >
                          <i class="fa fa-window-close"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-tab>
              <b-tab title="Indosat">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="text-center"><i class="icon-globe"></i></th>
                      <th>Minimal</th>
                      <th>Maksimal</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rate, index) in rateindosat" :key="index">
                      <td class="text-center align-middle">
                        <div class="avatar">
                          <img
                            class="img-avatar"
                            src="@/assets/img/provider/indosat-logo.png"
                            width="60px"
                          />
                        </div>
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.min) }}
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.max) }}
                      </td>
                      <td class="align-middle">
                        {{ rate.rate }}
                      </td>
                      <td class="align-middle">
                        <button
                          class="btn btn-primary mr-2"
                          type="button"
                          @click="editRate(rate)"
                        >
                          <i class="fa fa-edit"></i> Edit
                        </button>
                        <button
                          class="btn btn-outline-danger"
                          type="button"
                          @click="hapusRate(rate)"
                        >
                          <i class="fa fa-window-close"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-tab>
              <b-tab title="Three">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="text-center"><i class="icon-globe"></i></th>
                      <th>Minimal</th>
                      <th>Maksimal</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rate, index) in ratethree" :key="index">
                      <td class="text-center align-middle">
                        <div class="avatar">
                          <img
                            class="img-avatar"
                            src="@/assets/img/provider/three-logo.png"
                            width="60px"
                          />
                        </div>
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.min) }}
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.max) }}
                      </td>
                      <td class="align-middle">
                        {{ rate.rate }}
                      </td>
                      <td class="align-middle">
                        <button
                          class="btn btn-primary mr-2"
                          type="button"
                          @click="editRate(rate)"
                        >
                          <i class="fa fa-edit"></i> Edit
                        </button>
                        <button
                          class="btn btn-outline-danger"
                          type="button"
                          @click="hapusRate(rate)"
                        >
                          <i class="fa fa-window-close"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-tab>
              <b-tab title="Smartfren">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="text-center"><i class="icon-globe"></i></th>
                      <th>Minimal</th>
                      <th>Maksimal</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rate, index) in ratesmartfren" :key="index">
                      <td class="text-center align-middle">
                        <div class="avatar">
                          <img
                            class="img-avatar"
                            src="@/assets/img/provider/smartfren-logo.png"
                            width="60px"
                          />
                        </div>
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.min) }}
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.max) }}
                      </td>
                      <td class="align-middle">
                        {{ rate.rate }}
                      </td>
                      <td class="align-middle">
                        <button
                          class="btn btn-primary mr-2"
                          type="button"
                          @click="editRate(rate)"
                        >
                          <i class="fa fa-edit"></i> Edit
                        </button>
                        <button
                          class="btn btn-outline-danger"
                          type="button"
                          @click="hapusRate(rate)"
                        >
                          <i class="fa fa-window-close"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-tab>
              <b-tab title="VIP">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th class="text-center"><i class="icon-globe"></i></th>
                      <th>Minimal</th>
                      <th>Maksimal</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rate, index) in ratevip" :key="index">
                      <td class="text-center align-middle">
                        <div class="avatar">
                          <img
                            v-if="rate.provider.includes('telkomsel')"
                            class="img-avatar"
                            src="@/assets/img/provider/telkomsel-logo.png"
                            width="60px"
                          />
                          <img
                            v-if="rate.provider.includes('xlaxis')"
                            class="img-avatar"
                            src="@/assets/img/provider/xlaxis-logo.png"
                            width="60px"
                          />
                        </div>
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.min) }}
                      </td>
                      <td class="align-middle">
                        Rp. {{ formatNominal(rate.max) }}
                      </td>
                      <td class="align-middle">
                        {{ rate.rate }}
                      </td>
                      <td class="align-middle">
                        <button
                          class="btn btn-primary mr-2"
                          type="button"
                          @click="editRate(rate)"
                        >
                          <i class="fa fa-edit"></i> Edit
                        </button>
                        <button
                          class="btn btn-outline-danger"
                          type="button"
                          @click="hapusRate(rate)"
                        >
                          <i class="fa fa-window-close"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-tab>
            </b-tabs>
          </div>
          <div class="col-4">
            <div class="card">
              <div class="card-header">Tambah</div>
              <div class="card-body" v-if="!addsaving">
                <select
                  class="form-control form-control"
                  v-model="addProvider"
                  name="operator"
                >
                  <option value="telkomsel">Telkomsel</option>
                  <option value="xlaxis">XL/AXIS</option>
                  <option value="indosat">Indonsat</option>
                  <option value="three">Three</option>
                  <option value="smartfren">Smartfren</option></select
                ><br />
                <input
                  class="form-control form-control"
                  type="number"
                  name="min"
                  v-model="addMin"
                  placeholder="minimal (eg. 25000)"
                /><br />
                <input
                  class="form-control form-control"
                  type="number"
                  name="max"
                  v-model="addMax"
                  placeholder="maksimal (eg. 99999)"
                /><br />
                <input
                  class="form-control form-control"
                  type="number"
                  name="rate"
                  v-model="addcRate"
                  placeholder="rate (eg. 0.8)"
                /><br />
                <button
                  class="form-control form-control btn btn-primary"
                  @click="addRate()"
                >
                  <font-awesome-icon
                    icon="check"
                    :style="{ color: 'white', marginRight: '12px' }"
                  />Tambahkan
                </button>
              </div>
              <div class="card-body" v-else>
                <div class="mt-3">
                  <orbit-spinner
                    :animation-duration="1200"
                    :size="55"
                    color="#ff1d5e"
                    style="margin: auto"
                  />
                  <p
                    class="font-italic font-weight-bold small mt-4 text-center"
                  >
                    Sedang menyimpan...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--======= /.edit button-->
    <transition name="fade">
      <div class="modal shadow fade show d-block" v-if="activ" role="dialog">
        <div class="modal-dialog modal-primary" role="document">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h6 class="modal-title">
                Edit Nominal {{ activerate.provider }}
              </h6>
              <button class="close" type="button" @click="activ = false">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body" v-if="!saving">
              <label class="text-muted" for="min">Minimal</label>
              <input
                class="form-control form-control-lg"
                type="number"
                name="min"
                id="min"
                v-model="activerate.min"
              /><br />
              <label class="text-muted" for="min">Maksimal</label>
              <input
                class="form-control form-control-lg"
                type="number"
                name="max"
                id="max"
                v-model="activerate.max"
              /><br />
              <label class="text-muted" for="min">Rate</label>
              <input
                class="form-control form-control-lg"
                type="number"
                name="rate"
                id="rate"
                v-model="activerate.rate"
              /><br />
            </div>
            <div
              class="modal-body justify-content-center d-flex py-5"
              v-if="saving"
            >
              <div class="mt-3">
                <orbit-spinner
                  :animation-duration="1200"
                  :size="55"
                  color="#ff1d5e"
                  style="margin: auto"
                />
                <p class="font-italic font-weight-bold small mt-4">
                  Sedang menyimpan...
                </p>
              </div>
            </div>
            <div class="modal-footer" v-if="!saving">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="activ = false"
              >
                Batal
              </button>
              <button class="btn btn-success" @click="saveEdit()">
                Simpan
              </button>
            </div>
          </div>
          <!-- /.modal-content-->
        </div>
        <!-- /.modal-dialog-->
      </div>
    </transition>
    <!-- /.modal edit button-->

    <!--------------------------- /.modal delete button------------------------->
    <transition name="fade">
      <div class="modal fade shadow show d-block" v-if="hapus" role="dialog">
        <div class="modal-dialog modal-danger" role="document">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h4 class="modal-title">Hapus?</h4>
              <button class="close" type="button" @click="hapus = false">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body" v-if="!deleting">
              <h5>Min: {{ formatNominal(activerate.min) }}</h5>
              <h5>Max: {{ formatNominal(activerate.max) }}</h5>
              <h5>Rate: {{ activerate.rate }}</h5>
            </div>
            <div
              class="modal-body justify-content-center d-flex py-5"
              v-if="deleting"
            >
              <div class="mt-3">
                <orbit-spinner
                  :animation-duration="1200"
                  :size="55"
                  color="#ff1d5e"
                  style="margin: auto"
                />
                <p class="font-italic font-weight-bold small mt-4">
                  Sedang menghapus...
                </p>
              </div>
            </div>
            <div class="modal-footer" v-if="!deleting">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="hapus = false"
              >
                Batal
              </button>
              <button class="btn btn-danger" type="submit" @click="rateHapus()">
                Hapus
              </button>
            </div>
          </div>
          <!-- /.modal-content-->
        </div>
        <!-- /.modal-dialog-->
      </div>
    </transition>
    <!-- /.modal-->
  </div>
</template>

<script>
//import firebase from 'firebase'
import { OrbitSpinner } from "epic-spinners";
import { db } from "../../main";

export default {
  name: "Rate",
  components: {
    OrbitSpinner,
  },
  data: () => {
    return {
      rates: null,
      activ: false,
      saving: false,
      hapus: false,
      deleting: false,
      activerate: {
        id: null,
        provider: null,
        min: null,
        max: null,
        rate: null,
      },
      //add rate,
      addProvider: null,
      addMin: null,
      addMax: null,
      addcRate: null,
      addsaving: false,
    };
  },
  methods: {
    formatNominal(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    editRate(rate) {
      this.activerate = rate;
      this.activ = true;
    },
    hapusRate(rate) {
      this.activerate = rate;
      this.hapus = true;
    },
    emptyActive() {
      (this.activerate.provider = null),
        (this.activerate.min = null),
        (this.activerate.max = null),
        (this.activerate.rate = null);
    },
    addRate() {
      var vm = this;
      if (
        this.addProvider != null &&
        this.addMin != null &&
        (this.addMax != null) & (this.addcRate != null)
      ) {
        vm.addsaving = true;
        var DocRef = db.collection("rateconvert").doc();
        DocRef.set({
          provider: vm.addProvider,
          min: parseInt(vm.addMin),
          max: parseInt(vm.addMax),
          rate: parseFloat(vm.addcRate),
        }).then(function () {
          //console.log('added')
          vm.addsaving = false;
        });
      }
    },
    saveEdit() {
      console.log(this.activerate.max);
      this.saving = true;
      var vm = this;
      var data = db
        .collection("rateconvert")
        .where("id", "==", this.activerate.id);
      data.get().then(function (qSnap) {
        qSnap.forEach(function (doc) {
          console.log(doc.id);
          db.collection("rateconvert")
            .doc(doc.id)
            .update({
              min: parseInt(vm.activerate.min),
              max: parseInt(vm.activerate.max),
              rate: parseFloat(vm.activerate.rate),
            })
            .then(function () {
              vm.activ = false;
              vm.saving = false;
            })
            .catch(function () {
              //console.error('Error : ', error)
              vm.saving = false;
            });
        });
      });
    },
    rateHapus() {
      var vm = this;
      this.deleting = true;
      var data = db
        .collection("rateconvert")
        .where("min", "==", this.activerate.min)
        .where("max", "==", this.activerate.max)
        .limit(1);
      data.get().then(function (snap) {
        snap.forEach(function (doc) {
          db.collection("rateconvert")
            .doc(doc.id)
            .delete()
            .then(function () {
              //console.log('Berhasil dihapus')
              vm.hapus = false;
              vm.deleting = false;
            });
        });
      });
    },
  },
  computed: {
    ratetsel: function () {
      return this.rates.filter(function (rate) {
        return rate.provider == "telkomsel";
      });
    },
    ratexlaxis: function () {
      return this.rates.filter(function (rate) {
        return rate.provider == "xlaxis";
      });
    },
    rateindosat: function () {
      return this.rates.filter(function (rate) {
        return rate.provider == "indosat";
      });
    },
    ratethree: function () {
      return this.rates.filter(function (rate) {
        return rate.provider == "three";
      });
    },
    ratesmartfren: function () {
      return this.rates.filter(function (rate) {
        return rate.provider == "smartfren";
      });
    },
    ratevip: function () {
      return this.rates.filter(function (rate) {
        return rate.provider.includes("vip");
      });
    },
  },
  firestore() {
    return {
      rates: db.collection("rateconvert").orderBy("min", "asc"),
    };
  },
};
</script>