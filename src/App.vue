<template>
  <div id="app" class="appBody">
    <transition name="page-move">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

