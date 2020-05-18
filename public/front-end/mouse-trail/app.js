const trails = [...document.querySelectorAll('.trail')]
const trailsWrapper = document.querySelector('.trails-wrapper')

window.addEventListener('mousemove', (event) => {
  trails.forEach((trail, index) => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        // trail.style.setProperty('--x', `${event.clientX}px`)
        // trail.style.setProperty('--y', `${event.clientY}px`)
        trail.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      })
    }, index * 50)
  })
})
