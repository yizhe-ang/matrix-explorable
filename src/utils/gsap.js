import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { gsap } from 'gsap'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // ScrollTrigger.defaults({
  //   fastScrollEnd: true,
  // })
  // ScrollTrigger.normalizeScroll(true)
  // ScrollTrigger.config({ ignoreMobileResize: true })

  gsap.registerPlugin(ScrollToPlugin)
}

export * from 'gsap'
export { ScrollTrigger }
