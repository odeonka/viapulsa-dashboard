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
        <!-- <div style="border: 1px solid rgb(204, 204, 204); padding: 5px; overflow: auto; width: auto; height: 800px; background-color: rgb(255, 255, 255);"> -->
           <vue-custom-scrollbar class="scroll-area"  :settings="settingsa" @ps-scroll-y="scrollHanle">
          <table
            class="table table-responsive-sm table-hover table-outline mb-0"
          >
            <thead class="thead-light"></thead>
             <input
                    v-model="search_id"
                    style="width: calc(100% - 80px); margin-right: 12px"
                    maxlength="50"
                    placeholder="Masukkan ID yang ingin di Cari..."
                  />
            <tbody>
                  <button
                    class="btn btn-primary"
                    style="font-size: 12px"
                    @click="searchFunction()"
                  >
                    <font-awesome-icon icon="search" class="mr-3" />
                    Cari
                  </button>
                
              <!-- bila ingin menambah data sesuai dengan firebase dan import return theData -->
              <tr>
                <td>ID</td>
                <td>{{ theData.trx_id }}</td>
              </tr>
              <tr>
                <td>Provider</td>
                <td>{{ theData.provider }}</td>
              </tr>
              <tr>
              <td>Nominal</td>
              <td>{{ theData.nominal }}</td>
              </tr>
              <tr>
              <td>Rate</td>
              <td>{{ theData.rate }}</td>
              </tr>
              <tr>
                <td>Bank</td>
                <td>{{ theData.bank }}</td>
              </tr>
              <tr>
                <td>Rekening</td>
                <td>{{ theData.norek }}</td>
              </tr>
               <tr>
                <td>Atas Nama</td>
                <td>{{ theData.atasnama }}</td>
              </tr>
              <tr>
              <td>Nomor Cust</td>
              <td> {{theData.nomor}} </td>
              </tr>
              <tr>
              <td>Nomor CS</td>
              <td>{{ theData.nomor_server_0}}</td>
              </tr>
              <tr>
              <td>Bukti Cust</td>
              <td>{{ theData.bukti_client_0 }}</td>
              </tr>
              <tr>
              <td>Bukti CS</td>
              <td>{{ theData.bukti_server }}
              </td>
              </tr>
              <tr>
              <td>CS</td>
              <td>{{ theData.cs}}</td>
              </tr>
              <tr>
              <td>Tanggal</td>
              <td>{{ Date(theData.created * 1000) }}</td>
              </tr>
            </tbody>
          </table>
          </vue-custom-scrollbar>
         <!-- </div> -->
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import { db } from "../../main";
export default {
  components: {
    vueCustomScrollbar
  },
  name: "General-Settings",
  data: () => {
    return {
       settingsa: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      },
      search_id: "",
      theData: {
        // kalau ingin menambah sesuatu lihat firebase/cloud firestore/trxconvert/
        // pilih kode yang dikehendaki (terserah) dan aplikasikan seperti di bawah ini
        // akhir tidak perlu koma
        trx_id:"",
        provider: "",
        nominal:"",
        rate:"",
        bank:"",
        norek: "",
        atasnama: "",
        nomor:"",
        nomor_server_0:"",
        bukti_client_0:"",
        bukti_server:"",
        cs: "",
        created:"",
        
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
      smartfren: { status: false},
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
     scrollHanle(evt) {
      console.log(evt)
    },
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
<style >
.scroll-area {
  position: relative;
  margin: auto;
  width: 600px;
  height: 400px;
}
</style>
