<template>
  <div id = "login">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'

export default {
  name: 'auth',
  mounted() {
    var uiConfig = {
      signInSuccessUrl: '/profile',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
      };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    },
}
</script>