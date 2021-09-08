import { render, h } from 'vue'
import Notification from './index.vue'
import { NotifyParams, NotifyQueue } from './types'

let seed = 1
let pool :NotifyQueue = [];

const Notify = (opts: NotifyParams) => {
  if(typeof opts === 'string') opts = { title: opts }

  let offset = opts.offset || 20;
  pool.forEach(vm => {
    offset += (vm.el ? vm.el.offsetHeight : 0) + 16
  })
  offset += 16

  let id = 'notify_' + seed ++;
  opts = {
    ...opts,
    id,
    offset,
    onClose(){
      close(id)
    }
  }

  const div = document.createElement('div')
  const vm = h(Notification, opts)
  if(vm.props) vm.props.onDestroy = () => render(null, div)

  render(vm, div)
  pool.push(vm)
  document.body.appendChild((div.firstElementChild as HTMLElement))
}

['success', 'warning', 'error', 'info'].forEach(type => {
  Notify[type] = (opts: any) => {
    if(typeof opts === 'string') opts = { message: opts }
    Notify(opts)
  }
})

const close = (id: string) => {
  const idx = pool.findIndex(vm => vm.component?.props.id === id)
  if(idx === -1) return;

  let removeHeight = pool[idx].el?.offsetHeight
  pool.splice(idx, 1)
  if(!pool.length) return;

  for( let i = idx; i < pool.length; i++ ) {
    let pos = parseInt(pool[i].el?.style.top) - removeHeight - 16;
    let init = pool[i].component
    if(init) init.props.offset = pos;
  }
}

export default Notify