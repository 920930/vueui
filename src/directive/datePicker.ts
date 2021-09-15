import { watch, ref, watchEffect } from "vue";
import { DirectiveBinding } from "vue"

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>){
    let oPicker = el.querySelector('.el-date-picker') as HTMLDivElement
    let oInput = el.querySelector('input') as HTMLInputElement
    
    oInput.addEventListener('focus', () => {
      oPicker.style.display = 'block'
    })

    oInput.addEventListener('blur', () => {
      oPicker.style.display = 'none'
    })
  }
}