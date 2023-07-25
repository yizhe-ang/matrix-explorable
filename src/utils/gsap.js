import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { gsap } from 'gsap'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // ScrollTrigger.defaults({
  //   fastScrollEnd: true,
  // })
  // ScrollTrigger.normalizeScroll(true)
  // ScrollTrigger.config({ ignoreMobileResize: true })
}

export * from 'gsap'
export { ScrollTrigger }
