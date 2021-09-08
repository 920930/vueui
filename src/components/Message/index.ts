import { compile, h, render } from 'vue'
import ElMessage from './index.vue'
import { MessageQueue, MessageParams, IMessage } from './types'

let seed = 1
const constance: MessageQueue = []

const Message = (opts: MessageParams) => {
  if(typeof opts === 'string') opts = { message: opts }

  let offset = opts.offset || 20
  constance.forEach(({vm}) => {
    offset += (vm.el.offsetHeight || 0) + 16
  })
  offset += 16
  let id = 'message_' + seed ++;
  opts = {
    ...opts,
    id,
    offset,
    onClose(){
      close(id)
    }
  }
  const div = document.createElement('div')
  const vm = h(ElMessage, opts)
  vm.props.onDestroy = () => render(null, div)

  render(vm, div)
  constance.push({vm})
  const firstEl = div.firstElementChild as HTMLElement
  document.body.appendChild(firstEl)
}

['success', 'warning', 'error', 'info'].forEach(type => {
  Message[type] = (opts: MessageParams) => {
    if(typeof opts === 'string') opts = { message: opts }
    opts.type = type
    Message(opts)
  }
})

const close = (id: string) => {
  const idx = constance.findIndex(({vm}) => vm.component.props.id === id)
  if(idx === -1) return;
  const removeHeight = constance[idx].vm.el.offsetHeight
  constance.splice(idx, 1)
  if(!constance.length) return

  for(let i = idx; i < constance.length; i++) {
    let pos = parseInt(constance[i].vm.el.style.top) - removeHeight - 16;
    constance[i].vm.component.props.offset = pos;
  }
}

export default Message