export default {
  mounted(el: HTMLElement, binding: any){
    const oInput = el.querySelector('.el-select--input') as HTMLElement,
          oUl = el.querySelector('.el-select--list') as HTMLUListElement,
          oIcon = el.querySelector('.el-select--icon') as HTMLElement,
          oLis = oUl.children

    const { disabled, modelValue } = binding.value
    if(disabled || !oInput) return;
    
    Array.from(oLis).forEach(dom => {
      let oli = (dom as HTMLLIElement)
      if(oli.dataset.v === modelValue) {
        oInput.tagName === 'INPUT' ? (oInput as HTMLInputElement).value = oli.innerText : oInput.innerText = oli.innerText
      }
    })

    oInput.addEventListener('click', (e: Event) => {
      e.stopPropagation()
      if(oUl.style.display === 'block') fnNone(oUl, oIcon)
      else fnBlock(oUl, oIcon)
    })

    oUl.addEventListener('click', (e: MouseEvent) => {
      let tar = e.target as HTMLLIElement
      if(tar.tagName === 'LI' || tar.tagName === 'SPAN') {
        oInput.tagName === 'INPUT' ? (oInput as HTMLInputElement).value = tar.innerText : oInput.innerText = tar.innerText
      } else {
        e.stopPropagation()
      }
      
    })

    document.body.addEventListener('click', () => {
      if(oUl.style.getPropertyValue('display').includes('block')) fnNone(oUl, oIcon)
    })
  },
}

const fnNone = (oUl: HTMLUListElement, oIcon: HTMLElement) => {
  oUl.style.display = 'none'
  oIcon.classList.remove('fa-angle-up')
  oIcon.classList.add('fa-angle-down')
}

const fnBlock = (oUl: HTMLUListElement, oIcon: HTMLElement) => {
  oUl.style.display = 'block'
  oIcon.classList.remove('fa-angle-down')
  oIcon.classList.add('fa-angle-up')
}