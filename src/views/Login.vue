<template>
  <div class="container-fluid">
    <div class="login min-vh-100 row justify-content-center align-items-center">
      <div class="col-7 bg-white" style="border-radius:16px">
        <div class="row">
          <div class="col-6 color-primary p-5" style="border-bottom-left-radius:16px;border-top-left-radius:16px">
            <div class="row px-4 my-5">
              <div class="col-12">
                <div>
                  <h4 class="font-weight-bold text-white">Selamat Datang</h4>
                  <div style="width:60px; height:4px;background:white"></div>
                </div>
                <p class="text-white font-weight-light mt-4" style="font-size:14px;line-height:24px">Halo rekan Viapulsa,<br> silahkan login dengan akun yang sudah disediakan. Apabila ada kendala, lansung hubungi SV atau Tim Developer <a class="text-white font-weight-bold font-italic" href="">di sini</a></p>

                <div class="doughnut position-absolute" style="bottom:-60px;right:-110px"></div>
              </div>
            </div>
          </div>
          <div class="col-6 text-center p-5">
            <h4 class="font-weight-bold mb-5">Sign In</h4>
            <form action="">
              <div class="form-group mb-4 mx-5">
                <input class="form-control" :class="{'text-secondary': loading}" style="font-size:14px" type="text" v-model="email" placeholder="Email" :disabled="loading">
                <label v-if="error == 'auth/user-not-found'" for="password" class="control-label text-danger mt-2 font-italic small">Email salah!</label>
              </div>
              <div class="form-group mb-4 mx-5">
                <input class="form-control" style="font-size:14px" type="password" v-model="password" placeholder="Password" :disabled="loading">
                <label v-if="error == 'auth/wrong-password'" for="password" class="control-label text-danger mt-2 font-italic small">Password salah!</label>
              </div>
              <button @click="login" class="btn text-white button-primary px-5 py-2 shadow align-middle" style="border-radius:50px" :disabled="loading">
                <span v-if="loading" style="display:inline-block;transform:translateY(-3px)">
                  <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  <span class="sr-only">Loading...</span>
                </span>
                <span v-if="!loading">Login</span>
                <span v-if="loading">Loading...</span>
              </button>
            </form>
            <p class="mt-4">Lupa password? <a class="clr-primary" target="_blank" href="https://api.whatsapp.com/send?phone=6285229434855">Tanya Admin</a></p>
            
            <div class="squarell position-absolute" style="top:20px;right:-50px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        error: '',
        loading: false,
      }
    },
    methods: {
      login: function() {
        this.loading = true
        var vm = this
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (/*user*/) => {
            //console.log('success')
            this.$router.replace('home')
          },
          (err) => {
            vm.error = err.code
            vm.loading = false
          }
        );
      }
    }
  }
</script>

<style scoped>
.login{
  background:#e8e8ea
}
.doughnut {
    border: 25px solid white;
    border-radius: 100px;
    height:120px;
    width:120px;
}
.squarell{
  border: 25px solid rgb(232, 232, 234);
  height: 120px;
  width: 120px;
  transform: rotate(30deg);
  border-radius: 40px;
}
</style>