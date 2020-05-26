<template>
  <div id="root" :class="isBgBlue ? 'bg-blue' : ''">
    <div>Home</div>
    <button @click="sayHello">Click!</button>
    <span>is backgroud blue</span>
    <input type="checkbox" v-model="isBgBlue"/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isBgBlue: this.$store.state.isBgBlue
    }
  },
  methods: {
    sayHello() {
      alert('Hello!')
    }
  }
}
</script>

<style scoped>
.bg-blue {
  background-color: cornflowerblue;
}
</style>