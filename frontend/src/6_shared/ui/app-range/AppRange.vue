<script setup lang="ts">
interface IProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
}

const {
  modelValue = 0,
  min = 0,
  max = 100,
  step = 1,
  label = "Значение",
  disabled = false,
} = defineProps<IProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
</script>

<template>
  <div class="app-range" :class="{ 'app-range--disabled': disabled }">
    <label class="app-range__label">{{ label }}</label>
    <div class="app-range__container">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        class="app-range__input"
        @input="
          emit(
            'update:modelValue',
            Number(($event.target as HTMLInputElement).value)
          )
        "
      />
      <span class="app-range__value">{{ modelValue }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-range {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__label {
    font-size: 14px;
    color: #606266;
  }

  &__container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__input {
    flex: 1;
    height: 4px;
    -webkit-appearance: none;
    background: #dcdfe6;
    border-radius: 2px;
    outline: none;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      background: #42b983;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s;
    }

    &:disabled::-webkit-slider-thumb {
      background: #c0c4cc;
      cursor: not-allowed;
    }

    &::-webkit-slider-thumb:hover {
      background: #42b983;
    }

    &::-moz-range-thumb {
      width: 16px;
      height: 16px;
      background: #42b983;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s;
      border: none;
    }

    &:disabled::-moz-range-thumb {
      background: #c0c4cc;
      cursor: not-allowed;
    }

    &::-moz-range-thumb:hover {
      background: #66b1ff;
    }
  }

  &__value {
    min-width: 30px;
    text-align: right;
    font-size: 14px;
    color: #606266;
  }
}
</style>
