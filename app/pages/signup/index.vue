<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <div class="field">
            <label class="label" for="">Email</label>
            <div class="control">
              <input
                v-model = "email"
                class = "input is-info"
                type = "email"
                placeholder = "Email"
              >
            </div> <!-- end of control -->
          </div> <!-- end of field -->
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model = "password"
                class = "input is-info"
                type = "password"
                placeholder = "Password"
              >
            </div> <!-- end of control -->
          </div> <!-- end of field -->
        </div> <!-- end of box -->

        <div class="field is-grouped">
          <div class="control">
            <button
              class = "button is-link"
              @click = "signUp"
              >Sign up</button>
          </div> <!-- end of control -->
        </div> <!-- end of field -->
      </div> <!-- end of column is-6 -->
    </div> <!-- end of columns -->
  </div> <!-- end of section -->
</template>

<script>
  export default {
    data() {
      return {
        email: "",
        password: ""
      }
    },

    methods: {
      signUp() {
        let user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('signUp', user)
      }
    }
  }

</script>
