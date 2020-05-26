<template>
  <div>
    <div>Bar</div>
    <button @click="sayBar">Say Bar!</button>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  methods: {
    sayBar() {
      alert('Bar!')
    }
  }
}
</script>