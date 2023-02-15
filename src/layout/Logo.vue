<template>
  <div class="container_logo" @click="router.push('/index')">
    <span>
      <Logo name="logo" width="34" height="34"></Logo>
    </span>
    <span class="name" v-show="props.isShow">NaiveAdmin</span>
  </div>
</template>

<script lang='ts' setup>
import Logo from '@/components/SvgIcon/SvgIcon.vue'
const router = useRouter()
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="less">
.container_logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // .name {
  //   transition: all 0s !important;
  // }
}
</style>
