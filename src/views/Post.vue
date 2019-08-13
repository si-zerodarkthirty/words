<template>
  <div>
    <h2 class="text-center text-3xl">{{ post.title }}</h2>
    <div class="flex justify-center">
      <li 
        v-for="(tag,idx) in post.tags"
        :key="idx"
        class="list-none m-1 border border-black p-1 px-3 rounded-full text-xs"
      >
        {{ tag }}
      </li>
    </div>
    <div 
      v-if="post.image"
      class="w-full h-64 bg-cover bg-center my-8"
      :style=" 'background-image: url(' + post.image + ')' "
    ></div>
    <div class="flex mb-8">
      <div 
        class="w-10 h-10 rounded-full bg-cover bg-center mr-2 border border-black"
        :style=" 'background-image: url(' + user.photoURL + ')' "
      ></div>
      <div>
        <p>{{ user.displayName }}</p>
        <p class="text-xs">{{ post.createdAt }}</p>
      </div>
      <div class="ml-5">
        <router-link :to=" '/update/' + post.id ">
          <button class="mx-2 mt-2 focus:outline-none">edit</button>
        </router-link>
        <button 
          @click="remove"
          class="mx-2 mt-2 focus:outline-none"
        >delete</button>
      </div>
    </div>
    <div
      class="text-sm leading-loose content"
      v-html="post.content"
    ></div>
  </div>
</template>

<script>
import { db } from '@/main'
export default {
  data() {
    return {
      post: {},
      user: {}
    }
  },
  firestore() {
    return {
      post: db.collection('posts').doc(this.$route.params.id),
      user: db.collection('users').doc(this.$route.params.uid)
    }
  },
  methods: {
    remove() {
      if (window.confirm('Are you sure to delete is post?')) {
        db.collection('posts').doc(this.$route.params.id).delete()
        .then(
          this.$router.push('/'),
          alert('The post was deleted.')
        )
      }
    }
  }
}
</script>