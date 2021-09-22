import { DirectiveBinding } from "vue"

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>){
    let oPicker = el.querySelector('.el-date-picker') as HTMLDivElement
    let oInput = el.querySelector('input') as HTMLInputElement
    
    el.addEventListener('click', (e) =>{
      let tar = e.target as HTMLElement;
      let parentNode = tar.parentNode as HTMLUListElement
      let nodeChilds = Array.from(parentNode.children)
      let tagName = tar.tagName

      if(tagName === 'LI' && nodeChilds.indexOf(tar) > 6) {
        setTimeout(() => {
          oPicker.style.display = 'none'
        }, 200)
      }
    })

    oInput.addEventListener('focus', () => {
      oPicker.style.display = 'block'
    })
  }
}