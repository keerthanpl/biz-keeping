import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(rootRef) {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !rootRef.current) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })
      gsap.utils.toArray('[data-rule]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [rootRef, reduced])
}
