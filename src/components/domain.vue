<style scoped>
  .domain {
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }

  .domain:hover {
    background-color: #f5f5f5;
  }

  .domain__text {
    margin: 5px 0;
  }

  .domain__delete {
    font-size: 11px;
    min-height: 12px;
    min-width: 30px;
    padding: 2px;
  }
</style>

<template>
  <li class="domain">
    <span class="domain__text">{{ domain }}</span>
    <button class="domain__delete" @click="$emit('delete')">X</button>
  </li>
</template>

<script lang="strict">
module.exports = {
  props: ['domain'],
};
</script>
