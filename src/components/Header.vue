<template>
  <header class="fixed top-0 w-full p-3">
    <div class="flex justify-between">
      <router-link to="/">
        <h1 class="text-3xl font-bold">W.</h1>
      </router-link>
      <div 
        v-if="currentUser"
        class="flex"
      >
        <router-link to="/create">
          <button 
            class="mt-2 mr-5 focus:outline-none"
          >Write</button>
        </router-link>
        <div 
          class="w-10 h-10 rounded-full bg-cover bg-center mr-2"
          :style=" 'background-image: url(' + currentUser.photoURL + ')' "
        ></div>
        <div>
          <p>{{ currentUser.displayName }}</p>
          <p 
            class="-mt-1 text-sm cursor-pointer"
            @click="signOut"
          >Log Out</p>
        </div>
      </div>
      <div v-else>
        <button 
          class="cursor-pointer focus:outline-none"
          @click="signIn"
        >Sign In</button>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main'
import { auth } from '@/main'
export default {
  data() {
    return {
      currentUser: {}
    }
  },
  created() {
    auth.onAuthStateChanged(user => { 
      this.currentUser = user
    })
  },
  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
      .then((result) => {
        alert('Hello, '+result.user.displayName+'!')
        db.collection('users').doc(result.user.uid).set({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        })
      })
    },
    signOut () {
      if (window.confirm('Are You Sure to Sign Out?')) {
        auth.signOut()
        .then(() => {
          alert('You Safely Signed Out.')
          this.$router.push('/'),
          location.reload()
        })
      }
    }
  }
}
</script>