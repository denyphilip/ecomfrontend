<template>
  <div class="container">
    <h1>My Profile</h1>
    <table class="table table-dark">
      <tbody>
        <tr>
          <th scope="col">First Name</th>
          <td>{{ firstName }}</td>
        </tr>
        <tr>
          <th scope="col">Last Name</th>
          <td>{{ lastName }}</td>
        </tr>
        <tr>
          <th scope="col">Email ID</th>
          <td>{{ email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { profile } from "@/common/Service";
export default {
  name: "Profile",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  mounted() {
    profile()
      .then((res) => {
        this.firstName = res.data.profile.firstname;
        this.lastName = res.data.profile.lastname;
        this.email = res.data.profile.email;
        console.log(res.data.profile);
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },
};
</script>

<style>
</style>