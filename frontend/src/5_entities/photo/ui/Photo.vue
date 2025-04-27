<script setup lang="ts">
const { clickable = true } = defineProps<{
  imgUrl: string;
  clickable?: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <img
    class="photo"
    :class="{ 'photo--clickable': clickable }"
    :src="imgUrl"
    @click="clickable && emit('click')"
  />
</template>

<style lang="scss" scoped>
.photo {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  transition: box-shadow 0.2s ease;

  &--clickable {
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 10px 5px lightgray;
    }
  }
}
</style>
