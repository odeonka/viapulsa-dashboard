<template>
<div>
  <div>Null atasnama</div>
  <div v-for="(data, index) in nullatasnama" :key="index">
    {{data.trx_id}}
  </div>


  <div>Null norek</div>
  <div v-for="(data, index) in nullnorek" :key="index">
    {{data.trx_id}}
  </div>


  <div>Null Nomor</div>
  <div v-for="(data, index) in nullnomor" :key="index">
    {{data.trx_id}}
  </div>


  <div>Null Trk_id</div>
  <div v-for="(data, index) in nullid" :key="index">
    {{data.trx_id}}
  </div>
</div>
</template>

<script>
import { db } from '../main'

export default {
  name:'bad-data',
  firestore () {
    return {
      nullatasnama: db.collection('trxconvert').where('atasnama', '==', null),
      nullnorek: db.collection('trxconvert').where('norek', '==', null),
      nullnomor: db.collection('trxconvert').where('nomor', '==', null),
      nullid: db.collection('trxconvert').where('trx_id', '==', null),
    }
  }
}
</script>