<template>
  <div style="text-align: center">
    <div id="_uploader">vue-01 loading...</div>
    <br />
    <div id="_other">vue-02 loading...</div>
    <Button>ant-design-vue 按钮</Button>
    <ElButton>element-plus 按钮</ElButton>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
import { ElButton } from 'element-plus'

export default {
  name: 'HomePage',
  components: {
    Button,
    ElButton
  }
}
</script>
