<template>
    <b-navbar toggleable="md" type="light" variant="warning">
        <b-container>
    
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    
            <b-navbar-brand href="/">NavBar</b-navbar-brand>
    
            <b-collapse is-nav id="nav_collapse">
    
                <b-navbar-nav>
                    <b-nav-item to="/users">Users</b-nav-item>
                    
                </b-navbar-nav>
    
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/profile"><i class="material-icons">account_circle</i></b-nav-item>
                    <b-button v-on:click="logOut" size="sm" variant="outline"><i class="material-icons">exit_to_app</i></b-button>
                    
                </b-navbar-nav>
    
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script lang="ts">
import firebase from "firebase";
export default {
  methods: {
    logOut() {
      firebase.auth().signOut();
    }
  }
};
</script>


<style scoped>
</style>