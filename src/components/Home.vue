<template>
  <div id="root">
    <div>Home</div>
    <button @click="sayHello">Click!</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    sayHello() {
      alert('Hello!')
    }
  }
}
</script>

<style scoped>
#root {
  background-color: orange;
}
</style>