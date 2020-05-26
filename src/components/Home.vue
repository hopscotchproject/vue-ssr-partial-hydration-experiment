<template>
  <div id="root" :class="isBgBlue ? 'bg-blue' : ''">
    <div>Home</div>
    <button @click="sayHello">Click!</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['isBgBlue'],
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

.bg-blue {
  background-color: blue;
}
</style>