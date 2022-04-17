<template>
  <div class="select-box">
    <select class="select" :value="selectedOption" @change="handleSelectChange">
      <option value v-if="placeholder != ''">{{placeholder}}</option>
      <template v-for="option in options">
        <option
          :key="option.id"
          :value="option.id"
        >
          {{option.name}}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LabelSelectBox',

  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedOption: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleSelectChange(e) {
      this.$emit('handleSelectChange', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.select-box{
  position: relative;
  display: flex;
  width: 100%;
  background-color: $white;
  border-radius: 6px;
  &:before{
    content: '';
    position: absolute;
    z-index: 2;
    top: 13px;
    right: 10px;
    width: 0;
    height: 0;
    border: 4px dashed;
    border-color: #888 transparent;
    pointer-events: none;
    border-bottom-style: solid;
    border-top: none;
  }
  .select{
    position: relative;
    width: 100%;
    padding-left: 10px;
    margin: 0;
    font-size: 14px;
    height: 40px;
    text-shadow: 0 1px white;
    background: transparent !important;
    border: solid 1px $deepGray;
    border-radius: 0;
    outline: none;
    cursor: pointer;
  }
  &:after{
    content: '';
    position: absolute;
    z-index: 2;
    top: 13px;
    right: 10px;
    width: 0;
    height: 0;
    border: 4px dashed;
    border-color: #888 transparent;
    pointer-events: none;
    margin-top: 7px;
    border-top-style: solid;
    border-bottom: none;
  }
}
</style>
