<template>
  <div class="" id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h2 class="text-center text-danger">Update Profile</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  v-model="user.firstName"
                  id="firstName"
                  name="firstName"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.firstName.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.firstName.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.firstName.required"
                    >First Name is required</span
                  >
                  <span v-if="!$v.user.firstName.alpha"
                    >First Name should contains only letters</span
                  >
                  <span v-if="!$v.user.firstName.minLength"
                    >First Name minimum legth should be atleast 2</span
                  >
                  <span v-if="!$v.user.firstName.maxLength"
                    >First Name maximum length should not be more than 10</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  v-model="user.lastName"
                  id="lastName"
                  name="lastName"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.lastName.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.lastName.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.lastName.required"
                    >Last Name is required</span
                  >
                  <span v-if="!$v.user.lastName.alpha"
                    >Last Name should contains only letters</span
                  >
                  <span v-if="!$v.user.lastName.minLength"
                    >Last Name minimum legth should be atleast 2</span
                  >
                  <span v-if="!$v.user.lastName.maxLength"
                    >Last Name maximum length should not be more than 10</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  alpha,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { profile } from "@/common/Service";
import { Updateprofile } from "@/common/Service";
export default {
  name: "Updateprofile",

  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      firstName: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(10),
      },
      lastName: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(10),
      },
      email: { required, email },
    },
  },
  mounted() {
    profile()
      .then((res) => {
        this.user.firstName = res.data.profile.firstname;
        this.user.lastName = res.data.profile.lastname;
        this.user.email = res.data.profile.email;
        console.log(res.data.profile);
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      let formData = {
        firstname: this.user.firstName,
        lastname: this.user.lastName,
        email: this.user.email,
      };

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
      console.log(formData);
      Updateprofile(formData)
        .then((res) => {
            console.log(this.formData);
            console.log(res.data);
              this.$router.push("/profile");
         
        })
        .catch((error) => {
          console.log("Something Wrong " + error);
        });
    },
  },
};
</script>
 
<style>
</style>