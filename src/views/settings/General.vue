<template>
  <div
    class="min-vw-100 min-vh-100 position-fixed"
    style="top: 0; left: 0; background: rgba(0, 0, 0, 0.7); z-index: 99999"
  >
    <div class="bg-white w-75 mx-auto mt-5 p-3" style="border-radius: 8px">
      <b-tabs
        active-nav-item-class="font-weight-bold text-uppercase text-primary"
        content-class="mt-3"
        fill
      >
        <b-tab title="Umum" active>
          <table
            class="table table-responsive-sm table-hover table-outline mb-0"
          >
            <thead class="thead-light">
              <tr>
                <th style="width: 55px"></th>
                <th>Pengaturan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="align-middle">
                  <font-awesome-icon
                    icon="wrench"
                    :style="{ color: 'rgba(0,0,0,0.5' }"
                    class="ml-2"
                  />
                </td>
                <td class="align-middle font-weight-bold">Maintenance Mode</td>
                <td class="align-middle">
                  <label class="switch mb-0">
                    <input
                      id="switchstatus"
                      type="checkbox"
                      v-model="maintenance.maintenance"
                      @change="maintenanceMode(maintenance.maintenance)"
                    />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="align-middle">Pesan Ketika Offline</td>
                <td>
                  <span
                    v-if="message.offline == null"
                    style="
                      width: calc(100% - 92px);
                      margin-right: 12px;
                      display: inline-block;
                    "
                    >loading...</span
                  >
                  <span
                    v-else-if="savingoffline == true"
                    style="
                      width: calc(100% - 92px);
                      margin-right: 12px;
                      display: inline-block;
                    "
                    >menyimpan...</span
                  >
                  <input
                    v-else
                    type="text"
                    style="width: calc(100% - 92px); margin-right: 12px"
                    maxlength="75"
                    v-model="message.offline"
                  />
                  <button
                    class="btn btn-primary"
                    style="font-size: 12px"
                    @click="setMessage(message.offline)"
                  >
                    Simpan
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Provider">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th style="width: 55px"></th>
                      <th>Provider</th>
                      <th>ON/OFF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/provider/indosat-logo.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">Indosat</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="indosat.status"
                            @change="
                              turnOff('providers', 'indosat', indosat.status)
                            "
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/provider/telkomsel-logo.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">Telkomsel</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="telkomsel.status"
                            @change="
                              turnOff(
                                'providers',
                                'telkomsel',
                                telkomsel.status
                              )
                            "
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/provider/three-logo.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">Three</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="three.status"
                            @change="
                              turnOff('providers', 'three', three.status)
                            "
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/provider/smartfren-logo.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">Smartfren</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="smartfren.status"
                            @change="
                              turnOff('providers', 'smartfren', smartfren.status)
                            "
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/provider/xlaxis-logo.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">XL/Axis</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="xlaxis.status"
                            @change="
                              turnOff('providers', 'xlaxis', xlaxis.status)
                            "
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Bank">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th style="width: 55px"></th>
                      <th>Bank</th>
                      <th>ON/OFF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/bank-bca.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">BCA</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="bca.status"
                            @change="turnOff('bank', 'BCA', bca.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/bank-bni.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">BNI</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="bni.status"
                            @change="turnOff('bank', 'BNI', bni.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/bank-bri.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">BRI</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="bri.status"
                            @change="turnOff('bank', 'BRI', bri.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/bank-mandiri.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">Mandiri</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="mandiri.status"
                            @change="turnOff('bank', 'Mandiri', mandiri.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-6">
                <table
                  class="table table-responsive-sm table-hover table-outline mb-0"
                >
                  <thead class="thead-light">
                    <tr>
                      <th style="width: 55px"></th>
                      <th>Bank</th>
                      <th>ON/OFF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/dana.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">Dana</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="dana.status"
                            @change="turnOff('bank', 'Dana', dana.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/gopay.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">GoPay</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="gopay.status"
                            @change="turnOff('bank', 'GoPay', gopay.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/linkaja.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">LinkAja</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="linkaja.status"
                            @change="turnOff('bank', 'LinkAja', linkaja.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img
                          src="@/assets/img/bank/ovo.png"
                          width="35px"
                          alt=""
                        />
                      </td>
                      <td class="align-middle font-weight-bold">OVO</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="ovo.status"
                            @change="turnOff('bank', 'OVO', ovo.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td class="align-middle">
                        <img height="35px" width="35px" alt="" />
                      </td>
                      <td class="align-middle font-weight-bold">Lainnya</td>
                      <td class="align-middle">
                        <label class="switch mb-0">
                          <input
                            id="switchstatus"
                            type="checkbox"
                            v-model="lainnya.status"
                            @change="turnOff('bank', 'Lainnya', lainnya.status)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </b-tab>

        <b-tab title="Distribution">
          <table
            class="table table-responsive-sm table-hover table-outline mb-0"
          >
            <thead class="thead-light">
              <tr>
                <th>CS</th>
                <th style="width: 78px">Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(csstat, index) in cscounter" :key="index">
                <td>
                  {{ csstat.email }}
                </td>
                <td class="d-flex justify-content-center text-center">
                  <span
                    class="indicator"
                    :class="[csstat.status ? 'bg-on' : 'bg-off']"
                    style="margin: auto"
                  ></span>
                </td>
                <td>({{ csstat.customers }})</td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="!reseting"
            @click="resetCSCounter()"
            class="btn btn-primary ml-2 mt-3"
          >
            Reset
          </div>
          <div v-else class="btn btn-secondary badge ml-2">loading...</div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { db } from "../../main";
export default {
  name: "General-Settings",
  data: () => {
    return {
      reseting: false,
      maintenance: {
        maintenance: false,
      },
      message: {
        offline: null,
      },
      savingoffline: false,

      //provider
      telkomsel: { status: false },
      indosat: { status: false },
      xlaxis: { status: false },
      three: { status: false },
      smartfren: { status: false },

      //bank
      bri: { status: false },
      bca: { status: false },
      bni: { status: false },
      mandiri: { status: false },
      ovo: { status: false },
      dana: { status: false },
      gopay: { status: false },
      linkaja: { status: false },
      lainnya: { status: false },
    };
  },
  methods: {
    maintenanceMode(set) {
      db.collection("settings")
        .doc("fgM8BnNndtCmSQsAR7N4")
        .update({
          maintenance: set,
        })
        .then(function () {
          //console.log('updated maintenance mode')
        });
    },
    turnOff(type, sub, statuse) {
      db.collection("settings")
        .doc(type)
        .collection(type)
        .doc(sub)
        .update({
          status: statuse,
        })
        .then(function () {
          //console.log('oke')
        });
    },
    setMessage(value) {
      var vm = this;
      this.savingoffline = true;
      db.collection("settings")
        .doc("message")
        .update({
          offline: value,
        })
        .then(function () {
          vm.savingoffline = false;
          console.log("success");
        });
    },
    resetCSCounter() {
      this.reseting = true;
      db.collection("users")
        .doc("K5oJ8Bxpy3LP5k3AeMnQ")
        .update({
          customers: 0,
        })
        .then(() => {
          db.collection("users")
            .doc("SbrGjEqPF6LOJ7q6HpCS")
            .update({
              customers: 0,
            })
            .then(() => {
              db.collection("users")
                .doc("waF07y9Bk19zGFDymgVw")
                .update({
                  customers: 0,
                })
                .then(() => {
                  db.collection("users")
                    .doc("GIoCLS3ztbETMH3ghdRY")
                    .update({
                      customers: 0,
                    })
                    .then(() => {
                      db.collection("users")
                        .doc("teiOVEliK0QVNInZsXRd")
                        .update({
                          customers: 0,
                        })
                        .then(() => {
                          db.collection("users")
                            .doc("sU8LdhBw4QYPX0KgEPuc")
                            .update({
                              customers: 0,
                            })
                            .then(() => {
                              this.reseting = false;
                            });
                        });
                    });
                });
            });
        });
    },
  },
  firestore() {
    return {
      maintenance: db.collection("settings").doc("fgM8BnNndtCmSQsAR7N4"),
      message: db.collection("settings").doc("message"),
      indosat: db
        .collection("settings")
        .doc("providers")
        .collection("providers")
        .doc("indosat"),
      telkomsel: db
        .collection("settings")
        .doc("providers")
        .collection("providers")
        .doc("telkomsel"),
      three: db
        .collection("settings")
        .doc("providers")
        .collection("providers")
        .doc("three"),
      xlaxis: db
        .collection("settings")
        .doc("providers")
        .collection("providers")
        .doc("xlaxis"),
      smartfren: db
        .collection("settings")
        .doc("providers")
        .collection("providers")
        .doc("smartfren"),

      bca: db.collection("settings").doc("bank").collection("bank").doc("BCA"),
      bni: db.collection("settings").doc("bank").collection("bank").doc("BNI"),
      bri: db.collection("settings").doc("bank").collection("bank").doc("BRI"),
      mandiri: db
        .collection("settings")
        .doc("bank")
        .collection("bank")
        .doc("Mandiri"),
      dana: db
        .collection("settings")
        .doc("bank")
        .collection("bank")
        .doc("Dana"),
      gopay: db
        .collection("settings")
        .doc("bank")
        .collection("bank")
        .doc("GoPay"),
      linkaja: db
        .collection("settings")
        .doc("bank")
        .collection("bank")
        .doc("LinkAja"),
      ovo: db.collection("settings").doc("bank").collection("bank").doc("OVO"),
      lainnya: db
        .collection("settings")
        .doc("bank")
        .collection("bank")
        .doc("Lainnya"),
      cscounter: db
        .collection("users")
        .where("type", "==", "cs")
        .orderBy("email", "asc"),
    };
  },
};
</script>