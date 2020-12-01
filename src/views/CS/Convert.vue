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
            <img v-else-if="trx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomselvip'" src="@/assets/img/provider/telkomselvip-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxisvip'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
          </div>
          <div>
            <div>{{titleCase(trx.atasnama)}}</div>
            <div style="font-size:12px">{{trx.trx_id}}</div>
            <!-- index status -->
            <div v-if="trx.indexStatus == 0" style="font-size:12px">Minta nomor...</div>
            <div v-else-if="trx.indexStatus == 2" style="font-size:12px">Sudah upload bukti...</div>
            <div v-else-if="trx.indexStatus == 3" style="font-size:12px">Selesai...</div>
            <!-- end of index status -->
          </div>
          <div class="position-absolute badge badge-primary" style='right:8px; top:8px' v-if="trx.terbaca == false">new</div>
          <div class="position-absolute badge badge-danger" style='right:8px; top:8px' v-if="trx.bukti_client_0 == null && parseInt(Date.now()/1000) - trx.time_nomor_cs.seconds> 900">expired</div>
        </div>
      </div>

      <!-- transaksi selesai muncul disini -->
      <div v-if="displaylist == 'done'" class="listTrx overflow-auto position-relative" style="height: calc(100vh - 115px)">
        <div @click="displayTrx(trx)" :class="{ 'trxactive' : trx == activetrx}" class="position-relative itemTrx d-flex p-3" v-for="(trx, index) in doneTrxs" :key="index">
          <div class='mr-3'>
            <img v-if="trx.provider == 'indosat'" src="@/assets/img/provider/indosat-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomsel'" src="@/assets/img/provider/telkomsel-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'three'" src="@/assets/img/provider/three-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomselvip'" src="@/assets/img/provider/telkomselvip-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxisvip'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
          </div>
          <div>
            <div>{{titleCase(trx.atasnama)}}</div>
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
            <img v-else-if="trx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'telkomselvip'" src="@/assets/img/provider/telkomselvip-logo.png" width="40px" alt="">
            <img v-else-if="trx.provider == 'xlaxisvip'" src="@/assets/img/provider/xlaxis-logo.png" width="40px" alt="">
          </div>
          <div>
            <div>{{titleCase(trx.atasnama)}}</div>
            <div style="font-size:12px">{{trx.trx_id}}</div>
          </div>
          <div class="position-absolute badge badge-primary" style='right:8px; top:8px' v-if="trx.terbaca == false">new</div>
        </div>
      </div>

    </div>
    <div class="topbar py-2 px-2 bg-white shadow d-flex justify-content-between">
      <label class="switch mb-0">
        <input id="switchstatus" type="checkbox" v-model="cs.status" @change="changeOnlineStatus(cs.status)">
        <span class="slider round"></span>
      </label>
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
              <div style="cursor:pointer" role="menuitem" @click="settings.pencariandata = !settings.pencariandata;popMenu = false" class="dropdown-item py-2 pr-5">
                <span><font-awesome-icon icon="search" class="mr-3" />Pencarian</span>
              </div>
              <div style="cursor:pointer" role="menuitem" @click="logout()" class="dropdown-item py-2 pr-5">
                <span class="text-danger"><font-awesome-icon icon="sign-out-alt" class="mr-3" />Log Out</span>
              </div>
            </div>
          </transition>
      </div>
    </div>
    <div class="maintrx" v-if="activetrx.trx_id">
      <div class="mt-5"></div>
      <div v-if="activetrx.indexStatus != 4 || displaylist == 'done'" class="row">
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
        <div class="providercard col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Provider</div>
              <div class="d-flex">
                <div class="mr-3">
                  <img v-if="activetrx.provider == 'indosat'" src="@/assets/img/provider/indosat-logo.png" alt="">
                  <img v-if="activetrx.provider == 'telkomsel'" src="@/assets/img/provider/telkomsel-logo.png" alt="">
                  <img v-if="activetrx.provider == 'three'" src="@/assets/img/provider/three-logo.png" alt="">
                  <img v-if="activetrx.provider == 'xlaxis'" src="@/assets/img/provider/xlaxis-logo.png" alt="">
                  <img v-if="activetrx.provider == 'smartfren'" src="@/assets/img/provider/smartfren-logo.png" alt="">
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
                    <tr v-if="activetrx.nomor2 != null">
                      <td>Nomor 2</td>
                      <td class="font-weight-bold">{{activetrx.nomor2}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor3 != null">
                      <td>Nomor 3</td>
                      <td class="font-weight-bold">{{activetrx.nomor3}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor4 != null">
                      <td>Nomor 4</td>
                      <td class="font-weight-bold">{{activetrx.nomor4}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor5 != null">
                      <td>Nomor 5</td>
                      <td class="font-weight-bold">{{activetrx.nomor5}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor6 != null">
                      <td>Nomor 6</td>
                      <td class="font-weight-bold">{{activetrx.nomor6}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor7 != null">
                      <td>Nomor 7</td>
                      <td class="font-weight-bold">{{activetrx.nomor7}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor8 != null">
                      <td>Nomor 8</td>
                      <td class="font-weight-bold">{{activetrx.nomor8}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor9 != null">
                      <td>Nomor 9</td>
                      <td class="font-weight-bold">{{activetrx.nomor9}}</td>
                    </tr>
                    <tr v-if="activetrx.nomor10 != null">
                      <td>Nomor 10</td>
                      <td class="font-weight-bold">{{activetrx.nomor10}}</td>
                    </tr>
                    <tr>
                      <td>Nominal</td>
                      <td class="font-weight-bold">{{formatNominal(activetrx.nominal)}}</td>
                    </tr>
                    <tr>
                      <td>Rate</td>
                      <td class="font-weight-bold">{{activetrx.rate}}</td>
                    </tr>
                    <tr>
                      <td>Biaya</td>
                      <td class="font-weight-bold">{{formatNominal(activetrx.fee)}}</td>
                    </tr>
                    <tr>
                      <td>Di terima</td>
                      <td class="font-weight-bold">{{formatNominal((activetrx.nominal * activetrx.rate - activetrx.fee).toFixed(0))}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rekeningcard col-6">
          <div class="card">
            <div @click="notification('rekening')" class="report-wrong">Rekening salah?</div>
            <div class="card-body">
              <div class="card-title">Rekening</div>
              <div class="d-flex">
                <div class="mr-3">
                  <img v-if="activetrx.bank == 'BCA'" src="@/assets/img/bank/bank-bca.png" alt="">
                  <img v-if="activetrx.bank == 'BNI'" src="@/assets/img/bank/bank-bni.png" alt="">
                  <img v-if="activetrx.bank == 'BRI'" src="@/assets/img/bank/bank-bri.png" alt="">
                  <img v-if="activetrx.bank == 'Mandiri'" src="@/assets/img/bank/bank-mandiri.png" alt="">

                  <img v-if="activetrx.bank == 'OVO'" src="@/assets/img/bank/ovo.png" alt="">
                  <img v-if="activetrx.bank == 'GoPay'" src="@/assets/img/bank/gopay.png" alt="">
                  <img v-if="activetrx.bank == 'LinkAja'" src="@/assets/img/bank/linkaja.png" width="100px" alt="">
                  <img v-if="activetrx.bank == 'Dana'" src="@/assets/img/bank/dana.png" alt="">
                </div>
                <div>
                  <table>
                    <tr>
                      <td style="width:100px;">Bank</td>
                      <td class="font-weight-bold">{{activetrx.bank}}</td>
                    </tr>
                    <tr>
                      <td>Nomor</td>
                      <td class="font-weight-bold">{{activetrx.norek}}</td>
                    </tr>
                    <tr>
                      <td>Nama</td>
                      <td class="font-weight-bold">{{titleCase(activetrx.atasnama)}}</td>
                    </tr>
                  </table>
                  <b-button variant='primary' @click="copyrekening('b-toaster-bottom-right', true, activetrx.norek)" class="btn btn-primary py-2 px-4 mt-4" style="border-radius:100px"><font-awesome-icon icon="copy" :style="{color: 'white', marginRight:'16px'}" />Copy Nomor Rekening</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nomorservcard col-5">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Nomor Server</div>
              <!-- nomor 01 --->
              <div class="d-flex">
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label" for="nomor_server_0">Nomor 01</label>
                    <input v-if="activetrx.nomor_server_0 == null" v-on:keydown="handleKey" v-model='nomor_server_0' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_0 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label" for="nomor_server_0">Nominal 01</label>
                    <input v-if="activetrx.nomor_server_0 == null && nomCountPost > 0" v-model='nominal_server_0' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-if="activetrx.nominal_server_0 == null && nomCountPost == 0" type="text" class="form-control" :value=formatNominal(activetrx.nominal) disabled>
                    <input v-if="activetrx.nominal_server_0 != null" type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_0) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 02 --->
              <div class="d-flex" v-if='nomCountPost > 0 || activetrx.nomor_server_1 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label" for="nomor_server_1">Nomor 02</label>
                    <input v-if="activetrx.nomor_server_1 == null" v-on:keydown="handleKey" v-model='nomor_server_1' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_1 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 02</label>
                    <input v-if="activetrx.nominal_server_1 == null" v-model='nominal_server_1' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_1) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 03 --->
              <div class="d-flex" v-if='nomCountPost > 1 || activetrx.nomor_server_2 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 03</label>
                    <input v-if="activetrx.nomor_server_2 == null" v-on:keydown="handleKey" v-model='nomor_server_2' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_2 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 03</label>
                    <input v-if="activetrx.nominal_server_2 == null" v-model="nominal_server_2" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_2) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 04 --->
              <div class="d-flex" v-if='nomCountPost > 2 || activetrx.nomor_server_3 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 04</label>
                    <input v-if="activetrx.nomor_server_3 == null" v-on:keydown="handleKey" v-model="nomor_server_3" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_3 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 04</label>
                    <input v-if="activetrx.nomor_server_3 == null" v-model="nominal_server_3" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_3) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 05 --->
              <div class="d-flex" v-if='nomCountPost > 3 || activetrx.nomor_server_4 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 05</label>
                    <input v-if="activetrx.nomor_server_4 == null" v-on:keydown="handleKey" v-model='nomor_server_4' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_4 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 05</label>
                    <input v-if="activetrx.nomor_server_4 == null" v-model="nominal_server_4" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_4) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 06 --->
              <div class="d-flex" v-if='nomCountPost > 4 || activetrx.nomor_server_5 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 06</label>
                    <input v-if="activetrx.nomor_server_5 == null" v-on:keydown="handleKey" v-model='nomor_server_5' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_5 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 06</label>
                    <input v-if="activetrx.nomor_server_5 == null" v-model="nominal_server_5" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_5) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 07 --->
              <div class="d-flex" v-if='nomCountPost > 5 || activetrx.nomor_server_6 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 07</label>
                    <input v-if="activetrx.nomor_server_6 == null" v-on:keydown="handleKey" v-model='nomor_server_6' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_6 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 07</label>
                    <input v-if="activetrx.nomor_server_6 == null" v-model="nominal_server_6" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_6) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 08 --->
              <div class="d-flex" v-if='nomCountPost > 6 || activetrx.nomor_server_7 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 08</label>
                    <input v-if="activetrx.nomor_server_7 == null" v-on:keydown="handleKey" v-model='nomor_server_7' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_7 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 08</label>
                    <input v-if="activetrx.nomor_server_7 == null" v-model="nominal_server_7" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_7) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 09 --->
              <div class="d-flex" v-if='nomCountPost > 7 || activetrx.nomor_server_8 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 09</label>
                    <input v-if="activetrx.nomor_server_8 == null" v-on:keydown="handleKey" v-model='nomor_server_8' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_8 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 09</label>
                    <input v-if="activetrx.nomor_server_8 == null" v-model="nominal_server_8" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_8) disabled>
                  </div>
                </div>
              </div>
              <!-- nomor 10 --->
              <div class="d-flex" v-if='nomCountPost > 8 || activetrx.nomor_server_9 != null'>
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 10</label>
                    <input v-if="activetrx.nomor_server_9 == null" v-on:keydown="handleKey" v-model='nomor_server_9' type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=activetrx.nomor_server_9 disabled>
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width:120px">
                    <label class="font-label">Nominal 10</label>
                    <input v-if="activetrx.nomor_server_9 == null" v-model="nominal_server_9" type="number" class="form-control" :disabled=nomor_updated>
                    <input v-else type="text" class="form-control" :value=formatNominal(activetrx.nominal_server_9) disabled>
                  </div>
                </div>
              </div>

              <div v-if='activetrx.nomor_server_0 == null' class="d-flex justify-content-between mt-4">
                <div><button @click="addNomServCol()" class="btn btn-outline-primary">+</button></div>
                <div><button class="btn btn-primary" @click="updateNomorServer()"><font-awesome-icon icon="save" :style="{color: 'white', marginRight: '12px'}" />Simpan</button></div>
              </div>
            </div>
          </div>

          <div v-if='activetrx.indexStatus > 1' class="card mt-4">
            <div class="card-body">
              <div class="card-title">Bukti Server</div>
              <progress id="progress" style="width:100%" :value="uploadValue" v-if="bukti_uploading" max="100" ></progress>
              <div v-if="activetrx.bukti_server == null && bukti_uploading == false">
                <img v-if="temp_buktiserver != null" :src="temp_buktiserver" width="100%">
                <div class="d-flex justify-content-between mt-3">
                  <div class='w-100 mr-2'><file-select v-model="buktiServer"></file-select></div>
                  <button @click="uploadBukti(activetrx.TrxDocID)" class="btn btn-primary">Upload</button>
                </div>
              </div>
              <div v-else>
                <img :src=activetrx.bukti_server width="100%" alt="">
                <div v-if="temp_buktiserver != null || activetrx.bukti_server != null" class="mt-4 mb-2">Bukti salah? Upload ulang:</div>
                <div v-if="temp_buktiserver != null || activetrx.bukti_server != null" class="d-flex justify-content-between">
                  <div class='w-100 mr-2'><file-select v-model="buktiServer"></file-select></div>
                  <button @click="uploadBukti(activetrx.TrxDocID)" class="btn btn-primary">Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='activetrx.nomor_server_0 != null' class="bukticlientcard col-7">
          <div class="card">
            <div @click="sendnotif = true" class="report-wrong">Bukti salah?</div>
            <div class="card-body">
              <div class="card-title">Bukti Client</div>
              <div class="d-flex">
                <div @click="showImage(activetrx.bukti_client_0)"><img :src=activetrx.bukti_client_0 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_1)"><img :src=activetrx.bukti_client_1 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_2)"><img :src=activetrx.bukti_client_2 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_3)"><img :src=activetrx.bukti_client_3 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_4)"><img :src=activetrx.bukti_client_4 width="50%" alt=""></div>
              </div>
              <div class="d-flex">
                <div @click="showImage(activetrx.bukti_client_5)"><img :src=activetrx.bukti_client_5 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_6)"><img :src=activetrx.bukti_client_6 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_7)"><img :src=activetrx.bukti_client_7 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_8)"><img :src=activetrx.bukti_client_8 width="50%" alt=""></div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_9)"><img :src=activetrx.bukti_client_9 width="50%" alt=""></div>
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


    <!--image modal -->
    <div id="imagemodal" class="imageModal">
      <img style='z-index:20000' class="imageModal-content" :src=activeImage>
      <div class="vh-100 position-fixed" style="width:calc(100vw - 20px);top:0;left:0;z-index:-2" @click=showImage() id='bgcloser'></div>
    </div>

    <transition name="swipeup">
      <div v-if="activetrx.indexStatus == 3 || bukti_uploaded" class="position-fixed" style="right:16px;bottom:200px">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">Tandai Transaksi Sudah Selesai?</div>
          <div class="card-body" style="font-size:14px">
            <p>ID: {{activetrx.trx_id}}</p>
            <p>Pastikan semua data sudah benar ya.</p>
            <div class="d-flex justify-content-end">
              <button @click="setAsSelesai()" class="btn btn-success">YA</button>
            </div>
          </div>
        </div>
      </div>
    </transition>


    <transition name="swipeup">
      <div v-if="activetrx.trx_id != null && activetrx.bukti_client_0 == null && parseInt(Date.now()/1000) - activetrx.time_nomor_cs.seconds > 900 && activetrx.cancel != true || activetrx.indexStatus != 4 && activetrx.time_client_upload != null && activetrx.cancel != true" class="position-fixed" style="width:400px;right:16px;bottom:16px">
        <div class="card shadow">
          <div class="card-header bg-danger text-white">Sembunyikan transaksi ini?</div>
          <div class="card-body" style="font-size:14px">
            <p>ID: {{activetrx.trx_id}}</p>
            <div class="d-flex justify-content-end">
              <button @click="sembunyikanTrx()" class="btn btn-danger">Sembunyikan</button>
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
        <rate v-if="settings.rate" />
    </transition>
    <transition name="fade">
        <generalsettings v-if="settings.general" />
    </transition>
    <transition name="fade">
        <datapencarian v-if="settings.pencariandata" />
    </transition>

    <transition name="fade">
      <div class="position-fixed" style="top:36px;right:calc(12.5vw - 24px);cursor:pointer;z-index:999999" @click="settings.rate = false; settings.pencariandata = false; settings.general = false;" v-if="settings.rate || settings.pencariandata || settings.general">
        <!-- Tombol Keluar -->
        <span class="badge badge-danger p-3" style="border-radius:50px;line-height:6px;">x</span>
        <!-- Tombol Keluar -->
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
      <textarea type="text" id="rekeningcopy" v-model="copyrek"/>
      <input type="text" id="idcopy" v-model="activetrx.trx_id">
    </div>
  </div>
</template>

<script>
//import firebase from 'firebase'
import { db } from '../../main'
import axios from 'axios'
import firebase from 'firebase'
import JQuery from 'jquery'
import moment from 'moment'
let $ = JQuery
import FileSelect from '../../elements/FileSelect'
import rate from '../settings/Rate'
import generalsettings from '../settings/General'
import datapencarian from '../settings/PencarianData'
const uuidv1 = require('uuid/v1');

export default {
  name: 'convertpulsa',
  components: {
    FileSelect,
    rate,
    generalsettings,
    datapencarian
  },
  data: () => {
    return {
      updatingGuys: false,
      sendnotif: false,
      notificationPop: false,
      notificationType: '',
      pencarian: '',
      displaylist: 'otw',
      settings: {
        general: false,
        rate: false,
        pencariandata: false,
      },
      csready: false,
      cs: {
        status: false
      },
      popMenu: false,
      transaksi: [],
      countunread: [],
      oldcountread: 0,
      activeImage: null,
      buktiServer: null,
      imagePopactive: false,
      nomCountPost: 0,
      nomor_server_0: null,
      nomor_server_1: null,
      nomor_server_2: null,
      nomor_server_3: null,
      nomor_server_4: null,
      nomor_server_5: null,
      nomor_server_6: null,
      nomor_server_7: null,
      nomor_server_8: null,
      nomor_server_9: null,
      nominal_server_0: null,
      nominal_server_1: null,
      nominal_server_2: null,
      nominal_server_3: null,
      nominal_server_4: null,
      nominal_server_5: null,
      nominal_server_6: null,
      nominal_server_7: null,
      nominal_server_8: null,
      nominal_server_9: null,
      nomor_updated: false,
      bukti_uploaded: false,
      bukti_uploading: false,
      temp_buktiserver: null,
      bukti_upload_status: 'Upload',
      uploadValue: 0,
      copyrek: null,
      activetrx: {
        uid: null,
        TrxDocID: null,
        trx_id: null,
        provider: null,
        nomor: null,
        nomor2: null,
        nomor3: null,
        nomor4: null,
        nomor5: null,
        nomor6: null,
        nomor7: null,
        nomor8: null,
        nomor9: null,
        nomor10: null,
        nominal: null,
        fee: 0,
        rate: null,
        indexStatus: null,
        created:{
          seconds:null
        },
        time_nomor_cs:{
          seconds:null
        },

        bank: null,
        norek: null,
        atasnama: null,
        
        nomor_server_0: null,
        nomor_server_1: null,
        nomor_server_2: null,
        nomor_server_3: null,
        nomor_server_4: null,
        nominal_server_0: null,
        nominal_server_1: null,
        nominal_server_2: null,
        nominal_server_3: null,
        nominal_server_4: null,

        bukti_server: null,
        bukti_client_0: null,
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
      this.nomor_server_0 = null
      this.nomor_server_1 = null
      this.nomor_server_2 = null
      this.nomor_server_3 = null
      this.nomor_server_4 = null
      this.nomor_server_5 = null
      this.nomor_server_6 = null
      this.nomor_server_7 = null
      this.nomor_server_8 = null
      this.nomor_server_9 = null
      this.nominal_server_0 = null
      this.nominal_server_1 = null
      this.nominal_server_2 = null
      this.nominal_server_3 = null
      this.nominal_server_4 = null
      this.nominal_server_5 = null
      this.nominal_server_6 = null
      this.nominal_server_7 = null
      this.nominal_server_8 = null
      this.nominal_server_9 = null
      this.buktiServer = null
      this.nomor_updated = false
      this.bukti_uploaded = false
      this.uploadValue = 0
      this.temp_buktiserver = null

      if(trx.trxDocID != null){
        db.collection('trxconvert').doc(trx.TrxDocID)
        .update({
          terbaca : true
        })
      } else {
        db.collection('trxconvert').where('trx_id', '==', trx.trx_id).get().then(function(docs){
          docs.docs.forEach((data) => {
            db.collection('trxconvert').doc(data.id)
            .update({
              TrxDocID: data.id,
              terbaca : true
            })
          })
        })
      }
      this.copyrek = `Bank: ${this.activetrx.bank}\nAtas Nama: ${this.titleCase(this.activetrx.atasnama)}\nNomor Rekening: ${this.activetrx.norek}`
    },
    showImage: function(imgurl){
      if(imgurl != null){
        $('#imagemodal').css('display', 'block');
        this.activeImage = imgurl;
      } else {
        $('#imagemodal').css('display', 'none');
        this.activeImage = null;
      }
    },
    addNomServCol: function(){
      this.nomCountPost += 1;
    },
    updateNomorServer(){
      var vm = this
      if(this.nominal_server_0 == null){
        this.nominal_server_0 = this.activetrx.nominal.toString()
      }
      db.collection('trxconvert').doc(this.activetrx.TrxDocID)
      .update({
        nomor_server_0 : this.nomor_server_0,
        nomor_server_1 : this.nomor_server_1,
        nomor_server_2 : this.nomor_server_2,
        nomor_server_3 : this.nomor_server_3,
        nomor_server_4 : this.nomor_server_4,
        nomor_server_5 : this.nomor_server_5,
        nomor_server_6 : this.nomor_server_6,
        nomor_server_7 : this.nomor_server_7,
        nomor_server_8 : this.nomor_server_8,
        nomor_server_9 : this.nomor_server_9,
        nominal_server_0 : this.nominal_server_0,
        nominal_server_1 : this.nominal_server_1,
        nominal_server_2 : this.nominal_server_2,
        nominal_server_3 : this.nominal_server_3,
        nominal_server_4 : this.nominal_server_4,
        nominal_server_5 : this.nominal_server_5,
        nominal_server_6 : this.nominal_server_6,
        nominal_server_7 : this.nominal_server_7,
        nominal_server_8 : this.nominal_server_8,
        nominal_server_9 : this.nominal_server_9,
        indexStatus : 1,
        time_nomor_cs : new Date()
      })
      .then(function(){
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
                  "title": "CS Sudah kasih nomor!",
                  "body": "Silahkan transfer pulsamu ke nomor berikut."
                },
                "data": {
                  "title": "CS Sudah kasih nomor!",
                  "body": "Silahkan transfer pulsamu ke nomor berikut.",
                  "TrxDocID" : vm.activetrx.TrxDocID,
                  "provider" : vm.activetrx.provider,
                  "indexStatus" : '1',
                  "click_action": "FLUTTER_NOTIFICATION_CLICK"
                }
              }
              axios.post('https://fcm.googleapis.com/fcm/send', fcmbody, {headers: fcmheaders})
              vm.nomor_updated = true
            }
          })
        })
      })
      .catch(function(){
        //console.error('Error : ', error)
      });
    },
    uploadBukti(trxDocID){
      var re = /(?:\.([^.]+))?$/;
      var file = this.buktiServer;
      var namafile = uuidv1() + '.' + re.exec(file.name)[1];
      var vm = this
      this.bukti_uploading = true
      
      //save file to storage
      const storageRef = firebase.storage().ref('trxconvert/server/' + namafile).put(file);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture =url;
            vm.temp_buktiserver = url;
            
            var trxDataRef = db.collection('trxconvert').doc(trxDocID);
            return trxDataRef.update({
              indexStatus: 3,
              bukti_server: url
            })
            .then(function(){
              vm.nomor_updated = true
              vm.bukti_uploaded = true
              vm.bukti_uploading = false
            })
            .catch(function(error){
              console.error('Error : ', error)
            });
          })
      });
    },
    setAsSelesai(){
      var vm = this

      db.collection('trxconvert').doc(vm.activetrx.TrxDocID)
      .update({
        indexStatus : 4
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
                  "title": "Uang sudah ditransfer!",
                  "body": "Silahkan cek rekeningmu, apabila belum masuk hubungi CS kami."
                },
                "data": {
                  "title": "Uang sudah ditransfer!",
                  "body": "Silahkan cek rekeningmu, apabila belum masuk hubungi CS kami.",
                  "TrxDocID" : vm.activetrx.TrxDocID,
                  "provider" : vm.activetrx.provider,
                  "indexStatus" : '3',
                  "click_action": "FLUTTER_NOTIFICATION_CLICK"
                }
              }
              axios.post('https://fcm.googleapis.com/fcm/send', fcmbody, {headers: fcmheaders})
            }
          })
        })
        vm.activetrx.indexStatus = 4
        vm.bukti_uploaded = false
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
      db.collection('users').doc(this.cs.userDocID)
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
    copyrekening(toaster, append = false, rekening = null, namarek = null, bank = null) {
      this.$bvToast.toast(`Rekening: ${rekening}`, {
        title: `Berhasil dicopy!`,
        toaster: toaster,
        solid: true,
        appendToast: append,
        rekening: rekening,
        namarek: namarek,
        bank: bank,
        variant: 'info'
      });

      var copyText = document.getElementById("rekeningcopy");
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
      db.collection('trxconvert').doc(vm.activetrx.TrxDocID)
      .update({
        cancel : true
      }).then(() => {
        vm.activetrx.trx_id = null;
        vm.activetrx.time_client_upload = null;
      })
      
    },
    titleCase(str) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      return splitStr.join(' '); 
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
                "TrxDocID" : vm.activetrx.TrxDocID,
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
    }
  },
  mounted(){
    var vm = this
    db.collection('users').where('email', '==', firebase.auth().currentUser.email).get().then(function(user){
      vm.cs = user.docs[0].data()
    })
  },
  computed: {
    ongoingTrxs: function() {
      return this.transaksi.filter(trx => {
        if(trx.norek != null){
          return trx.indexStatus != 4 && trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel != true ||
                trx.indexStatus != 4 && trx.atasnama.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel != true ||
                trx.indexStatus != 4 && trx.norek.includes(this.pencarian) && trx.cancel != true ||
                trx.indexStatus != 4 && trx.nomor.includes(this.pencarian) && trx.cancel != true
          ;
        } else {
          return trx.indexStatus != 4 && trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel != true ||
                trx.indexStatus != 4 && trx.atasnama.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel != true ||
                trx.indexStatus != 4 && trx.nomor.includes(this.pencarian) && trx.cancel != true
          ;
        }
      })
    },
    doneTrxs() {
      return this.transaksi.filter(trx => {
        return trx.indexStatus == 4 && trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) ||
               trx.indexStatus == 4 && trx.atasnama.toLowerCase().includes(this.pencarian.toLowerCase()) ||
               trx.indexStatus == 4 && trx.norek.includes(this.pencarian) ||
               trx.indexStatus == 4 && trx.nomor.includes(this.pencarian)        
        ;
      })
    },
    hiddenTrxs: function() {
      return this.transaksi.filter(trx => {
        return trx.indexStatus != 4 && trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel == true ||
               trx.indexStatus != 4 && trx.atasnama.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel == true ||
               trx.indexStatus != 4 && trx.norek.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel == true ||
               trx.indexStatus != 4 && trx.nomor.toLowerCase().includes(this.pencarian.toLowerCase()) && trx.cancel == true
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
      transaksi: db.collection('trxconvert').where('cs', '==', firebase.auth().currentUser.email).orderBy('time_complete', 'desc').orderBy('created', 'desc').limit(2000),
      countunread: db.collection('trxconvert').where('cs', '==', firebase.auth().currentUser.email).where('terbaca', '==', false),
    }
  }
}
</script>