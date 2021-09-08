import { createVNode, render, VNode } from 'vue';
import { IMessage, IMessageOptions, MessageQueue, MessageParams } from './types'
import MessageController from './index.vue'

let seed = 1
const instances: MessageQueue = [];

const Message: IMessage = (opts: MessageParams) => {
  if( typeof opts === 'string' ) opts = { message: opts }

  let offset = opts.offset || 20
  instances.forEach(({vm}) => {
    offset += (vm.el.offsetHeight || 0) + 15
  })
  offset += 15

  const id = 'message_' + seed ++
  
  opts = {
    ...opts,
    offset,
    id,
    onClose(){
      close(id)
    }
  }

  const div = document.createElement('div')
  const vm = createVNode(MessageController, opts)
  vm.props.onDestroy = () => render(null, div)
  instances.push({vm})
  render(vm, div)
  document.body.appendChild(div.firstElementChild)
}

(['success', 'warning', 'error', 'info'] as const).forEach(type => {
  Message[type] = opts => {
    if( typeof opts === 'string' ) opts = { message: opts, type }
    else opts.type = type
    Message(opts)
  }
})

const close = (id: string) => {
  const idx = instances.findIndex( ( {vm} ) => {
    return vm.component.props.id === id
  })
  if(idx === -1) return

  const removeHeight = instances[idx].vm.el.offsetHeight
  instances.splice(idx, 1)
  if(instances.length < 1) return

  // for(let i = idx; i < instances.length; i++){
  //   let pos = parseInt(instances[i].vm.el.style.top) - removeHeight - 15
  //   instances[i].vm.component.props.offset = pos
  // }

  instances.forEach(item => {
    let pos = parseInt(item.vm.el.style.top) - removeHeight - 15
    item.vm.component.props.offset = pos
  })
}

export default Message