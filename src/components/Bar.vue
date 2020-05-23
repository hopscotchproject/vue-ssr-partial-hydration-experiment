<template>
  <div>
    <div>Bar</div>
    <button @click="sayHello">Click!</button>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  methods: {
    sayHello() {
      alert('Bar!')
    }
  }
}
</script>