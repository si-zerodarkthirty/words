<template>
  <div class="list-none my-8">
    <router-link :to=" '/post/' + user.id + '/' + post.id">
      <h2 class="text-xl">{{ post.title }}</h2>
    </router-link>
    <div class="flex mt-2">
      <div 
        class="w-10 h-10 bg-cover bg-center rounded-full border border-black mr-2"
        :style=" 'background-image: url(' + user.photoURL + ')' "
      ></div>
      <div>
        <p>{{ user.displayName }}</p>
        <p class="text-xs">{{ post.createdAt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  props: ['post'],
  data() {
    return {
      user: {}
    }
  },
  firestore() {
    return {
      user: db.collection('users').doc(this.$props.post.uid)
    }
  }
}
</script>