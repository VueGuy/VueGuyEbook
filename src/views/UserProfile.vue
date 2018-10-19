<template>
    <div id="userProfile">
        <NavBar/>
        <b-container>
            <b-row>
                <b-col></b-col>
                <b-col cols="6">
                    <h2>Edit user inforamtion</h2>
    
                    <b-alert variant="success" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
                        User information has been saved!
                    </b-alert>
                    <b-form @submit="onSubmit" id="userForm">
                        <b-form-group>
                            <b-form-group id="emailGroup" label="Email address:" label-for="emailInput" description="Registered email cannot be changed">
                                <b-form-input id="emailInput" type="email" v-model="form.email" required :value="email" readonly>
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="nameGroup" label="Your Name:" label-for="nameInput">
                                <b-form-input id="nameInput" type="text" v-model="form.name" required :value="name">
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
                            <b-button type="submit" variant="primary" :disabled="disableButton">Submit</b-button>
                        </b-form-group>
                    </b-form>
                </b-col>
                <b-col></b-col>
            </b-row>
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
      positions: [
        {
          text: "Change position...",
          value: null
        },
        "Admin",
        "Office",
        "Employee"
      ],
      //define to data from user registered data
      email: "",
      name: "",
      company: "",
      position: "",
      fullPosition: "",
      userId: "",
      showDismissibleAlert: false,
      disableButton: false
    };
  },

  created() {
    var vm = this;
    var userId = this.$route.params.id;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //Data from database with passed user id
        var db = firebase.firestore();
        var userRef = db.collection("users").doc(userId);
        //check users position and manage button
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(function(doc) {
            if (doc.data().position != "Admin") {
              vm.disableButton = true;
            }
          });

        userRef.get().then(function(doc) {
          if (doc.exists) {
            var userData = doc.data();
            vm.email = userData.email;
            vm.name = userData.name;
            vm.company = userData.company;
            vm.position = userData.position;
            vm.fullPosition = "User's position: " + userData.position;
            vm.userId = userId;
          } else {
            console.log("User has no data yet");
          }
        });
      }
    });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      var name = this.name;
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
    }
  }
};
</script>