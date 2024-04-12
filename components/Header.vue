<template>
  <header class="flex items-center justify-center bg-white shadow md:justify-start">
    <SvgLogo class="ml-4 md:ml-2" />
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  box-shadow: 0 4px 2px -2px rgba(128, 128, 128, 0.192);
}
</style>
