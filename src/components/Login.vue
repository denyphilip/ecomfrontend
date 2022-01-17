<template>
  <div class="" id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 offset-sm-2">
          <div>
            <h2>Login to your account</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <!-- <label for="email">Email</label> -->
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">*Email is required</span>
                  <span v-if="!$v.user.email.email">*Email is invalid</span>
                </div>
              </div>
              <div class="form-group">
                <!-- <label for="password">Password</label> -->
                <input
                  type="password"
                  v-model="user.password"
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.password.required"
                    >*Password is required</span
                  >
                  <span v-if="!$v.user.password.minLength"
                    >*Password must be at least 6 characters</span
                  >
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import store from "../store/store";
import * as type from "../store/type";
import { userLogin } from "@/common/Service";
import { saveToken } from "@/common/Jwttoken";
export default {
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  computed: mapState({
    token: (state) => state.token,
    emailid: (state) => state.emailid,
  }),
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      let formData = { email: this.user.email, password: this.user.password };
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      userLogin(formData)
        .then((res) => {
          if (res.data.error == 0) {
            if (res.data.status == 1) {
              saveToken(res.data.token);
              localStorage.setItem("uid", res.data.email);
               localStorage.setItem("user_id", res.data.user_id);
               this.$swal({
    title: 'Login Successful',
    text: 'Redirecting...',
    icon: 'success',
    timer: 2000,
    buttons: false,
})
.then(() => {
    this.$router.push("/");
      window.location.reload();
})
              // this.$router.push("/");
              store.dispatch({
                type: type.Token,
                id: res.data.token,
                uid: res.data.email,
              });
              // console.log(this.formData);
              // console.log(res.data);
            }
            else{
              alert("Inactive user");
            }
          } else {
            alert("Invalid email or password");
          }
        })
        .catch((error) => {
          console.log("Something Wrong " + error);
        });
    },
  },
};
</script>

<style>
.row {
  display: flex;
  justify-content: center;
}
span {
  color: red;
}
.form-group input {
  background: #f0f0e9;
  border: medium none;
  color: #696763;
  display: block;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 300;
  height: 40px;
  margin-bottom: 10px;
  outline: medium none;
  padding-left: 10px;
  width: 100%;
}
.container h2 {
  color: #696763;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 30px;
}
</style>
