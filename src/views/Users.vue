<template>
  <div id="users">
    <NavBar/>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
  
          <b-list-group>
            <b-list-group-item v-for="user in users">
              {{ user.name }} - {{ user.position }} at {{ user.company }} 
              <b-button :to="{ name: 'userprofile', params: { id: user.id }}" size="small" variant="outline secondary"><i class="material-icons">edit</i></b-button>
            </b-list-group-item>
          </b-list-group>
  
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
        //reserve for user data
        users: []
      };
    },
    created() {
      var vm = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var db = firebase.firestore();
          var users = [];
          db.collection("users")
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                //push user data to users
                var data = Object.assign({"id":doc.id},doc.data())
                users.push(data);
              });
            });
          //assign user array to array from above
          vm.users = users;
        }
      });
    }
  };
</script>