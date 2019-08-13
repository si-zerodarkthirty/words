<template>
  <div>
    <h2 class="text-2xl">Update</h2>
    <input 
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      type="text"
      placeholder="Title"
      v-model="post.title"
    >
    <input 
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      type="text"
      placeholder="Image URL"
      v-model="post.image"
    >
    <div
      v-if="post.image"
      class="w-64 h-32 shadow rounded my-3 bg-cover bg-center"
      :style="'background-image: url(' + post.image + ')'"
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
          @click="removeTag(idx)"
        >X</span>
      </li>
    </div>
    <textarea 
      class="block w-full border border-black my-5 p-2 focus:outline-none"
      cols="30" 
      rows="10"
      placeholder="Content"
      v-model="post.content"
    ></textarea>
    <button 
      class="focus:outline-none"
      @click="update"
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
      tag: '',
      tags: [],
      post: {}
    }
  },
  firestore() {
    return {
      post: db.collection('posts').doc(this.$route.params.id)
    }
  },
  created() {
    db.collection('posts').doc(this.$route.params.id)
      .get()
      .then((item) => {
        this.tags = item.data().tags;
      });
  },
  methods: {
    addTag() {
      this.tags.push(this.tag),
      this.tag = ''
    },
    removeTag(idx) {
      this.tags.splice(idx,1)
    },
    update() {
      const date = this.$date(new Date(), "DD MMMM, YYYY")
      db.collection('posts').doc(this.post.id).set({
        title: this.post.title,
        tags: this.tags,
        image: this.post.image,
        content: this.post.content,
        createdAt: date
      }, {merge: true} )
      .then((post) =>
        this.$router.push('/post/' + this.post.uid + '/' + this.post.id),
        alert('The post got updated!')
      )
    }
  }
}
</script>