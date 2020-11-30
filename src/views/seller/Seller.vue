<template>
  <div>
    <div class="sidebartrx" style="font-size:14px">
      <div class="sidehead">
        <div class="avatar"><img src="@/assets/logo.png" width="100%"></div>
        <div class="displayName">{{userEmail}}</div>
      </div>
      <div class="typetransaksi d-flex">
        <button class="btn w-100 py-1 text-center rounded-0" :class="[displaylist == 'otw' ? 'btn-primary' : 'btn-outline-primary']" @click="displaylist = 'otw'">OTW</button>
        <button class="btn w-100 py-1 text-center rounded-0" :class="[displaylist == 'done' ? 'btn-primary' : 'btn-outline-primary']" @click="displaylist = 'done'">DONE</button>
        <button class="btn w-100 py-1 text-center rounded-0" :class="[displaylist == 'hidden' ? 'btn-primary' : 'btn-outline-primary']" @click="displaylist = 'hidden'">HIDDEN</button>
      </div>
      <div class="caritransaksi">
        <input id="inputcari" type="text" v-model="pencarian" placeholder="Cari data..."/>
        <div id="searchIcon"><font-awesome-icon icon="search" :style="{color: 'rgba(0,0,0,0.2)'}" /></div>
      </div>
      
      <!-- transaksi otw muncul disini -->
      <div v-if="displaylist == 'otw'" class="listTrx overflow-auto position-relative" style="height: calc(100vh - 115px)">
        <div @click="displayTrx(trx)" :class="{ 'trxactive' : trx == activetrx}" class="position-relative itemTrx d-flex p-3" v-for="(trx, index) in ongoingTrxs" :key="index">
          <div class='mr-3'>
            <img v-if="trx.provider == 'indosat'" src="@/assets/img/provider/indosat-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomsel'" src="@/assets/img/provider/telkomsel-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'three'" src="@/assets/img/provider/three-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomselvip'" src="@/assets/img/provider/telkomselvip-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxisvip'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
          </div>
          <div>
            <div style="font-size:12px">{{trx.trx_id}}</div>
            <!-- index status -->
            <div v-if="trx.indexStatus == 0" style="font-size:12px">Minta nomor...</div>
            <div v-else-if="trx.indexStatus == 2" style="font-size:12px">Sudah upload bukti...</div>
            <div v-else-if="trx.indexStatus == 3" style="font-size:12px">Selesai...</div>
            <!-- end of index status -->
          </div>
          <div class="position-absolute badge badge-primary" style='right:8px; top:8px' v-if="trx.terbaca == false">new</div>
        </div>
      </div>

      <!-- transaksi selesai muncul disini -->
      <div v-if="displaylist == 'done'" class="listTrx overflow-auto position-relative" style="height: calc(100vh - 115px)">
        <div @click="displayTrx(trx)" :class="{ 'trxactive' : trx == activetrx}" class="position-relative itemTrx d-flex p-3" v-for="(trx, index) in doneTrxs" :key="index">
          <div class='mr-3'>
            <img v-if="trx.provider == 'indosat'" src="@/assets/img/provider/indosat-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomsel'" src="@/assets/img/provider/telkomsel-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'three'" src="@/assets/img/provider/three-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomselvip'" src="@/assets/img/provider/telkomselvip-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxisvip'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
          </div>
          <div>
            <div style="font-size:12px">{{trx.trx_id}}</div>
          </div>
          <div class="position-absolute badge badge-primary" style='right:8px; top:8px' v-if="trx.terbaca == false">new</div>
        </div>
      </div>

      <!-- transaksi selesai muncul disini -->
      <div v-if="displaylist == 'hidden'" class="listTrx overflow-auto position-relative" style="height: calc(100vh - 115px)">
        <div @click="displayTrx(trx)" :class="{ 'trxactive' : trx == activetrx}" class="position-relative itemTrx d-flex p-3" v-for="(trx, index) in hiddenTrxs" :key="index">
          <div class='mr-3'>
            <img v-if="trx.provider == 'indosat'" src="@/assets/img/provider/indosat-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomsel'" src="@/assets/img/provider/telkomsel-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'three'" src="@/assets/img/provider/three-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomselvip'" src="@/assets/img/provider/telkomselvip-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxisvip'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
          </div>
          <div>
            <div style="font-size:12px">{{trx.trx_id}}</div>
          </div>
          <div class="position-absolute badge badge-primary" style='right:8px; top:8px' v-if="trx.terbaca == false">new</div>
        </div>
      </div>

    </div>
    <div class="topbar py-2 px-2 bg-white shadow d-flex justify-content-between">
      <label class="switch mb-0">
        <input id="switchstatus" type="checkbox" v-model="seller.status" @change="changeOnlineStatus(seller.status)">
        <span class="slider round"></span>
      </label>
      <div>
          <a @click="popMenu = false" v-if="popMenu" id="__BVID__20__BV_button_" aria-haspopup="true" aria-expanded="true" class="nav-link" style="cursor:pointer"><font-awesome-icon icon="times" /></a>
          <a @click="popMenu = true" v-if="!popMenu" id="__BVID__20__BV_button_" aria-haspopup="true" aria-expanded="true" class="nav-link" style="cursor:pointer"><font-awesome-icon icon="sliders-h" /></a>
          <transition name="swipeup">
            <div v-if="popMenu" class="dropdown-menu dropdown-menu-right p-0 m-2 show shadow border-top-8px" style="width:250px">
              <div class="dropdown-header dropdown-menu-lg text-center text-white border-top-8px" style="background:rgba(0,0,0,0.5)"><strong>Pengaturan</strong></div>

              <div style="cursor:pointer" @click="settings.hargajual = !settings.hargajual;popMenu = false" class="dropdown-item py-2 pr-5">
                <span><font-awesome-icon icon="exchange-alt" class="mr-3" />Harga Jual</span>
              </div>
              <!--<div style="cursor:pointer" role="menuitem" @click="settings.general = !settings.general;popMenu = false" class="dropdown-item py-2 pr-5">
                <span><font-awesome-icon icon="cog" class="mr-3" />Pengaturan</span>
              </div>-->
              <div style="cursor:pointer" role="menuitem" @click="logout()" class="dropdown-item py-2 pr-5">
                <span class="text-danger"><font-awesome-icon icon="sign-out-alt" class="mr-3" />Log Out</span>
              </div>
            </div>
          </transition>
      </div>
    </div>
    <div class="maintrx" v-if="activetrx.trx_id != null">
      <div class="mt-5"></div>
      <div v-if="activetrx.complete != true || displaylist == 'done'" class="row">
        <div class="infocard col-6 mb-2">
          <div class="card">
            <div class="card-body">
              <b-button variant='primary' @click="copyid('b-toaster-bottom-right', true, activetrx.trx_id)" class="btn btn-primary py-2 px-4" style="border-radius:100px"><font-awesome-icon icon="copy" :style="{color: 'white', marginRight:'16px'}" />Copy ID Transaksi</b-button>
            </div>
          </div>
        </div>
        <div class="datecard col-6 mb-2">
          <div class="card">
            <div class="card-body">
              <div class="font-weight-bold">{{formatDate(new Date(activetrx.created.seconds * 1000))}}</div>
              <div class="font-weight-bold">{{formatTime(new Date(activetrx.created.seconds * 1000))}}</div>
            </div>
          </div>
        </div>
        <div class="rekeningcard col-6">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Rekening Viapulsa</div>
              <div class="d-flex">
                <div class="mr-3">
                  <img v-if="activetrx.banktujuan.bank == 'BCA'" src="@/assets/img/bank/bank-bca.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'BNI'" src="@/assets/img/bank/bank-bni.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'BRI'" src="@/assets/img/bank/bank-bri.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'Mandiri'" src="@/assets/img/bank/bank-mandiri.png" alt="">

                  <img v-if="activetrx.banktujuan.bank == 'OVO'" src="@/assets/img/bank/ovo.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'GoPay'" src="@/assets/img/bank/gopay.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'LinkAja'" src="@/assets/img/bank/linkaja.png" width="100px" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'Dana'" src="@/assets/img/bank/dana.png" alt="">
                </div>
                <div>
                  <table>
                    <tr>
                      <td style="width:100px;">Bank</td>
                      <td class="font-weight-bold">{{activetrx.banktujuan.bank}}</td>
                    </tr>
                    <tr>
                      <td>Nomor</td>
                      <td class="font-weight-bold">{{activetrx.banktujuan.norek}}</td>
                    </tr>
                    <tr>
                      <td>Nama</td>
                      <td class="font-weight-bold">{{activetrx.banktujuan.atasnama}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="card mt-3">
            <div @click="notification('rekening')" class="report-wrong">Belum masuk?</div>
            <div class="card-body">
              <div class="card-title">Rekening Client/Pengirim</div>
              <div class="d-flex">
                <div class="mr-3">
                  <img v-if="activetrx.banktujuan.bank == 'BCA'" src="@/assets/img/bank/bank-bca.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'BNI'" src="@/assets/img/bank/bank-bni.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'BRI'" src="@/assets/img/bank/bank-bri.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'Mandiri'" src="@/assets/img/bank/bank-mandiri.png" alt="">

                  <img v-if="activetrx.banktujuan.bank == 'OVO'" src="@/assets/img/bank/ovo.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'GoPay'" src="@/assets/img/bank/gopay.png" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'LinkAja'" src="@/assets/img/bank/linkaja.png" width="100px" alt="">
                  <img v-if="activetrx.banktujuan.bank == 'Dana'" src="@/assets/img/bank/dana.png" alt="">
                </div>
                <div>
                  <table>
                    <tr>
                      <td style="width:100px;">Bank</td>
                      <td class="font-weight-bold">{{activetrx.konfirmasi.bank}}</td>
                    </tr>
                    <tr>
                      <td>Nomor</td>
                      <td class="font-weight-bold">{{activetrx.konfirmasi.norek}}</td>
                    </tr>
                    <tr>
                      <td>Nama</td>
                      <td class="font-weight-bold">{{activetrx.konfirmasi.atasnama}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="providercard col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Provider</div>
              <div class="d-flex">
                <div class="mr-3">
                  <img v-if="activetrx.provider == 'indosat'" src="@/assets/img/provider/indosat-logo.png" alt="">
                  <img v-if="activetrx.provider == 'telkomsel'" src="@/assets/img/provider/telkomsel-logo.png" alt="">
                  <img v-if="activetrx.provider == 'three'" src="@/assets/img/provider/three-logo.png" alt="">
                  <img v-if="activetrx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" alt="">
                  <img v-if="activetrx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" alt="">
                  <img v-if="activetrx.provider == 'telkomselvip'" src="@/assets/img/provider/telkomsel-logo.png" alt="">
                  <img v-if="activetrx.provider == 'xlaxisvip'" src="@/assets/img/provider/xlaxis-logo.png" alt="">
                </div>
                <div>
                  <table>
                    <tr>
                      <td style="width:100px;">Provider</td>
                      <td class="font-weight-bold">{{activetrx.provider}}</td>
                    </tr>
                    <tr>
                      <td>Nomor</td>
                      <td class="font-weight-bold">{{activetrx.nomor}}</td>
                    </tr>
                    <tr>
                      <td>Nominal</td>
                      <td class="font-weight-bold">{{formatNominal(activetrx.nominal)}}K</td>
                    </tr>
                    <tr>
                      <td>Harga</td>
                      <td class="font-weight-bold">{{formatNominal(activetrx.harga)}}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <b-button variant='primary' @click="copynomor('b-toaster-bottom-right', true, activetrx.nomor)" class="btn btn-primary py-2 px-4 mt-4" style="border-radius:100px"><font-awesome-icon icon="copy" :style="{color: 'white', marginRight:'16px'}" />Copy Nomor</b-button>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-body">
              <div class="card-title">Bukti Server</div>
              <progress id="progress" style="width:100%" :value="uploadValue" v-if="bukti_uploading" max="100" ></progress>
              <div v-if="activetrx.bukti_server == null && bukti_uploading == false">
                <img v-if="temp_buktiserver != null" :src="temp_buktiserver" width="100%">
                <div class="d-flex justify-content-between mt-3">
                  <div class='w-100 mr-2'><file-select v-model="buktiServer"></file-select></div>
                  <button @click="uploadBukti(activetrx.id)" class="btn btn-primary">Upload</button>
                </div>
              </div>
              <div v-else>
                <img :src=activetrx.bukti_server width="100%" alt="">
                <div v-if="temp_buktiserver != null || activetrx.bukti_server != null" class="mt-4 mb-2">Bukti salah? Upload ulang:</div>
                <div v-if="temp_buktiserver != null || activetrx.bukti_server != null" class="d-flex justify-content-between">
                  <div class='w-100 mr-2'><file-select v-model="buktiServer"></file-select></div>
                  <button @click="uploadBukti(activetrx.id)" class="btn btn-primary">Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card" style="height: calc(100vh - 32px)">
        <div class="row align-items-center" style="height: calc(100vh - 32px)">
            <div class="mx-auto">
                <div class="h-100 justify-content-center">
                    <div>
                      Transaksi Selesai~
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>

    <transition name="swipeup" v-if="activetrx.bukti_server != null">
      <div class="position-fixed" style="right:16px;bottom:16px">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">Tandai Transaksi Sudah Selesai?</div>
          <div class="card-body" style="font-size:14px">
            <p>ID: {{activetrx.trx_id}}</p>
            <p>Apakah transaksinya sudah selesai atau salah?</p>
            <div class="d-flex justify-content-end">
              <button @click="setAsSelesai()" class="btn btn-success">Selesai</button>
              <button @click="sembunyikanTrx()" class="btn btn-danger ml-3">Sembunyikan</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- notification wrong bukti -->
    <transition name="swipeup">
      <div v-if="sendnotif" class="position-fixed" style="width:400px;right:16px;bottom:16px">
        <div class="card shadow">
          <div class="card-header bg-danger text-white">Kirim notifikasi? <span class="close-notif" @click="sendnotif = false">x</span></div>
          <div class="card-body" style="font-size:14px">
            <p>Informasikan mengenai kesalahan pada bukti transfer.</p>
            <p>Kepada: <span class="font-weight-bold">{{activetrx.atasnama}}</span></p>
            <p>*nb: Jangan disembunyikan dulu ya</p>
            <div class="d-flex justify-content-end">
              <button @click="kirimNotif('bukti_error')" class="btn btn-danger">Kirim</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- notifgication pop -->
    <transition name="swipeup">
      <div v-if="notificationPop" class="position-fixed" style="width:400px;right:16px;bottom:16px">
        <div class="card shadow">
          <div class="card-header bg-danger text-white">Kirim notifikasi? <span class="close-notif" @click="notificationPop = false">x</span></div>
          <div class="card-body" style="font-size:14px">
            <p>Informasikan mengenai kesalahan pada {{notificationType}}.</p>
            <p>Kepada: <span class="font-weight-bold">{{activetrx.atasnama}}</span></p>
            <p>*nb: Jangan disembunyikan dulu ya</p>
            <div class="d-flex justify-content-end">
              <button @click="kirimNotif('rekening_error')" class="btn btn-danger">Kirim</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name='fade'>
      <div v-if="popMenu" @click="popMenu = false" id="blackscreen" class="min-vw-100 min-vh-100 position-fixed" style="top:0;left:0;background:rgba(0,0,0,0.7);z-index:999"></div>
    </transition>
    <transition name="fade">
        <hargajual v-if="settings.hargajual" />
    </transition>
    <transition name="fade">
        <generalsettings v-if="settings.general" />
    </transition>

    <transition name="fade">
      <div class="position-fixed" style="top:36px;right:calc(12.5vw - 24px);cursor:pointer;z-index:999999" @click="settings.hargajual = false; settings.general = false" v-if="settings.general || settings.hargajual">
        <span class="badge badge-danger p-3" style="border-radius:50px;line-height:6px;">x</span>
      </div>
    </transition>

    <transition name="fade">
      <div class="position-fixed d-flex justify-content-center" style="top:0;left:0;cursor:progress;z-index:999999;background:rgba(0,0,0,.75);width:100vw;height:100vh;flex-direction:column" v-if="updatingGuys">
        <div class="p-3 d-inline-block text-center">
          <span class="bg-white px-5 py-2" style="border-radius:4px">Loading...</span>
        </div>
      </div>
    </transition>

    <div>
      <textarea type="text" id="nomorcopy" v-model="activetrx.nomor"/>
      <input type="text" id="idcopy" v-model="activetrx.trx_id">
    </div>
  </div>
</template>

<script>
//import firebase from 'firebase'
import { db } from '../../main'
import axios from 'axios'
import firebase from 'firebase'
import moment from 'moment'
import generalsettings from '../settings/General'
import hargajual from '../settings/HargaJual'
import FileSelect from '../../elements/FileSelect'
const uuidv1 = require('uuid/v1')

export default {
  name: 'dashboardseller',
  components: {
    generalsettings,
    hargajual,
    FileSelect
  },
  data: () => {
    return {
      bukti_uploading: false,
      uploadValue: 0,
      temp_buktiserver: null,
      buktiServer: null,
      updatingGuys: false,
      sendnotif: false,
      notificationPop: false,
      notificationType: '',
      pencarian: '',
      displaylist: 'otw',
      settings: {
        general: false,
        hargajual: false
      },
      csready: false,
      seller: {
        status: false
      },
      popMenu: false,
      transaksi: [],
      countunread: [],
      oldcountread: 0,
      imagePopactive: false,
      nomCountPost: 0,
      activetrx: {
        buktitransfer: null,
        uid: null,
        id: null,
        trx_id: null,
        provider: null,
        created:{
          seconds:null
        },
        bank: null,
        norek: null,
        atasnama: null,
        
        bukti_server: null
      }
    }
  },
  created: function(){
    this.userEmail = firebase.auth().currentUser.email
  },
  methods: {
    notification(type){
      var vm = this
      if(type == 'rekening'){
        vm.notificationPop = true
        vm.notificationType = 'Rekening'
      }
    },
    formatNominal(value){
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    displayTrx: function(trx){
      this.sendnotif = false
      this.notificationPop = false
      this.nomCountPost = 0
      this.activetrx = trx

      if(trx.id != null){
        db.collection('trxpenjualan').doc(trx.id)
        .update({
          terbaca : true
        })
      } else {
        db.collection('trxpenjualan').where('trx_id', '==', trx.trx_id).get().then(function(docs){
          docs.docs.forEach((data) => {
            db.collection('trxpenjualan').doc(data.id)
            .update({
              terbaca : true
            })
          })
        })
      }
    },
    setAsSelesai(){
      var vm = this

      db.collection('trxpenjualan').doc(vm.activetrx.id)
      .update({
        status : 'complete'
      }).then(function(){
        var data = db.collection('users').doc(vm.activetrx.uid).collection('tokens').orderBy('createdAt', 'desc').limit(5)
        data.get().then(function(qSnap){
          qSnap.forEach(function(doc){
            //console.log(doc.data()['token'])
            if(doc.data()['token'] != null){
              var fcmheaders = {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAZW9MQS8:APA91bHcwFa-2LavyCHLjaY3Kbq9ew9JWoK_k_vZX-UUiCnMPZJCAGgU1rLsiQ-H_aZY-niqKrM3eoG13fjZdPFsw91ONFEd9jMqRFS_UNPWzyCmTeLr6XF2s52TG9y-MG7h72Iyjbp0'
              }
              var fcmbody = {
                "to": doc.data()['token'],
                "notification": {
                  "title": "Pulsa sudah diisi!",
                  "body": "Silahkan check pulsa-mu, apabila belum masuk hubungi CS kami."
                },
                "data": {
                  "title": "Pulsa sudah diisi!",
                  "body": "Silahkan check pulsa-mu, apabila belum masuk hubungi CS kami.",
                  "id" : vm.activetrx.id,
                  "provider" : vm.activetrx.provider,
                  "type" : 'beli_pulsa',
                  "click_action": "FLUTTER_NOTIFICATION_CLICK"
                }
              }
              axios.post('https://fcm.googleapis.com/fcm/send', fcmbody, {headers: fcmheaders})
            }
          })
        })
        vm.activetrx.trx_id = null
        vm.activetrx.bukti_server = null
        vm.temp_buktiserver = null
      })
    },
    playSound (){
      var sound = '../audio/notification.mp3';
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    changeOnlineStatus(oldstatus){
      this.updatingGuys = true
      var vm = this
      db.collection('users').doc(this.seller.userDocID)
      .update({
        status : oldstatus,
      })
      .then(function(){
        vm.updatingGuys = false
        //console.log('updated!');
      })
      .catch(function(){
        //console.error('Error : ', error)
      });
    },
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    formatDate(value){
      if (value) {
        return moment(String(value)).format('dddd, DD MMMM YYYY (hh:mm)')
      }
    },
    formatTime(value){
      if (value) {
        return moment(String(value)).fromNow()
      }
    },
    hideSettingsRate(){
      this.settings.rate = false
    },
    copynomor(toaster, append = false, rekening = null, namarek = null, bank = null) {
      this.$bvToast.toast(`Nomor: ${rekening}`, {
        title: `Berhasil dicopy!`,
        toaster: toaster,
        solid: true,
        appendToast: append,
        rekening: rekening,
        namarek: namarek,
        bank: bank,
        variant: 'info'
      });

      var copyText = document.getElementById("nomorcopy");
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
    },
    copyid(toaster, append = false, id = null) {
      this.$bvToast.toast(`ID: ${id}`, {
        title: `Berhasil dicopy!`,
        toaster: toaster,
        solid: true,
        appendToast: append,
        id: id,
        variant: 'info'
      });

      var copyText = document.getElementById("idcopy");
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
    },
    handleKey(event){
      if(event.key == 'ArrowUp' || event.key == 'ArrowDown'){
        event.preventDefault();
      }
    },
    sembunyikanTrx(){
      var vm = this
      db.collection('trxpenjualan').doc(vm.activetrx.id)
      .update({
        status : 'denied'
      }).then(() => {
        vm.activetrx.trx_id = null;
      })
      
    },
    kirimNotif(type){
      var vm = this
      var pesan = ''
      var title = ''
      if(type == 'bukti_error'){
        title = 'Kesalahan Bukti'
        pesan = 'Bukti transfer tidak sesuai, silahkan upload bukti ulang, dan pastikan benar.'
      } else if(type == 'rekening_error'){
        title = 'Kesalahan Rekening'
        pesan = 'Terdapat kesalahan nama/nomor rekening, silahkan update informasi rekening / hubungi CS kami.'
      }
      var data = db.collection('users').doc(vm.activetrx.uid).collection('tokens').orderBy('createdAt', 'desc').limit(1)
      data.get().then(function(qSnap){
        qSnap.forEach(function(doc){
          if(doc.data()['token'] != null){
            var fcmheaders = {
              'Content-Type': 'application/json',
              'Authorization': 'key=AAAAZW9MQS8:APA91bHcwFa-2LavyCHLjaY3Kbq9ew9JWoK_k_vZX-UUiCnMPZJCAGgU1rLsiQ-H_aZY-niqKrM3eoG13fjZdPFsw91ONFEd9jMqRFS_UNPWzyCmTeLr6XF2s52TG9y-MG7h72Iyjbp0'
            }
            var fcmbody = {
              "to": doc.data()['token'],
              "notification": {
                "title": title,
                "body": pesan
              },
              "data": {
                "title": title,
                "body": pesan,
                'type': type,
                "id" : vm.activetrx.id,
                "provider" : vm.activetrx.provider,
                "indexStatus" : '1',
                "click_action": "FLUTTER_NOTIFICATION_CLICK"
              }
            }
            axios.post('https://fcm.googleapis.com/fcm/send', fcmbody, {headers: fcmheaders})
            vm.nomor_updated = true
          }
        })
      }).then(function(){
        vm.sendnotif = false;
        vm.notificationPop = false;

        vm.$bvToast.toast(`Kepada: ${vm.activetrx.atasnama}`, {
          title: `Berhasil dikirim!`,
          toaster: 'b-toaster-bottom-right',
          solid: true,
          appendToast: true,
          name: name,
          variant: 'info'
        });
        
      });
    },
    uploadBukti(id){
      var re = /(?:\.([^.]+))?$/;
      var file = this.buktiServer;
      var namafile = uuidv1() + '.' + re.exec(file.name)[1];
      var vm = this
      this.bukti_uploading = true
      
      //save file to storage
      const storageRef = firebase.storage().ref('trxpenjualan/server/' + namafile).put(file);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture =url;
            vm.temp_buktiserver = url;
            vm.activetrx.bukti_server = url;
            
            var trxDataRef = db.collection('trxpenjualan').doc(id);
            return trxDataRef.update({
              bukti_server: url
            })
            .then(function(){
              vm.bukti_uploaded = true
              vm.bukti_uploading = false
            })
            .catch(function(error){
              console.error('Error : ', error)
            });
          })
      });
    },
  },
  mounted(){
    var vm = this
    db.collection('users').where('email', '==', firebase.auth().currentUser.email).get().then(function(user){
      vm.seller = user.docs[0].data()
    })
  },
  computed: {
    ongoingTrxs: function() {
      return this.transaksi.filter(trx => {
        return trx != null//trx.indexStatus != 4 && trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel != true
        ;
        
      })
    },
    doneTrxs() {
      return this.transaksi.filter(trx => {
        return trx.indexStatus == 4 && trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase())      
        ;
      })
    },
    hiddenTrxs: function() {
      return this.transaksi.filter(trx => {
        return trx.indexStatus != 4 && trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel == true
        ;
      })
    },
  },
  watch: {
    countunread: function(count) {
      //console.log("old: "+this.oldcountread+" = new: "+count.length)
      if(this.oldcountread <= count.length){
        //console.log('it is played')
        this.playSound()
        this.oldcountread = count.length
      } else {
        this.oldcountread = count.length
      }
      //console.log("old: "+this.oldcountread+" = new: "+count.length)
    }
  },
  firestore () {
    return {
      transaksi: db.collection('trxpenjualan').where('seller', '==', firebase.auth().currentUser.email).orderBy('created', 'desc').where('status', '==', 'confirm').limit(2000),
      countunread: db.collection('trxpenjualan').where('seller', '==', firebase.auth().currentUser.email).where('status', '==', 'confirm').where('terbaca', '==', false),
    }
  }
}
</script>