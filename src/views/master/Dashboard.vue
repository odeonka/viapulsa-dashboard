<template>
  <div>
    <div class="navbartop py-2 px-2 bg-white shadow d-flex justify-content-between">
      <div class="headinfo">
        <div class="ml-2 avatar"><img src="@/assets/logo.png" width="100%"></div>
        <div class="displayName">{{userEmail}}</div>
      </div>
      <div>
        <a @click="popMenu = false" v-if="popMenu" id="__BVID__20__BV_button_" aria-haspopup="true" aria-expanded="true" class="nav-link" style="cursor:pointer"><font-awesome-icon icon="times" /></a>
        <a @click="popMenu = true" v-if="!popMenu" id="__BVID__20__BV_button_" aria-haspopup="true" aria-expanded="true" class="nav-link" style="cursor:pointer"><font-awesome-icon icon="sliders-h" /></a>
        <transition name="swipeup">
          <div v-if="popMenu" class="dropdown-menu dropdown-menu-right p-0 m-2 show shadow border-top-8px" style="width:250px">
            <div class="dropdown-header dropdown-menu-lg text-center text-white border-top-8px" style="background:rgba(0,0,0,0.5)"><strong>Pengaturan</strong></div>
            <div style="cursor:pointer" @click="settings.rate = !settings.rate;popMenu = false" class="dropdown-item py-2 pr-5">
              <span><font-awesome-icon icon="exchange-alt" class="mr-3" />Rate</span>
            </div>
            <div style="cursor:pointer" role="menuitem" @click="settings.general = !settings.general;popMenu = false" class="dropdown-item py-2 pr-5">
              <span><font-awesome-icon icon="cog" class="mr-3" />Pengaturan</span>
            </div>
            <div style="cursor:pointer" role="menuitem" @click="logout()" class="dropdown-item py-2 pr-5">
              <span class="text-danger"><font-awesome-icon icon="sign-out-alt" class="mr-3" />Log Out</span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="container-fluid" style="margin-top:68px">
      <div class="row">
        <div class="col-md-6">
          <div>
            <line-chart :chart-data="datacollection" :options="chart.convert.options"></line-chart>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <line-chart :chart-data="datapulsa" :options="chart.nominal.options"></line-chart>
          </div>
        </div>
      </div>
    </div>
    
    <transition name='fade'>
      <div v-if="popMenu" @click="popMenu = false" id="blackscreen" class="min-vw-100 min-vh-100 position-fixed" style="top:0;left:0;background:rgba(0,0,0,0.7);z-index:999"></div>
    </transition>
    <transition name="fade">
        <rate v-if="settings.rate" />
    </transition>
    <transition name="fade">
        <generalsettings v-if="settings.general" />
    </transition>

    <transition name="fade">
      <div class="position-absolute" style="top:36px;right:calc(12.5vw - 16px);cursor:pointer;z-index:999999" @click="settings.rate = false; settings.general = false" v-if="settings.rate || settings.general">
        <span class="badge badge-danger p-3" style="border-radius:50px;line-height:6px;">x</span>
      </div>
    </transition>
  </div>
</template>

<script>
//import firebase from 'firebase'
import { db } from '../../main'
import firebase from 'firebase'
import moment from 'moment'
import rate from '../settings/Rate'
import generalsettings from '../settings/General'
import LineChart from '../../components/chart/LineChart'
import axios from 'axios'

export default {
  name: 'convertpulsa',
  components: {
    rate,
    generalsettings,
    LineChart
  },
  data: () => {
    return {
      userEmail: '',
      pencarian: '',
      settings: {
        general: false,
        rate: false,
      },
      csready: false,
      popMenu: false,
      datacollection: {
        datasets:[]
      },
      datapulsa: {
        datasets:[]
      },
      chart: {
        convert: {
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        },
        nominal: {
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        }
      }
    }
  },
  computed:{
    sukses(){
      return this.trxs.filter(data => {
        return data
      }

      )
    }
  },
  created: function(){
    this.userEmail = firebase.auth().currentUser.email
  },
  mounted(){
    this.getUsersCount();
  },
  methods: {
    getUsersCount(){
      var vm = this
      axios.get(
        'https://us-central1-convert-viapulsa.cloudfunctions.net/convertCount',
        ).then(snap => {
          vm.datacollection = {
            labels: [vm.defineDayName(snap.data.days.kemarin6), vm.defineDayName(snap.data.days.kemarin5), vm.defineDayName(snap.data.days.kemarin4), vm.defineDayName(snap.data.days.kemarin3), vm.defineDayName(snap.data.days.kemarin2), vm.defineDayName(snap.data.days.kemarin), vm.defineDayName(snap.data.days.hariini)],
            datasets: [
              {
                label: 'Total',
                backgroundColor: '#DBF3FF',
                data: [snap.data.total.kemarin6, snap.data.total.kemarin5, snap.data.total.kemarin4, snap.data.total.kemarin3, snap.data.total.kemarin2, snap.data.total.kemarin, snap.data.total.hariini]
              },
              {
                label: 'Sukses',
                borderColor: '#10AFFF',
                data: [snap.data.berhasil.kemarin6, snap.data.berhasil.kemarin5, snap.data.berhasil.kemarin4, snap.data.berhasil.kemarin3, snap.data.berhasil.kemarin2, snap.data.berhasil.kemarin, snap.data.berhasil.hariini]
              },
              {
                label: 'Telkomsel',
                borderColor: '#FF0000',
                data: [snap.data.telkomsel.kemarin6, snap.data.telkomsel.kemarin5, snap.data.telkomsel.kemarin4, snap.data.telkomsel.kemarin3, snap.data.telkomsel.kemarin2, snap.data.telkomsel.kemarin, snap.data.telkomsel.hariini]
              },
              {
                label: 'Indosat',
                borderColor: '#FFBF10',
                data: [snap.data.indosat.kemarin6, snap.data.indosat.kemarin5, snap.data.indosat.kemarin4, snap.data.indosat.kemarin3, snap.data.indosat.kemarin2, snap.data.indosat.kemarin, snap.data.indosat.hariini]
              },
              {
                label: 'XL/Axis',
                borderColor: '#AA11E2',
                data: [snap.data.xlaxis.kemarin6, snap.data.xlaxis.kemarin5, snap.data.xlaxis.kemarin4, snap.data.xlaxis.kemarin3, snap.data.xlaxis.kemarin2, snap.data.xlaxis.kemarin, snap.data.xlaxis.hariini]
              },
              {
                label: 'Three',
                borderColor: '#383838',
                data: [snap.data.three.kemarin6, snap.data.three.kemarin5, snap.data.three.kemarin4, snap.data.three.kemarin3, snap.data.three.kemarin2, snap.data.three.kemarin, snap.data.three.hariini]
              },
              {
                label: 'Smartfren',
                borderColor: '#383838',
                data: [snap.data.smartfren.kemarin6, snap.data.smartfren.kemarin5, snap.data.smartfren.kemarin4, snap.data.smartfren.kemarin3, snap.data.smartfren.kemarin2, snap.data.smartfren.kemarin, snap.data.smartfren.hariini]
              }
            ],
          },

          vm.datapulsa = {
            labels: [vm.defineDayName(snap.data.days.kemarin6), vm.defineDayName(snap.data.days.kemarin5), vm.defineDayName(snap.data.days.kemarin4), vm.defineDayName(snap.data.days.kemarin3), vm.defineDayName(snap.data.days.kemarin2), vm.defineDayName(snap.data.days.kemarin), vm.defineDayName(snap.data.days.hariini)],
            datasets: [
              {
                label: 'Pulsa Diterima',
                backgroundColor: '#DBF3FF',
                data: [snap.data.totalpulsa.kemarin6, snap.data.totalpulsa.kemarin5, snap.data.totalpulsa.kemarin4, snap.data.totalpulsa.kemarin3, snap.data.totalpulsa.kemarin2, snap.data.totalpulsa.kemarin, snap.data.totalpulsa.hariini]
              }
            ],
          }
        }
      )
    },
    defineDayName(dayInt){
      switch(dayInt){
        case 0:
          return 'Minggu'
        case 1:
          return 'Senin'
        case 2:
          return 'Selasa'
        case 3:
          return 'Rabu'
        case 4:
          return 'Kamis'
        case 5:
          return "Jum'at"
        case 6:
          return 'Sabtu'
      }
    },
    formatNominal(value){
      let val = (value/1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
    theCSis(email){
      return email.substring(0, email.indexOf('@')).toUpperCase();
    }
  },
  firestore () {
    return {
      cs: db.collection('users').where('email', '==', firebase.auth().currentUser.email),
      trxs: db.collection('trxconvert').where('indexStatus', '==', 4).orderBy('updated', "desc").limit(1500)
    }
  }
}
</script>