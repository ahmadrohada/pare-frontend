import Vue from 'vue'
import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseAlert from '@/components/BaseAlert.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import Card from '@/components/Cards/Card.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';
import Modal from '@/components/Modal.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


import moment from 'moment'



import { Input, InputNumber, Tooltip, Popover } from 'element-ui';
import {Table, TableColumn } from 'element-ui'
import {Aside,  Menu,Submenu,MenuItem,MenuItemGroup} from 'element-ui'
import {Avatar} from 'element-ui'
import {Progress} from 'element-ui'
import {Tabs,TabPane} from 'element-ui'
import {Switch} from 'element-ui'
import {Col,Row,Tree,Button} from 'element-ui'
import {Dialog,Form,FormItem , Select,Option} from 'element-ui'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseDropdown.name, BaseDropdown);

Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BaseButton.name, BaseButton);
Vue.component(BaseAlert.name, BaseAlert);

Vue.component(Card.name, Card);
Vue.component(Modal.name, Modal)
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);

Vue.prototype.moment = moment

Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(VueSweetalert2);

Vue.use(VueMaterial)

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Avatar)
Vue.use(Progress)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Switch)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tree)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)











