<template lang="pug">
v-dialog(v-model="dialog" max-width="500px")
  v-tabs(
    v-model="tab"
    dark
    grow
    background-color="deep-purple accent-4"
    class="elevation-2")
    v-tabs-slider
    v-tab(:key="0") Login
    v-tab(:key="1") Register

    v-tab-item(:key="0")
      v-card
        v-card-title
          v-row.headline(justify="center") Login
        v-card-text
          v-alert(
            v-if="login_form.errors"
            text
            type="error"
            border="left") {{login_form.errors}}
          v-form(v-model="login_form.valid" ref="login_form")
            v-text-field(
              v-model="login_form.data.email"
              filled
              type="email"
              label="Email"
              :rules="rules.email")
            v-text-field(
              v-model="login_form.data.password"
              filled
              type="password"
              label="Password"
              :rules="rules.password")
            v-select(
              filled
              v-model="login_form.user_type"
              :items="user_types")
            v-btn(color="primary" block large @click="login") Login
        v-card-actions
    v-tab-item(:key="1")

      v-card(v-show="!register_form.setup")
        v-card-title
          v-row.headline(justify="center") Register
        v-card-text
          v-container
            v-form(v-model="register_form.valid" ref="register_form")
              v-alert(
                v-if="register.errors"
                text
                type="error"
                border="left") {{register.errors}}
              v-row
                v-col(cols="6")
                  v-text-field(
                    filled
                    placeholder="First name"
                    v-model="register_form.data.firstName"
                    :rules="rules.name")
                v-col(cols="6")
                  v-text-field(
                    filled
                    placeholder="Last name"
                    v-model="register_form.data.lastName"
                    :rules="rules.name")
              //- v-col(cols="12")
              v-text-field(
                filled
                placeholder="Email"
                v-model="register_form.data.email"
                :rules="rules.email")
              v-text-field(
                type="password"
                filled
                placeholder="Password"
                v-model="register_form.data.password"
                :rules="rules.password")
              v-text-field(
                type="password"
                filled
                placeholder="Repeat password"
                v-model="register_form.data.password_check"
                :rules="[pass_match]")
              v-select(
                filled
                v-model="register_form.user_type"
                :items="user_types")
              v-btn(
                v-if="register_form.user_type == 'pharmacy'"
                color="primary"
                block large
                @click="next") Next
              v-btn(
                v-else
                color="primary"
                block large
                @click="register") Register

      v-card(v-show="register_form.user_type == 'pharmacy' && register_form.setup")
        v-card-title
          v-row.headline(justify="center") Account Setup
        v-card-text
          v-container
            v-form(ref="setup_form")
              v-alert(
                v-if="register_form.errors"
                text
                type="error"
                border="left") {{register_form.errors}}
              template(v-if="register_form.user_type == 'pharmacy'")
                //- span Please provide your pharmacy's informations
                v-text-field(
                  filled
                  label="Pharmacy name"
                  v-model="register_form.data.pharmaName"
                  :rules="rules.name")
                v-text-field(
                  filled
                  label="Address"
                  v-model="register_form.data.address"
                  :rules="rules.address")
                v-text-field(
                  filled
                  label="Phone number"
                  v-model="register_form.data.phone"
                  v-mask="phone_mask"
                  :rules="rules.phone")
                v-row
                  v-col(cols="6")
                    v-text-field(
                      filled
                      type="number"
                      min="0"
                      max="23"
                      label="Opening hour"
                      v-model="register_form.data.hours.opening"
                      :rules="rules.hour")
                  v-col(cols="6")
                    v-text-field(
                      filled
                      type="number"
                      min="0"
                      max="23"
                      label="Closing hour"
                      v-model="register_form.data.hours.closing"
                      :rules="rules.hour")
                  span Please provide your pharmacy's location
                  v-col(cols="6")
                    v-text-field(
                      filled
                      type="number"
                      label="Longitude"
                      v-model="register_form.data.coords.lng"
                      :rules="rules.lng")
                  v-col(cols="6")
                    v-text-field(
                      filled
                      type="number"
                      label="Latitude"
                      v-model="register_form.data.coords.lat"
                      :rules="rules.lat")
                v-row
                  v-btn(
                    text
                    color="primary"
                    large
                    @click="register_form.setup = false") Cancel
                  v-btn(
                    color="primary"
                    large
                    @click="register") Register

</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  props: ['value'],
  directives: {
    mask,
  },
  data: function() {
    return {
      tab       : 0,
      login_form: {
        valid    : false,
        errors   : '',
        user_type: 'patient',
        data     : {
          email   : '',
          password: ''
        }
      },
      register_form: {
        valid: false,
        errors: '',
        user_type: 'pharmacy',
        setup: false,
        data: {
          email         : '',
          firstName     : '',
          lastName      : '',
          pharmaName    : '',
          address       : undefined,
          phone         : '',
          password      : '',
          password_check: '',
          coords        : {
            lng: '',
            lat: ''
          },
          hours: {
            opening: '',
            closing: ''
          }
        }
      },
      user_types: [
        {text: 'Patient', value: 'patient'},
        {text: 'Pharmacy', value: 'pharmacy'},
        {text: 'Doctor', value: 'doctor'},
      ],
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        name: [
          v => !!v || 'Field is required',
          v => v.length >= 3 || 'Value must be greater than 3 characters',
        ],
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Value must be greater than 8 characters',
        ],
        lng: [
          v => !!v || 'Longitude is required',
          v => Math.abs(v) <= 180 || 'Value must be between 0 and 180',
        ],
        lat: [
          v => !!v || 'Latitude is required',
          v => Math.abs(v) <= 90 || 'Value must be between 0 and 90',
        ],
        hour: [
          v => !!v || 'Value is required',
          v => Math.abs(v) <= 23 || 'Value must be between 0 and 23',
        ],
        address: [
          v => !!v || 'Address is required',
          v => !!v && v.length < 128 || 'Address is too long',
        ],
        phone: [
          v => !!v || 'Phone is required',
          v => /^[2-9][0-9]{7}$/.test(v.replace( /\s/g, '')) || 'Invalid phone number.',
        ]
      },
      phone_mask: '## ### ###',
    }
  },
  computed: {
    dialog: {
      get: function() { return this.value},
      set: function(val) {this.$emit('input', val)},
    }
  },
  methods: {
    pass_match(v) {
      return v == this.register_form.data.password || 'Value must match the password';
    },
    next() {
      if(!this.$refs.register_form.validate()) return;
      this.$refs.setup_form.resetValidation();
      this.register_form.setup = true;
    },
    register() {
      let vm = this;
      let fd = vm.register_form.data; // form data
      if(!vm.$refs.setup_form.validate()) return;
      let payload = {
        type: vm.register_form.user_type,
        infos: {
          firstName  : fd.firstName,
          lastName   : fd.lastName,
          name       : fd.pharmaName,
          email      : fd.email,
          password   : fd.password,
          password2  : fd.password_check,
          address    : fd.address,
          phoneNumber: fd.phone.replace( /\s/g, ''), // remove spaces
          openingHour: 8,
          closingHour: 19,
          coordinates: [fd.coords.lng, fd.coords.lat]
        }
      };

      // call store
      vm.$store.dispatch('register', payload)
      .then(() => {
        vm.$store.commit('setUser', {email: fd.email});
        vm.redirect(vm.register_form.user_type)})
      .catch(() => vm.register_form.errors = "Error registering account!");
    },
    login() {
      let vm = this;
      let fd = vm.login_form.data; // form data
      if(!vm.$refs.login_form.validate()) return;

      let payload = {
        type: vm.login_form.user_type,
        infos: fd
      };
      // call store
      vm.$store.dispatch('login', payload)
      .then(() => {
        vm.$store.commit('setUser', {email: fd.email});
        vm.redirect(vm.login_form.user_type)
      })
      .catch(() => vm.login_form.errors = "Error Login!");
    },
    redirect (type = "patient") {
      let routes = {
        pharmacy: 'dashboard_pharma',
        patient : 'dashboard_patient',
        doctor  : 'dashboard_doctor',
      };
      this.$router.push({name: routes[type]});
    }
  }

}
</script>