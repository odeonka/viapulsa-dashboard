<template>
  <div>
    <div
      class="navbartop py-2 px-2 bg-white shadow d-flex justify-content-between"
    >
      <div class="headinfo">
        <div class="ml-2 avatar">
          <img src="@/assets/logo.png" width="100%" />
        </div>
        <div class="displayName">{{ userEmail }}</div>
        <div class="ml-5">
          <router-link
            to="/analyst-ongoing"
            class="btn mr-2 btn-outline-primary"
            >Transaksi Belum Selesai 
            <font-awesome-icon icon="arrow-right" class="mr-2"
          /></router-link>
          <!--
          <button class="btn mr-2" :class="[activeData == 'convert' ? 'btn-primary' : 'btn-outline-primary']" @click="activeData = 'convert'"><font-awesome-icon icon="check" class="mr-2" />Convert</button>
          <button class="btn" :class="[activeData == 'sells' ? 'btn-primary' : 'btn-outline-primary']" @click="activeData = 'sells'" ><font-awesome-icon icon="check" class="mr-2" />Sells</button>-->
        </div>

        <div class="datarange d-flex ml-4">
          <datepicker
            v-model="startdate"
            input-class="form-control"
          ></datepicker>
          <div class="mx-2">-</div>
          <datepicker v-model="enddate" input-class="form-control"></datepicker>
        </div>
      </div>
      <div>
        <a
          @click="popMenu = false"
          v-if="popMenu"
          id="__BVID__20__BV_button_"
          aria-haspopup="true"
          aria-expanded="true"
          class="nav-link"
          style="cursor: pointer"
          ><font-awesome-icon icon="times"
        /></a>
        <a
          @click="popMenu = true"
          v-if="!popMenu"
          id="__BVID__20__BV_button_"
          aria-haspopup="true"
          aria-expanded="true"
          class="nav-link"
          style="cursor: pointer"
          ><font-awesome-icon icon="sliders-h"
        /></a>
        <transition name="swipeup">
          <div
            v-if="popMenu"
            class="dropdown-menu dropdown-menu-right p-0 m-2 show shadow border-top-8px"
            style="width: 250px"
          >
            <div
              class="dropdown-header dropdown-menu-lg text-center text-white border-top-8px"
              style="background: rgba(0, 0, 0, 0.5)"
            >
              <strong>Pengaturan</strong>
            </div>
            <div
              style="cursor: pointer"
              @click="
                settings.rate = !settings.rate;
                popMenu = false;
              "
              class="dropdown-item py-2 pr-5"
            >
              <span
                ><font-awesome-icon
                  icon="exchange-alt"
                  class="mr-3"
                />Rate</span
              >
            </div>
            <div
              style="cursor: pointer"
              role="menuitem"
              @click="
                settings.general = !settings.general;
                popMenu = false;
              "
              class="dropdown-item py-2 pr-5"
            >
              <span
                ><font-awesome-icon icon="cog" class="mr-3" />Pengaturan</span
              >
            </div>
             <div
              class="dropdown-item py-2 pr-5"
            >
            <span
                ><font-awesome-icon icon="search" class="mr-3" />
            <router-link target="_blank"  a href="analyst/pencariandataa" to="/analyst/pencariandataa">Pencarian Data</router-link>
            </span
              >
              </div>
              <div id="app">
  <button @click="myFunction()">Click Me</button>
</div>
            <!--<div
              style="cursor: pointer"
              role="menuitem"
              @click="
                settings.pencariandataa = !settings.pencariandataa;
                popMenu = false;
              "
              class="dropdown-item py-2 pr-5"
            >
              <span
                ><font-awesome-icon icon="search" class="mr-3" />Pencarian</span
              >
            </div>-->
            <div
              style="cursor: pointer"
              role="menuitem"
              @click="logout()"
              class="dropdown-item py-2 pr-5"
            >
              <span class="text-danger"
                ><font-awesome-icon icon="sign-out-alt" class="mr-3" />Log
                Out</span
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="rekaptable" style="font-size: 14px">
      <div class="mt-5"></div>
      <div class="card" style="height: calc(100vh - 32px)">
        <table class="table table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col" class="text-center">
                <font-awesome-icon icon="globe" />
              </th>
              <th scope="col">Nominal</th>
              <th scope="col">Rate</th>
              <th scope="col">Bank</th>
              <th scope="col">Rekening</th>
              <th scope="col">Nomor Cust</th>
              <th scope="col">Nomor CS</th>
              <th scope="col">Bukti Cust</th>
              <th scope="col">Bukti CS</th>
              <th scope="col">CS</th>
              <th scope="col">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trx, index) in filteredTrx" :key="index">
              <th>{{ trx.trx_id }}</th>
              <td class="bank">
                <img
                  v-if="trx.provider == 'indosat'"
                  src="@/assets/img/provider/indosat-logo.png"
                  alt=""
                />
                <img
                  v-if="trx.provider == 'telkomsel'"
                  src="@/assets/img/provider/telkomsel-logo.png"
                  alt=""
                />
                <img
                  v-if="trx.provider == 'three'"
                  src="@/assets/img/provider/three-logo.png"
                  alt=""
                />
                <img
                  v-if="trx.provider == 'smartfren'"
                  src="@/assets/img/provider/smartfren-logo.png"
                  alt=""
                />
                <img
                  v-if="trx.provider == 'xlaxis'"
                  src="@/assets/img/provider/xlaxis-logo.png"
                  alt=""
                />
              </td>
              <td>
                <div>{{ formatNominal(trx.nominal) }}</div>
                <div class="small text-white badge badge-primary">
                  {{ formatNominal(trx.nominal * trx.rate - trx.fee) }}
                </div>
              </td>
              <td>{{ trx.rate }}</td>
              <td class="bank">
                <img
                  v-if="trx.bank == 'BCA'"
                  src="@/assets/img/bank/bank-bca.png"
                  alt=""
                />
                <img
                  v-else-if="trx.bank == 'BNI'"
                  src="@/assets/img/bank/bank-bni.png"
                  alt=""
                />
                <img
                  v-else-if="trx.bank == 'BRI'"
                  src="@/assets/img/bank/bank-bri.png"
                  alt=""
                />
                <img
                  v-else-if="trx.bank == 'Mandiri'"
                  src="@/assets/img/bank/bank-mandiri.png"
                  alt=""
                />

                <img
                  v-else-if="trx.bank == 'OVO'"
                  src="@/assets/img/bank/ovo.png"
                  alt=""
                />
                <img
                  v-else-if="trx.bank == 'GoPay'"
                  src="@/assets/img/bank/gopay.png"
                  alt=""
                />
                <img
                  v-else-if="trx.bank == 'LinkAja'"
                  src="@/assets/img/bank/linkaja.png"
                  width="100px"
                  alt=""
                />
                <img
                  v-else-if="trx.bank == 'Dana'"
                  src="@/assets/img/bank/dana.png"
                  alt=""
                />
                <span v-else>{{ trx.bank }}</span>
              </td>
              <td>
                <div>{{ trx.norek }}</div>
                <div class="small text-secondary">{{ trx.atasnama }}</div>
              </td>
              <td>{{ trx.nomor }}</td>
              <td>{{ trx.nomor_server_0 }}</td>
              <td>
                <a
                  target="_blank"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_0"
                  class="btn btn-success"
                  >1</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_1 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_1"
                  class="btn btn-success"
                  >2</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_2 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_2"
                  class="btn btn-success"
                  >3</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_3 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_3"
                  class="btn btn-success"
                  >4</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_4 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_4"
                  class="btn btn-success"
                  >5</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_5 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_5"
                  class="btn btn-success"
                  >6</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_6 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_6"
                  class="btn btn-success"
                  >7</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_7 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_7"
                  class="btn btn-success"
                  >8</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_8 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_8"
                  class="btn btn-success"
                  >9</a
                >
                <a
                  target="_blank"
                  v-if="trx.bukti_client_9 != null"
                  style="margin: 2px 0"
                  type="button"
                  :href="trx.bukti_client_9"
                  class="btn btn-success"
                  >10</a
                >
              </td>
              <td>
                <a
                  target="_blank"
                  type="button"
                  :href="trx.bukti_server"
                  class="btn btn-success"
                  >A</a
                >
              </td>
              <td>{{ theCSis(trx.cs) }}</td>
              <td>{{ formatDate(new Date(trx.created.seconds * 1000)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="popMenu"
        @click="popMenu = false"
        id="blackscreen"
        class="min-vw-100 min-vh-100 position-fixed"
        style="top: 0; left: 0; background: rgba(0, 0, 0, 0.7); z-index: 999"
      ></div>
    </transition>
    <transition name="fade">
      <rate v-if="settings.rate" />
    </transition>
    <transition name="fade">
      <generalsettings v-if="settings.general" />
    </transition>
    <!-- Penambahan Pencarian Data -->
    <transition name="fade">
      <datapencarian v-if="settings.pencariandataa" />
    </transition>
    <!-- Penambahan Pencarian Data -->
    <transition name="fade">
      <div
        class="position-absolute"
        style="
          top: 36px;
          right: calc(12.5vw - 16px);
          cursor: pointer;
          z-index: 999999;"
        @click="
          settings.rate = false;
          settings.general = false;
          settings.pencariandataa = false;
        "
        v-if="settings.rate || settings.general || settings.pencariandataa"
      >
        <span
          class="badge badge-danger p-3"
          style="border-radius: 50px; line-height: 6px"
          >x</span
        >
      </div>
    </transition>

    <transition name="fade">
      <div
        class="position-fixed"
        style="bottom: 0px; right: 0; z-index: 999999"
      >
        <div>
          <div
            class="caritransaksi"
            style="
              box-shadow: #dcdcdc -4px -3px 6px 1px;
              border: 2px solid #c3c3c3;
              border-top-left-radius: 16px;
              background: white;
            "
          >
            <input
              id="inputcari"
              style="
                padding: 0 16px 0 36px;
                margin: 8px;
                width: calc(100% - 68px);
                border: none;
                height: 35px;
                border-radius: 50px;
                color: rgba(0, 0, 0, 0.5);
                font-weight: 600;
                letter-spacing: 1px;
              "
              type="text"
              v-model="pencarian"
              placeholder="Cari data..."
            />
            <div
              id="searchIcon position-absolute"
              style="position: absolute; top: 14px; left: 19px"
            >
              <font-awesome-icon
                icon="search"
                :style="{ color: 'rgba(0,0,0,0.2)' }"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
//import firebase from 'firebase'
import { db } from "../../main";
import firebase from "firebase";
import moment from "moment";
import rate from "../settings/Rate";
import generalsettings from "../settings/General";
import datapencarian from "../analyst/PencarianDataA";
import Datepicker from "vuejs-datepicker";

export default {
  name: "convertpulsa",
  components: {
    rate,
    generalsettings,
    datapencarian,
    Datepicker,
  },
  data: () => {
    return {
      userEmail: "",
      pencarian: "",
      activeData: "convert",
      settings: {
        general: false,
        rate: false,
      },
      myModel:false,
      csready: false,
      popMenu: false,
      transaksi: [],
      startdate: new Date(moment().subtract(7, "d").format("YYYY-MM-DD")),
      enddate: new Date(),
    };
  },
  created: function () {
    this.userEmail = firebase.auth().currentUser.email;
  },
  methods: {
     myFunction: function () {   
          window.open("analyst/datapencariana.vue", "_blank");    
      },
    formatNominal(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("dddd, DD MMMM YYYY (HH:MM)");
      }
    },
    formatTime(value) {
      if (value) {
        return moment(String(value)).fromNow();
      }
    },
    hideSettingsRate() {
      this.settings.rate = false;
    },
    theCSis(email) {
      return email.substring(0, email.indexOf("@")).toUpperCase();
    },
  },
  computed: {
    filteredTrx: function () {
      return this.transaksi.filter((trx) => {
        if (trx.norek != null) {
          return (
            (trx.indexStatus == 4 &&
              trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) &&
              trx.created.seconds >= this.startdate.getTime() / 1000 &&
              trx.created.seconds <= this.enddate.getTime() / 1000) ||
            (trx.indexStatus == 4 &&
              trx.atasnama
                .toLowerCase()
                .includes(this.pencarian.toLowerCase()) &&
              trx.created.seconds >= this.startdate.getTime() / 1000 &&
              trx.created.seconds <= this.enddate.getTime() / 1000) ||
            (trx.indexStatus == 4 &&
              trx.norek.toLowerCase().includes(this.pencarian.toLowerCase()) &&
              trx.created.seconds >= this.startdate.getTime() / 1000 &&
              trx.created.seconds <= this.enddate.getTime() / 1000) ||
            (trx.indexStatus == 4 &&
              trx.nomor.toLowerCase().includes(this.pencarian.toLowerCase()) &&
              trx.created.seconds >= this.startdate.getTime() / 1000 &&
              trx.created.seconds <= this.enddate.getTime() / 1000)
          );
        } else {
          return (
            (trx.indexStatus == 4 &&
              trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) &&
              trx.created.seconds >= this.startdate.getTime() / 1000 &&
              trx.created.seconds <= this.enddate.getTime() / 1000) ||
            (trx.indexStatus == 4 &&
              trx.atasnama
                .toLowerCase()
                .includes(this.pencarian.toLowerCase()) &&
              trx.created.seconds >= this.startdate.getTime() / 1000 &&
              trx.created.seconds <= this.enddate.getTime() / 1000) ||
            (trx.indexStatus == 4 &&
              trx.nomor.toLowerCase().includes(this.pencarian.toLowerCase()) &&
              trx.created.seconds >= this.startdate.getTime() / 1000 &&
              trx.created.seconds <= this.enddate.getTime() / 1000)
          );
        }
      });
    },
  },
  firestore() {
    return {
      transaksi: db
        .collection("trxconvert")
        .orderBy("created", "desc")
        .limit(4500),
      cs: db
        .collection("users")
        .where("email", "==", firebase.auth().currentUser.email),
    };
  },
};
</script>