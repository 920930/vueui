import type { App } from 'vue'

import Button from '@/components/Button/index.vue';
import Input from '@/components/Input/index.vue';
import Dialog from '@/components/Dialog/index.vue';
import Message from '../components/Message';
import Radio from '@/components/Radio/index.vue';
import RadioButton from '@/components/Radio/index-button.vue';
import Switch from '@/components/Switch/index.vue';
import { Select, Option } from '../components/Select';
import { Menu, MenuItem, SubMenu, MenuTree} from '../components/Menu';
import Notification from '../components/Notification'
import DatePicker from '../components/DatePicker';
import Magn from '../components/Magnifier'

const components = [Button, Input, Dialog, Radio, RadioButton, Switch, Select, Option, Menu, MenuItem, SubMenu, MenuTree, Notification, DatePicker, Magn];

export default {
  install(app: App, options: any) {
    components.forEach(cop => {
      app.component(cop.name, cop)
    })

    app.provide('message', Message)
    app.provide('notify', Notification)
  }
}
