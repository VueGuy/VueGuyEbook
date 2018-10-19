<template>
  <div id="profile">
    <NavBar/>
    <b-container>
      <h2>Profile information</h2>
  
      <b-alert variant="success" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
        Profile information has been saved!
      </b-alert>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="profileForm">
        <b-form-group id="emailGroup" label="Email address:" label-for="emailInput" description="Registered email cannot be changed">
          <b-form-input id="emailInput" type="email" v-model="form.email" required :value="email" readonly>
          </b-form-input>
        </b-form-group>
        <b-form-group id="nameGroup" label="Your Name:" label-for="nameInput">
          <b-form-input id="nameInput" type="text" v-model="form.name" required :value="displayName">
          </b-form-input>
        </b-form-group>
        <b-form-group id="companyGroup" label="Company name" label-for="companyInput">
          <b-form-input id="companyInput" type="text" v-model="form.company" required :value="company">
          </b-form-input>
        </b-form-group>
        <b-form-group id="positionGroup" v-bind:label="fullPosition" label-for="positionInput">
          <b-form-select id="positionInput" :options="positions" v-model="form.position">
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar.vue";
  import firebase from "firebase";
  
  export default {
    components: {
      NavBar
    },
    data() {
      return {
        form: {
          email: "",
          name: "",
          company: "",
          position: null
        },
        positions: [{
            text: "Change position...",
            value: null
          },
          "Admin",
          "Office",
          "Employee"
        ],
        //define to data from user registered data
        email: "",
        displayName: "",
        company: "",
        position: "",
        fullPosition: "",
        //need "show" to reset form
        show: true,
        showDismissibleAlert: false
      };
    },
    created() {
      var vm = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //Data from user registration
          vm.user = user;
          vm.email = vm.user.email;
          vm.userId = vm.user.uid;
          vm.displayName = vm.user.displayName;
  
          //Data from database, if user has it
          var db = firebase.firestore();
          var userRef = db.collection("users").doc(vm.user.uid);
  
          userRef.get().then(function(doc) {
            if (doc.exists) {
              var userData = doc.data();
              vm.company = userData.company;
              vm.position = userData.position;
              vm.fullPosition = "Your position: " + userData.position;
            } else {
              console.log("User has no data yet");
            }
          });
        }
      });
    },
    methods: {
      logOut() {
        firebase.auth().signOut();
      },
      onSubmit(evt) {
        evt.preventDefault();
  
        var name = this.displayName;
        if (this.form.name.length > 0) {
          name = this.form.name;
        }
  
        var company = this.company;
        if (this.form.company.length > 0) {
          company = this.form.company;
        }
  
        var position = this.position;
        if (this.form.position != null) {
          position = this.form.position;
        }
  
        try {
          var db = firebase.firestore();
  
          db.collection("users")
            .doc(this.userId)
            .set({
              email: this.email,
              name: name,
              company: company,
              position: position
            });
  
          this.showDismissibleAlert = true;
        } catch (error) {
          console.log(error);
        }
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.email = "";
        this.form.name = "";
        this.form.company = "";
        this.form.position = "";
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
      }
    }
  };
</script>
