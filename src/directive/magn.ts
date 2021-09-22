import { getStyle } from "../utils";

export default {
  mounted(el: HTMLElement){
    const magn = el.querySelector('.el-magn-box') as HTMLElement,
          magnImg = el.querySelector('.el-magn-box--image') as HTMLImageElement,
          magnWidth = getStyle(magn, 'width'),
          magnHeight = getStyle(magn, 'height'),
          imgWidth = getStyle(el, 'width'),
          imgHeight = getStyle(el, 'height'),
          imgX = el.offsetLeft,
          imgY = el.offsetTop;

    const init = () => {
      el.addEventListener('mouseover', e => {
        magn.classList.add('show')
        const {x, y, mouseX, mouseY} = getXY(e)
        mangWapper(x, y, mouseX, mouseY)
        document.addEventListener('mousemove', handleMouseMove, false)
      })
      el.addEventListener('mouseout', e => {
        magn.classList.remove('show')
        document.removeEventListener('mousemove', handleMouseMove, false)
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const {x, y, mouseX, mouseY} = getXY(e)
      mangWapper(x, y, mouseX, mouseY)
    }

    const mangWapper = (x: number, y: number, mouseX: number, mouseY: number) => {
      magn.style.left = x + 'px';
      magn.style.top = y + 'px';
      magnImg.style.left = -x + 'px'
      magnImg.style.top = -y + 'px'

      if(x < 0 || y < 0 || mouseX > imgWidth || mouseY > imgHeight){
        magn.classList.remove('show')
        document.removeEventListener('mousemove', handleMouseMove, false)
      }
    }

    const getXY = (e: MouseEvent) => {
      return {
        x: e.pageX - imgX - magnWidth / 2,
        y: e.pageY - imgY - magnHeight / 2,
        mouseX: e.pageX - imgX,
        mouseY: e.pageY - imgY
      }
    }

    init()
  }
}