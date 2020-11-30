<template>
  <div>
    <div class="sidebartrx" style="font-size: 14px">
      <div class="sidehead">
        <div class="avatar"><img src="@/assets/logo.png" width="100%" /></div>
        <div class="displayName">{{ userEmail }}</div>
      </div>
      <div class="typetransaksi d-flex">
        <button
          class="btn w-100 py-1 text-center rounded-0"
          :class="[
            displaylist == 'otw' ? 'btn-primary' : 'btn-outline-primary',
          ]"
          @click="displaylist = 'otw'"
        >
          OTW 
        </button>
        <button
          class="btn w-100 py-1 text-center rounded-0"
          :class="[
            displaylist == 'done' ? 'btn-primary' : 'btn-outline-primary',
          ]"
          @click="displaylist = 'done'"
        >
          DONE
        </button>
      </div>
      <div class="caritransaksi">
        <input
          id="inputcari"
          type="text"
          v-model="pencarian"
          placeholder="Cari data..."
        />
        <div id="searchIcon">
          <font-awesome-icon
            icon="search"
            :style="{ color: 'rgba(0,0,0,0.2)' }"
          />
        </div>
      </div>

      <!-- transaksi otw muncul disini -->
      <div
        v-if="displaylist == 'otw'"
        class="listTrx overflow-auto position-relative"
        style="height: calc(100vh - 115px)"
      >
        <div
          @click="displayTrx(trx)"
          :class="{ trxactive: trx == activetrx }"
          class="position-relative itemTrx d-flex p-3"
          v-for="(trx, index) in ongoingTrxs"
          :key="index"
        >
          <div class="mr-3">
            <img
              v-if="trx.provider == 'indosat'"
              src="@/assets/img/provider/indosat-logo.png"
              width="40px"
              alt=""
            />
            <img
              v-if="trx.provider == 'telkomsel'"
              src="@/assets/img/provider/telkomsel-logo.png"
              width="40px"
              alt=""
            />
            <img
              v-if="trx.provider == 'three'"
              src="@/assets/img/provider/three-logo.png"
              width="40px"
              alt=""
            />
             <img
              v-if="trx.provider == 'smartfren'"
              src="@/assets/img/provider/smartfren-logo.png"
              width="40px"
              alt=""
            />
            <img
              v-if="trx.provider == 'xlaxis'"
              src="@/assets/img/provider/xlaxis-logo.png"
              width="40px"
              alt=""
            />
          </div>
          <div>
            <div>{{ trx.trx_id }}</div>
            <!-- index status -->
            <div v-if="trx.indexStatus == 0">Minta nomor...</div>
            <div v-if="trx.indexStatus == 2">Sudah upload bukti...</div>
            <div v-if="trx.indexStatus == 3">Selesai...</div>
            <!-- end of index status -->
          </div>
          <div
            class="position-absolute badge badge-primary"
            style="right: 8px; top: 8px"
            v-if="trx.terbaca == false"
          >
            new
          </div>
        </div>
      </div>

      <!-- transaksi selesai muncul disini -->
      <div
        v-if="displaylist == 'done'"
        class="listTrx overflow-auto position-relative"
        style="height: calc(100vh - 115px)"
      >
        <div
          @click="displayTrx(trx)"
          :class="{ trxactive: trx == activetrx }"
          class="position-relative itemTrx d-flex p-3"
          v-for="(trx, index) in doneTrxs"
          :key="index"
        >
          <div class="mr-3">
            <img
              v-if="trx.provider == 'indosat'"
              src="@/assets/img/provider/indosat-logo.png"
              width="40px"
              alt=""
            />
            <img
              v-if="trx.provider == 'telkomsel'"
              src="@/assets/img/provider/telkomsel-logo.png"
              width="40px"
              alt=""
            />
            <img
              v-if="trx.provider == 'three'"
              src="@/assets/img/provider/three-logo.png"
              width="40px"
              alt=""
            />
             <img
              v-if="trx.provider == 'smartfren'"
              src="@/assets/img/provider/smartfren-logo.png"
              width="40px"
              alt=""
            />
            <img
              v-if="trx.provider == 'xlaxis'"
              src="@/assets/img/provider/xlaxis-logo.png"
              width="40px"
              alt=""
            />
          </div>
          <div>
            <div>{{ trx.trx_id }}</div>
            <!-- index status -->
            <div v-if="trx.indexStatus == 0">Minta nomor...</div>
            <div v-if="trx.indexStatus == 2">Sudah upload bukti...</div>
            <div v-if="trx.indexStatus == 3">Selesai...</div>
            <!-- end of index status -->
          </div>
          <div
            class="position-absolute badge badge-primary"
            style="right: 8px; top: 8px"
            v-if="trx.terbaca == false"
          >
            new
          </div>
        </div>
      </div>
    </div>
    <div
      class="topbar py-2 px-2 bg-white shadow d-flex justify-content-between"
    >
      <div class="ml-5">
        <router-link to="/analyst" class="btn mr-2 btn-outline-primary"
          ><font-awesome-icon icon="arrow-left" class="mr-2" />Kembali ke
          List</router-link
        >
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
            </div>
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
    <div class="maintrx" v-if="activetrx.trx_id">
      <div class="mt-5"></div>
      <div
        v-if="activetrx.indexStatus != 4 || displaylist == 'done'"
        class="row"
      >
        <div class="infocard col-4 mb-2">
          <div class="card">
            <div class="card-body text-center">
              <b-button
                variant="primary"
                @click="
                  copyid('b-toaster-bottom-right', true, activetrx.trx_id)
                "
                class="btn btn-primary py-2 px-4"
                style="border-radius: 100px"
                ><font-awesome-icon
                  icon="copy"
                  :style="{ color: 'white', marginRight: '16px' }"
                />Copy ID Transaksi</b-button
              >
            </div>
          </div>
        </div>
        <div class="infocard col-2 mb-2">
          <div class="card">
            <div class="card-body text-center" style="font-size: 31px">
              {{ activetrx.cs.match(/^([^@]*)@/)[1].toUpperCase() }}
            </div>
          </div>
        </div>
        <div class="datecard col-6 mb-2">
          <div class="card">
            <div class="card-body">
              <div class="font-weight-bold">
                {{ formatDate(new Date(activetrx.created.seconds * 1000)) }}
              </div>
              <div class="font-weight-bold">
                {{ formatTime(new Date(activetrx.created.seconds * 1000)) }}
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
                  <img
                    v-if="activetrx.provider == 'indosat'"
                    src="@/assets/img/provider/indosat-logo.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.provider == 'telkomsel'"
                    src="@/assets/img/provider/telkomsel-logo.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.provider == 'three'"
                    src="@/assets/img/provider/three-logo.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.provider == 'smartfren'"
                    src="@/assets/img/provider/smartfren-logo.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.provider == 'xlaxis'"
                    src="@/assets/img/provider/xlaxis-logo.png"
                    alt=""
                  />
                </div>
                <div>
                  <table>
                    <tr>
                      <td style="width: 100px">Provider</td>
                      <td class="font-weight-bold">{{ activetrx.provider }}</td>
                    </tr>
                    <tr>
                      <td>Nomor</td>
                      <td class="font-weight-bold">{{ activetrx.nomor }}</td>
                    </tr>
                    <tr>
                      <td>Nominal</td>
                      <td class="font-weight-bold">
                        {{ formatNominal(activetrx.nominal) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Rate</td>
                      <td class="font-weight-bold">{{ activetrx.rate }}</td>
                    </tr>
                    <tr>
                      <td>Biaya</td>
                      <td class="font-weight-bold">
                        {{ formatNominal(activetrx.fee) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Di terima</td>
                      <td class="font-weight-bold">
                        {{
                          formatNominal(
                            (
                              activetrx.nominal * activetrx.rate -
                              activetrx.fee
                            ).toFixed(0)
                          )
                        }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rekeningcard col-6">
          <div class="card">
            <div class="card-body">
              <div class="card-title">Rekening</div>
              <div class="d-flex">
                <div class="mr-3">
                  <img
                    v-if="activetrx.bank == 'BCA'"
                    src="@/assets/img/bank/bank-bca.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.bank == 'BNI'"
                    src="@/assets/img/bank/bank-bni.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.bank == 'BRI'"
                    src="@/assets/img/bank/bank-bri.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.bank == 'Mandiri'"
                    src="@/assets/img/bank/bank-mandiri.png"
                    alt=""
                  />

                  <img
                    v-if="activetrx.bank == 'OVO'"
                    src="@/assets/img/bank/ovo.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.bank == 'GoPay'"
                    src="@/assets/img/bank/gopay.png"
                    alt=""
                  />
                  <img
                    v-if="activetrx.bank == 'LinkAja'"
                    src="@/assets/img/bank/linkaja.png"
                    width="100px"
                    alt=""
                  />
                  <img
                    v-if="activetrx.bank == 'Dana'"
                    src="@/assets/img/bank/dana.png"
                    alt=""
                  />
                </div>
                <div>
                  <table>
                    <tr>
                      <td style="width: 100px">Bank</td>
                      <td class="font-weight-bold">{{ activetrx.bank }}</td>
                    </tr>
                    <tr>
                      <td>Nomor</td>
                      <td class="font-weight-bold">{{ activetrx.norek }}</td>
                    </tr>
                    <tr>
                      <td>Nama</td>
                      <td class="font-weight-bold">{{ activetrx.atasnama }}</td>
                    </tr>
                  </table>
                  <b-button
                    variant="primary"
                    @click="
                      copyrekening(
                        'b-toaster-bottom-right',
                        true,
                        activetrx.norek
                      )
                    "
                    class="btn btn-primary py-2 px-4 mt-4"
                    style="border-radius: 100px"
                    ><font-awesome-icon
                      icon="copy"
                      :style="{ color: 'white', marginRight: '16px' }"
                    />Copy Nomor Rekening</b-button
                  >
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
                    <label class="font-label" for="nomor_server_0"
                      >Nomor 01</label
                    >
                    <input
                      v-if="activetrx.nomor_server_0 == null"
                      v-on:keydown="handleKey"
                      v-model="nomor_server_0"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="activetrx.nomor_server_0"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width: 120px">
                    <label class="font-label" for="nomor_server_0"
                      >Nominal 01</label
                    >
                    <input
                      v-if="
                        activetrx.nomor_server_0 == null && nomCountPost > 0
                      "
                      v-model="nominal_server_0"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-if="
                        activetrx.nominal_server_0 == null && nomCountPost == 0
                      "
                      type="text"
                      class="form-control"
                      :value="formatNominal(activetrx.nominal)"
                      disabled
                    />
                    <input
                      v-if="activetrx.nominal_server_0 != null"
                      type="text"
                      class="form-control"
                      :value="formatNominal(activetrx.nominal_server_0)"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <!-- nomor 02 --->
              <div
                class="d-flex"
                v-if="nomCountPost > 0 || activetrx.nomor_server_1 != null"
              >
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label" for="nomor_server_1"
                      >Nomor 02</label
                    >
                    <input
                      v-if="activetrx.nomor_server_1 == null"
                      v-on:keydown="handleKey"
                      v-model="nomor_server_1"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="activetrx.nomor_server_1"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width: 120px">
                    <label class="font-label">Nominal 02</label>
                    <input
                      v-if="activetrx.nominal_server_1 == null"
                      v-model="nominal_server_1"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="formatNominal(activetrx.nominal_server_1)"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <!-- nomor 03 --->
              <div
                class="d-flex"
                v-if="nomCountPost > 1 || activetrx.nomor_server_2 != null"
              >
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 03</label>
                    <input
                      v-if="activetrx.nomor_server_2 == null"
                      v-on:keydown="handleKey"
                      v-model="nomor_server_2"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="activetrx.nomor_server_2"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width: 120px">
                    <label class="font-label">Nominal 03</label>
                    <input
                      v-if="activetrx.nominal_server_2 == null"
                      v-model="nominal_server_2"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="formatNominal(activetrx.nominal_server_2)"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <!-- nomor 04 --->
              <div
                class="d-flex"
                v-if="nomCountPost > 2 || activetrx.nomor_server_3 != null"
              >
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 04</label>
                    <input
                      v-if="activetrx.nomor_server_3 == null"
                      v-on:keydown="handleKey"
                      v-model="nomor_server_3"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="activetrx.nomor_server_3"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width: 120px">
                    <label class="font-label">Nominal 04</label>
                    <input
                      v-if="activetrx.nomor_server_3 == null"
                      v-model="nominal_server_3"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="formatNominal(activetrx.nominal_server_3)"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <!-- nomor 05 --->
              <div
                class="d-flex"
                v-if="nomCountPost > 3 || activetrx.nomor_server_4 != null"
              >
                <div class="mr-3">
                  <div class="form-group">
                    <label class="font-label">Nomor 05</label>
                    <input
                      v-if="activetrx.nomor_server_4 == null"
                      v-on:keydown="handleKey"
                      v-model="nomor_server_4"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="activetrx.nomor_server_4"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div class="form-group" style="width: 120px">
                    <label class="font-label">Nominal 05</label>
                    <input
                      v-if="activetrx.nomor_server_4 == null"
                      v-model="nominal_server_4"
                      type="number"
                      class="form-control"
                      :disabled="nomor_updated"
                    />
                    <input
                      v-else
                      type="text"
                      class="form-control"
                      :value="formatNominal(activetrx.nominal_server_4)"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div
                v-if="activetrx.nomor_server_0 == null"
                class="d-flex justify-content-between mt-4"
              >
                <div>
                  <button
                    @click="addNomServCol()"
                    class="btn btn-outline-primary"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button class="btn btn-primary" @click="updateNomorServer()">
                    <font-awesome-icon
                      icon="save"
                      :style="{ color: 'white', marginRight: '12px' }"
                    />Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activetrx.indexStatus > 1" class="card mt-4">
            <div class="card-body">
              <div class="card-title">Bukti Server</div>
              <progress
                id="progress"
                style="width: 100%"
                :value="uploadValue"
                v-if="bukti_uploading"
                max="100"
              ></progress>
              <div
                v-if="
                  activetrx.bukti_server == null && bukti_uploading == false
                "
              >
                <img
                  v-if="temp_buktiserver != null"
                  :src="temp_buktiserver"
                  width="100%"
                />
                <div class="d-flex justify-content-between mt-3">
                  <div class="w-100 mr-2">
                    <file-select v-model="buktiServer"></file-select>
                  </div>
                  <button
                    @click="uploadBukti(activetrx.TrxDocID)"
                    class="btn btn-primary"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div v-else>
                <img :src="activetrx.bukti_server" width="100%" alt="" />
                <div
                  v-if="
                    temp_buktiserver != null || activetrx.bukti_server != null
                  "
                  class="mt-4 mb-2"
                >
                  Bukti salah? Upload ulang:
                </div>
                <div
                  v-if="
                    temp_buktiserver != null || activetrx.bukti_server != null
                  "
                  class="d-flex justify-content-between"
                >
                  <div class="w-100 mr-2">
                    <file-select v-model="buktiServer"></file-select>
                  </div>
                  <button
                    @click="uploadBukti(activetrx.TrxDocID)"
                    class="btn btn-primary"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="activetrx.nomor_server_0 != null"
          class="bukticlientcard col-7"
        >
          <div class="card">
            <div class="card-body">
              <div class="card-title">Bukti Client</div>
              <div class="d-flex">
                <div @click="showImage(activetrx.bukti_client_0)">
                  <img :src="activetrx.bukti_client_0" width="50%" alt="" />
                </div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_1)">
                  <img :src="activetrx.bukti_client_1" width="50%" alt="" />
                </div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_2)">
                  <img :src="activetrx.bukti_client_2" width="50%" alt="" />
                </div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_3)">
                  <img :src="activetrx.bukti_client_3" width="50%" alt="" />
                </div>
                <div class="mr-2"></div>
                <div @click="showImage(activetrx.bukti_client_4)">
                  <img :src="activetrx.bukti_client_4" width="50%" alt="" />
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
              <div>Transaksi Selesai~</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--image modal -->
    <div id="imagemodal" class="imageModal">
      <img
        style="z-index: 20000"
        class="imageModal-content"
        :src="activeImage"
      />
      <div
        class="vh-100 position-fixed"
        style="width: calc(100vw - 20px); top: 0; left: 0; z-index: -2"
        @click="showImage()"
        id="bgcloser"
      ></div>
    </div>

    <transition name="swipeup">
      <div
        v-if="activetrx.indexStatus == 3 || bukti_uploaded"
        class="position-fixed"
        style="right: 16px; bottom: 16px"
      >
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            Tandai Transaksi Sudah Selesai?
          </div>
          <div class="card-body" style="font-size: 14px">
            <p>ID: {{ activetrx.trx_id }}</p>
            <p>Pastikan semua data sudah benar ya.</p>
            <div class="d-flex justify-content-end">
              <button @click="setAsSelesai()" class="btn btn-success">
                YA
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
    <transition name="fade">
      <datapencarian v-if="settings.pencariandataa" />
    </transition>
    <transition name="fade">
      <div
        class="position-fixed"
        style="
          top: 36px;
          right: calc(12.5vw - 24px);
          cursor: pointer;
          z-index: 999999;
        "
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

    <div>
      <input type="text" id="rekeningcopy" v-model="activetrx.norek" />
      <input type="text" id="idcopy" v-model="activetrx.trx_id" />
    </div>
  </div>
</template>

<script>
//import firebase from 'firebase'
import { db } from "../../main";
import axios from "axios";
import firebase from "firebase";
import JQuery from "jquery";
import moment from "moment";
let $ = JQuery;
import FileSelect from "../../elements/FileSelect";
import rate from "../settings/Rate";
import generalsettings from "../settings/General";
import datapencarian from "../settings/PencarianDataA";
const uuidv1 = require("uuid/v1");

export default {
  name: "convertpulsa",
  components: {
    FileSelect,
    rate,
    generalsettings,
    datapencarian,
  },
  data: () => {
    return {
      pencarian: "",
      displaylist: "otw",
      settings: {
        general: false,
        rate: false,
      },
      csready: false,
      cs: [],
      popMenu: false,
      transaksi: [],
      activeImage: null,
      buktiServer: null,
      imagePopactive: false,
      nomCountPost: 0,
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
      nomor_updated: false,
      bukti_uploaded: false,
      bukti_uploading: false,
      temp_buktiserver: null,
      bukti_upload_status: "Upload",
      uploadValue: 0,
      activetrx: {
        uid: null,
        TrxDocID: null,
        trx_id: null,
        provider: null,
        nomor: null,
        nominal: null,
        fee: 0,
        rate: null,
        indexStatus: null,
        created: {
          seconds: null,
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
      },
    };
  },
  created: function () {
    this.userEmail = firebase.auth().currentUser.email;
  },
  methods: {
    formatNominal(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    displayTrx: function (trx) {
      this.nomCountPost = 0;
      this.activetrx = trx;
      (this.nomor_server_0 = null),
        (this.nomor_server_1 = null),
        (this.nomor_server_2 = null),
        (this.nomor_server_3 = null),
        (this.nomor_server_4 = null),
        (this.nominal_server_0 = null),
        (this.nominal_server_1 = null),
        (this.nominal_server_2 = null),
        (this.nominal_server_3 = null),
        (this.nominal_server_4 = null),
        (this.buktiServer = null),
        (this.nomor_updated = false),
        (this.bukti_uploaded = false),
        (this.uploadValue = 0),
        (this.temp_buktiserver = null),
        db.collection("trxconvert").doc(trx.TrxDocID).update({
          terbaca: true,
        });
    },
    showImage: function (imgurl) {
      if (imgurl != null) {
        $("#imagemodal").css("display", "block");
        this.activeImage = imgurl;
      } else {
        $("#imagemodal").css("display", "none");
        this.activeImage = null;
      }
    },
    addNomServCol: function () {
      this.nomCountPost += 1;
    },
    updateNomorServer() {
      var vm = this;
      if (this.nominal_server_0 == null) {
        this.nominal_server_0 = this.activetrx.nominal.toString();
      }
      db.collection("trxconvert")
        .doc(this.activetrx.TrxDocID)
        .update({
          nomor_server_0: this.nomor_server_0,
          nomor_server_1: this.nomor_server_1,
          nomor_server_2: this.nomor_server_2,
          nomor_server_3: this.nomor_server_3,
          nomor_server_4: this.nomor_server_4,
          nominal_server_0: this.nominal_server_0,
          nominal_server_1: this.nominal_server_1,
          nominal_server_2: this.nominal_server_2,
          nominal_server_3: this.nominal_server_3,
          nominal_server_4: this.nominal_server_4,
          indexStatus: 1,
          time_nomor_cs: new Date(),
        })
        .then(function () {
          var data = db
            .collection("users")
            .doc(vm.activetrx.uid)
            .collection("tokens")
            .orderBy("createdAt", "desc")
            .limit(1);
          data.get().then(function (qSnap) {
            qSnap.forEach(function (doc) {
              if (doc.data()["token"] != null) {
                var fcmheaders = {
                  "Content-Type": "application/json",
                  Authorization:
                    "key=AAAAZW9MQS8:APA91bHcwFa-2LavyCHLjaY3Kbq9ew9JWoK_k_vZX-UUiCnMPZJCAGgU1rLsiQ-H_aZY-niqKrM3eoG13fjZdPFsw91ONFEd9jMqRFS_UNPWzyCmTeLr6XF2s52TG9y-MG7h72Iyjbp0",
                };
                var fcmbody = {
                  to: doc.data()["token"],
                  notification: {
                    title: "CS Sudah kasih nomor!",
                    body: "Silahkan transfer pulsamu ke nomor berikut.",
                  },
                  data: {
                    title: "CS Sudah kasih nomor!",
                    body: "Silahkan transfer pulsamu ke nomor berikut.",
                    TrxDocID: vm.activetrx.TrxDocID,
                    provider: vm.activetrx.provider,
                    indexStatus: "1",
                    click_action: "FLUTTER_NOTIFICATION_CLICK",
                  },
                };
                axios.post("https://fcm.googleapis.com/fcm/send", fcmbody, {
                  headers: fcmheaders,
                });
                vm.nomor_updated = true;
              }
            });
          });
        })
        .catch(function () {
          //console.error('Error : ', error)
        });
    },
    uploadBukti(trxDocID) {
      var re = /(?:\.([^.]+))?$/;
      var file = this.buktiServer;
      var namafile = uuidv1() + "." + re.exec(file.name)[1];
      var vm = this;
      this.bukti_uploading = true;

      //save file to storage
      const storageRef = firebase
        .storage()
        .ref("trxconvert/server/" + namafile)
        .put(file);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            vm.temp_buktiserver = url;

            var trxDataRef = db.collection("trxconvert").doc(trxDocID);
            return trxDataRef
              .update({
                indexStatus: 3,
                bukti_server: url,
              })
              .then(function () {
                vm.nomor_updated = true;
                vm.bukti_uploaded = true;
                vm.bukti_uploading = false;
              })
              .catch(function () {
                //console.error('Error : ', error)
              });
          });
        }
      );
    },
    setAsSelesai() {
      var vm = this;
      db.collection("trxconvert")
        .doc(this.activetrx.TrxDocID)
        .update({
          indexStatus: 4,
        })
        .then(function () {
          var data = db
            .collection("users")
            .doc(vm.activetrx.uid)
            .collection("tokens")
            .orderBy("createdAt", "desc")
            .limit(5);
          data.get().then(function (qSnap) {
            qSnap.forEach(function (doc) {
              //console.log(doc.data()['token'])
              if (doc.data()["token"] != null) {
                var fcmheaders = {
                  "Content-Type": "application/json",
                  Authorization:
                    "key=AAAAZW9MQS8:APA91bHcwFa-2LavyCHLjaY3Kbq9ew9JWoK_k_vZX-UUiCnMPZJCAGgU1rLsiQ-H_aZY-niqKrM3eoG13fjZdPFsw91ONFEd9jMqRFS_UNPWzyCmTeLr6XF2s52TG9y-MG7h72Iyjbp0",
                };
                var fcmbody = {
                  to: doc.data()["token"],
                  notification: {
                    title: "Uang sudah ditransfer!",
                    body:
                      "Silahkan cek rekeningmu, apabila belum masuk hubungi CS kami.",
                  },
                  data: {
                    title: "Uang sudah ditransfer!",
                    body:
                      "Silahkan cek rekeningmu, apabila belum masuk hubungi CS kami.",
                    TrxDocID: vm.activetrx.TrxDocID,
                    provider: vm.activetrx.provider,
                    indexStatus: "3",
                    click_action: "FLUTTER_NOTIFICATION_CLICK",
                  },
                };
                axios.post("https://fcm.googleapis.com/fcm/send", fcmbody, {
                  headers: fcmheaders,
                });
              }
            });
          });
          vm.activetrx.indexStatus = 4;
          vm.bukti_uploaded = false;
        })
        .catch(function () {
          //console.error('Error : ', error)
        });
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
        return moment(String(value)).format("dddd, DD MMMM YYYY (hh:mm)");
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
    copyrekening(toaster, append = false, rekening = null) {
      this.$bvToast.toast(`Rekening: ${rekening}`, {
        title: `Berhasil dicopy!`,
        toaster: toaster,
        solid: true,
        appendToast: append,
        rekening: rekening,
        variant: "info",
      });

      var copyText = document.getElementById("rekeningcopy");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    copyid(toaster, append = false, id = null) {
      this.$bvToast.toast(`ID: ${id}`, {
        title: `Berhasil dicopy!`,
        toaster: toaster,
        solid: true,
        appendToast: append,
        id: id,
        variant: "info",
      });

      var copyText = document.getElementById("idcopy");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    handleKey(event) {
      if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        event.preventDefault();
      }
    },
  },
  computed: {
    ongoingTrxs: function () {
      return this.transaksi.filter((trx) => {
        return (
          (trx.indexStatus != 4 &&
            trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase()) &&
            trx.cancel != true) ||
          (trx.indexStatus != 4 &&
            trx.atasnama.toLowerCase().includes(this.pencarian.toLowerCase()) &&
            trx.cancel != true) ||
          (trx.indexStatus != 4 &&
            trx.norek.toLowerCase().includes(this.pencarian.toLowerCase()) &&
            trx.cancel != true) ||
          (trx.indexStatus != 4 &&
            trx.nomor.toLowerCase().includes(this.pencarian.toLowerCase()) &&
            trx.cancel != true)
        );
      });
    },
    doneTrxs() {
      return this.transaksi.filter((trx) => {
        return (
          (trx.indexStatus == 4 &&
            trx.trx_id.toLowerCase().includes(this.pencarian.toLowerCase())) ||
          (trx.indexStatus == 4 &&
            trx.atasnama
              .toLowerCase()
              .includes(this.pencarian.toLowerCase())) ||
          (trx.indexStatus == 4 &&
            trx.norek.toLowerCase().includes(this.pencarian.toLowerCase())) ||
          (trx.indexStatus == 4 &&
            trx.nomor.toLowerCase().includes(this.pencarian.toLowerCase()))
        );
      });
    },
  },
  firestore() {
    return {
      transaksi: db
        .collection("trxconvert")
        .orderBy("created", "desc")
        .limit(3000),
    };
  },
};
</script>