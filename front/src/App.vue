<template>
  <div class="">
    <div class="flex">
      <input type="url" class="url-input" v-model="url" />
      <n-button type="plain" :disabled="!url" @click="getInfo">查询</n-button>
      <n-button type="primary" :disabled="!url" :loading="loading" @click="format">转码</n-button>
    </div>
    <div class="area">
      <n-tag v-if="codec" :type="isValid ? 'success' : 'error'">视频编码：{{ codec }}，web端{{ isValid ? '' : '非' }}通用视频编码格式</n-tag>
    </div>
    <div v-if="loading" class="area">
      文件较大时，转码可能较慢，请耐心等待
    </div>
    <div class="area" v-if="downloadUrl">
      <a :href="downloadUrl" class="download-link">{{downloadUrl}}</a>
      <a :href="downloadUrl" class="n-button n-button--primary down-btn" download="1.mp4">点击即可访问</a>
    </div>
    <!-- <Child>{() => 'bar'}</Child> -->
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, toRefs } from 'vue';
import { video } from './api';
import Message from './components/message';

export default {
  setup() {
    const state = reactive({
      url: '',
      codec: '',
      isValid: undefined,
      downloadUrl: '',
      loading: false,
    });
    const getInfo = async () => {
      const res: any = await video.info({ url: state.url });
      if (!res) return ;

      state.codec = res.codec
      state.isValid = res.isValidMp4
      if (res.isValidMp4) {
        Message.success(`通用web视频格式`)
      } else {
        Message.error(`非通用web视频格式`)
      }
    };
    const format = async () => {
      state.loading = true
      const res: any = await video.format({ url: state.url }).catch(err => {
        state.loading = false
      });
      state.loading = false
      if (!res) return ;

      state.downloadUrl = res
    }

    return {
      ...toRefs(state),
      getInfo,
      format,
    };
  },
};

// function Child(_, { slots }) {
//   return <div onClick={() => console.log('hello')}>{slots.default()}</div>;
// }

</script>

<style scoped>
.area {
  margin-top: 24px;
}
.down-btn {
  margin-left: 10px;
}
</style>
