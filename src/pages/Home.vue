<template lang="pug">
  //- .home
    img(alt="Vue logo" src="../assets/logo.png")
    h3(@click="handleClick") LANDING PAGE
    p(v-if="$auth.user") Welcome {{$auth.user.nickname}}
    v-btn(v-if="$auth.isAuthenticated" @click="logout") Logout
    v-btn(v-if="!$auth.isAuthenticated && !$auth.loading" @click="login") Login
    router-link(to="/auth/register") Register
  v-app(light="")
    v-app-bar(absolute flat color="transparent")
      v-toolbar-title
        img(src="../assets/title.png" height="50" )
      v-spacer
      v-btn(text color="white" @click="modal = true") Pharmacy Login
      v-spacer
      v-btn(text color="white")
    v-content
      auth-modal(v-model="modal" tab="register")
      section
        v-parallax(src="../assets/hero.jpeg" height="600")
          v-layout.white--text(column="" align-center="" justify-center="")
            <img src="../assets/vuetify.png" class="animated pulse infinite" alt="Logo" id="animated" height="200">
            h1.white--text.mb-2.display-1.text-center Med Finder
            .subheading.mb-4.text-center Powered by Vuetify
            v-btn.mt-12(color="blue lighten-2" dark="" large="" href="/search")
              | Get Started
      section
        v-layout.my-12(column="" wrap="" align-center="")
          v-flex.my-4(xs12="" sm4="")
            .text-center
              h2.headline An Inovative Way To Locate Your Meds
              span.subheading
                | Cras facilisis mi vitae nunc
          v-flex(xs12="")
            v-container(grid-list-xl="")
              v-layout(row="" wrap="" align-center="")
                v-flex(xs12="" md4="")
                  v-card.transparent(flat="")
                    v-card-text.text-center
                      v-icon.blue--text.text--lighten-2(x-large="") mdi-map-marker
                    v-card-title.layout.justify-center(primary-title="")
                      .headline.text-center Localization
                    v-card-text
                      | A dynamic search that automatically detects your position.
                      | An accurate map that shows the nearest pharmacies that have your medicines on ready and available.
                      | Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                v-flex(xs12="" md4="")
                  v-card.transparent(flat="")
                    v-card-text.text-center
                      v-icon.blue--text.text--lighten-2(x-large="") mdi-hospital
                    v-card-title.layout.justify-center(primary-title="")
                      .headline Appointments
                    v-card-text
                      | Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      | Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      | Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                v-flex(xs12="" md4="")
                  v-card.transparent(flat="")
                    v-card-text.text-center
                      v-icon.blue--text.text--lighten-2(x-large="") mdi-library-books
                    v-card-title.layout.justify-center(primary-title="")
                      .headline.text-center Collection of medicines
                    v-card-text
                      | Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      | Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      | Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
      section
        v-parallax(src="../assets/section.jpg" height="380")
          v-layout(column="" align-center="" justify-center="")
            .headline.white--text.mb-4.text-center Web development has never been easier
            em Kick-start your application today
            v-btn.mt-12(color="blue lighten-2" dark="" large="" href="/pre-made-themes")
              | Get Started
      section
        v-container(grid-list-xl="")
          v-layout.my-12(row="" wrap="" justify-center="")
            v-flex(xs12="" sm4="")
              v-card.transparent(flat="")
                v-card-title.layout.justify-center(primary-title="")
                  .headline Info
                v-card-text
                  | Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                  | Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  | Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
            v-flex(xs12="" sm4="" offset-sm1="")
              v-card.transparent(flat="")
                v-card-title.layout.justify-center(primary-title="")
                  .headline Contact us
                v-card-text
                  | Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                v-list.transparent
                  v-list-item
                    v-list-item-action
                      v-icon.blue--text.text--lighten-2 mdi-phone
                    v-list-item-content
                      v-list-item-title ~99887766
                  v-list-item
                    v-list-item-action
                      v-icon.blue--text.text--lighten-2 mdi-map-marker
                    v-list-item-content
                      v-list-item-title Ariana, TN
                  v-list-item
                    v-list-item-action
                      v-icon.blue--text.text--lighten-2 mdi-email
                    v-list-item-content
                      v-list-item-title MEVN@MEVN.com
      v-footer(color="blue darken-2")
        v-layout(row="" wrap="" align-center="")

</template>

<script>
// @ is an alias to /src
import AuthModal from "@/components/auth";

export default {
  name: "Home",
  components: {
    "auth-modal": AuthModal
  },
  data: () => ({
    modal: false
  }),
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  watch: {
    // "$auth.isAuthenticated": {
    //   immediate: true,
    //   handler(val) {
    //     if(val === true) {
    //       let user_url = this.auth_type ;
    //       this.$router.replace(`/${user_url}/dashboard`);
    //     }
    //   }
    // }
  },
  methods: {
    handleClick(val) {
      console.log(val);
    },
    // Log the user in
    login() {},
    // Log the user out
    logout() {}
  }
};
</script>
