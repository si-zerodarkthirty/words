<template>
  <div>
    <h2 class="text-2xl">Create</h2>
    <input 
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      type="text"
      placeholder="Title"
      v-model="title"
    >
    <input 
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      type="text"
      placeholder="Image URL"
      v-model="image"
    >
    <div
      v-if="image"
      class="w-64 h-32 shadow rounded my-3 bg-cover bg-center"
      :style="'background-image: url(' + image + ')'"
    ></div>
    <input 
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      type="text"
      placeholder="Tag"
      v-model="tag"
      @keypress.enter="addTag"
    >
    <div 
      v-if="tags.length > 0"
      class="flex"
    >
      <li 
        v-for="(tag,idx) in tags"
        :key="idx"
        class="list-none bg-gray-200 mb-2 mr-2 py-1 px-2 rounded"
      >
        {{ tag }}
        <span 
          class="ml-1 cursor-pointer"
          @click="removeTag"
        >X</span>
      </li>
    </div>
    <textarea 
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      cols="30" 
      rows="10"
      placeholder="Content"
      v-model="content"
    ></textarea>
    <button 
      class="focus:outline-none"
      @click="publish"
    >
      Submit
    </button>
  </div>
</template>

<script>
import { auth } from '@/main'
import { db } from '@/main'
export default {
  data() {
    return {
      title: '',
      tags: [],
      image: '',
      content: '',
      tag: '',
      currentUser: {}
    }
  },
  created() {
    auth.onAuthStateChanged(user => { 
      this.currentUser = user
    })
  },
  methods: {
    addTag() {
      this.tags.push(this.tag),
      this.tag = ''
    },
    removeTag(idx) {
      this.tags.splice(idx,1)
    },
    publish() {
      const date = this.$date(new Date(), "DD MMMM, YYYY")
      db.collection('posts').add({
        title: this.title,
        tags: this.tags,
        image: this.image,
        content: this.content,
        createdAt: date,
        uid: this.currentUser.uid
      })
      .then((post) =>
        this.$router.push('/post/' + this.post.uid + '/' + this.post.id),
        alert('The post got published!')
      )
    }
  }
}
</script>