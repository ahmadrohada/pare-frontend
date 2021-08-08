import Vue from 'vue'
import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseAlert from '@/components/BaseAlert.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import Card from '@/components/Cards/Card.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';
import { Input, InputNumber, Tooltip, Popover } from 'element-ui';
import Modal from '@/components/Modal.vue';
import VueSweetalert2 from 'vue-sweetalert2';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {Table, TableColumn} from 'element-ui'

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
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(VueSweetalert2);

Vue.use(VueMaterial)
Vue.use(Table)
Vue.use(TableColumn)








