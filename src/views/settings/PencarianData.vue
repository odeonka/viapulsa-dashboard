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
        <b-tab title="Pencarian ID" active>
          <table
            class="table table-responsive-sm table-hover table-outline mb-0"
          >
            <thead class="thead-light"></thead>
            <tbody>
              <tr>
                <!-- <input v-model="search_id" />

                        <button @click="searchFunction()">Search</button>

                        <div>
                        display data here
                        {{theData}}
                        </div> -->
                <td>
                  <!-- <span v-if="message.offline == null" style="width:calc(100% - 92px);margin-right:12px;display:inline-block">loading...</span>
                              <span v-else-if="savingoffline == true" style="width:calc(100% - 92px);margin-right:12px;display:inline-block">menyimpan...</span> -->
                  <!-- <div class="caritransaksi">
                    <input id="inputcari" type="text" v-model="pencarian" placeholder="Cari data..."/>
                    <div id="searchIcon"><font-awesome-icon icon="search" :style="{color: 'rgba(0,0,0,0.2)'}" /></div>
                  </div>
                  v-model tadinya search_id/searchfunction menjadi theData-->
                  <input
                    v-model="search_id"
                    style="width: calc(100% - 80px); margin-right: 12px"
                    maxlength="50"
                    placeholder="Masukkan ID yang ingin di Cari..."
                  />
                  <button
                    class="btn btn-primary"
                    style="font-size: 12px"
                    @click="searchFunction()"
                  >
                    <font-awesome-icon icon="search" class="mr-3" />
                    Cari
                  </button>
                </td>
              </tr>
              <!-- bila ingin menambah data sesuai dengan firebase dan import return theData -->
              <tr>
                <td>Nomor</td>
                <td>{{ theData.norek }}</td>
              </tr>
              <tr>
                <td>Atas Nama</td>
                <td>{{ theData.atasnama }}</td>
              </tr>
              <tr>
                <td>Bank</td>
                <td>{{ theData.bank }}</td>
              </tr>
              <tr>
                <td>CS</td>
                <td>{{ theData.cs }}</td>
              </tr>
              <tr>
                <td>Provider</td>
                <td>{{ theData.provider }}</td>
              </tr>
              <!-- <tr>
                <td>Waktu Upload</td>
                <td>
                  {{ theData.time_client_upload }}
                  {{ theData.time_client_upload }}
                  Date( 
                    theData.time_client_upload.seconds * 1000
                  )
                </td>
              </tr> -->
            </tbody>
          </table>
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
      search_id: "",
      theData: {
        // kalau ingin menambah sesuatu lihat firebase/cloud firestore/trxconvert/
        // pilih kode yang dikehendaki (terserah) dan aplikasikan seperti di bawah ini
        // akhir tidak perlu koma
        norek: "",
        atasnama: "",
        bank: "",
        cs: "",
        provider: "",
        time_client_upload: "",
      },
      title: null,
      body: null,
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

  //  methods: {
  //     searchFunction(){
  //       db.collection('trxconvert').doc(this.search_id).get().then((data) => {
  //         console.log(data)
  //         this.theData = data.data()
  //       })
  //     }
  //   }
  // Methode Pencarian ID
  methods: {
    // Methode Pencarian ID
    searchFunction() {
      db.collection("trxconvert")
        .where("trx_id", "==", this.search_id)
        .get()
        .then((data) => {
          // const  = data.docs.map((doc) => doc.data(data.title, data.pesan));
          data.docs.forEach((element) => {
            console.log(element);
            this.theData = element.data();
            // element.data.title;
            // element.data.pesan;
          });
        });
    },
    // Methode Pencarian ID
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
  //search id
  // computed: {
  //   ongoingTrxs: function () {
  //     return this.transaksi.filter((trx) => {
  //       if (trx.norek != null) {
  //         return (
  //           (trx.indexStatus != 4 &&
  //             trx.trx_id.toLowerCase().includes(this.search_id.toLowerCase()) &&
  //             trx.cancel != true) ||
  //           (trx.indexStatus != 4 &&
  //             trx.atasnama
  //               .toLowerCase()
  //               .includes(this.search_id.toLowerCase()) &&
  //             trx.cancel != true) ||
  //           (trx.indexStatus != 4 &&
  //             trx.norek.includes(this.search_id) &&
  //             trx.cancel != true) ||
  //           (trx.indexStatus != 4 &&
  //             trx.nomor.includes(this.search_id) &&
  //             trx.cancel != true)
  //         );
  //       } else {
  //         return (
  //           (trx.indexStatus != 4 &&
  //             trx.trx_id.toLowerCase().includes(this.search_id.toLowerCase()) &&
  //             trx.cancel != true) ||
  //           (trx.indexStatus != 4 &&
  //             trx.atasnama
  //               .toLowerCase()
  //               .includes(this.search_id.toLowerCase()) &&
  //             trx.cancel != true) ||
  //           (trx.indexStatus != 4 &&
  //             trx.nomor.includes(this.search_id) &&
  //             trx.cancel != true)
  //         );
  //       }
  //     });
  //   },
  // },
  //search id
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
      smartfren: db
        .collection("settings")
        .doc("providers")
        .collection("providers")
        .doc("smartfren"),
      xlaxis: db
        .collection("settings")
        .doc("providers")
        .collection("providers")
        .doc("xlaxis"),

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

