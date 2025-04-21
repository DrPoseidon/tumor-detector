<script setup lang="ts">
interface IOption {
  value: string | number;
  text: string;
}

interface IProps {
  modelValue?: string | number;
  options: IOption[];
  placeholder?: string;
  disabled?: boolean;
}

const {
  modelValue = undefined,
  options,
  placeholder = "Выберите значение",
  disabled = false,
} = defineProps<IProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<template>
  <select
    class="app-dropdown"
    :value="modelValue"
    :disabled="disabled"
    @change="
      emit('update:modelValue', ($event.target as HTMLSelectElement).value)
    "
  >
    <option value="" disabled selected>{{ placeholder }}</option>
    <option
      v-for="(option, index) in options"
      :key="`${option.value}-${index}`"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped>
.app-dropdown {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  transition: border-color 0.2s;
  cursor: pointer;
  outline: none;
  width: 100%;
  height: max-content;
}

.app-dropdown:hover {
  border-color: #c0c4cc;
}

.app-dropdown:focus {
  border-color: #42b983;
}

.app-dropdown:disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.app-dropdown option {
  padding: 8px;
}
</style>
