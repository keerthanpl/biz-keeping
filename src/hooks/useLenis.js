import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from './useReducedMotion.js'

export function useLenis() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return undefined
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduced])
}
