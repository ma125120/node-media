import { computed, onMounted, reactive, toRefs } from 'vue';
import { video } from './api';

export const App = {
  template: `
  <div class="flex">
    <div>
      <input type="url" class="url-input" @input="setUrl" />
      <div class="btn query-btn" @click="getInfo">
        查询是否为有效视频源
      </div>
    </div>
    url: {{state.url}}
    <Child>{() => 'bar'}</Child>
  </div>
  `,
  setup() {
    const state = reactive({
      url: '',
    });
    const setUrl = evt => {
      state.url = evt.target.value;
    };
    const getInfo = async () => {
      console.log(state.url);
      const res = await video.info({ url: state.url });
      console.log(res);
    };

    return {
      ...toRefs(state),
      getInfo,
    };
  },
};

function Child(_, { slots }) {
  return <div onClick={() => console.log('hello')}>{slots.default()}</div>;
}
