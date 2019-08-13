<template>
  <div id="app">
    <Header />
    <main class="my-16 mx-auto">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="stylus">
main
  width: 95%
  max-width: 500px
</style>
