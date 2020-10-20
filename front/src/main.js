import { createApp } from 'vue';
import App from './App.vue';
// import './style/index.less';
import './style';
import Element3 from 'element3';
import Button from './components/button/index.vue';
import Tag from './components/tag/index.tsx';

createApp(App)
  .component(Button.name, Button)
  .component(Tag.name, Tag)
  .mount('#app');
