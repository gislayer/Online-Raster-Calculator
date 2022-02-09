import { createApp } from 'vue';
//import EventBus from './components/event-bus';
import App from './App.vue'
import "semantic-ui-css/semantic.min.css"
import 'ol/ol.css';
import store from './store/index'
const app = createApp(App);
app.use(store);
app.mount('#app')
