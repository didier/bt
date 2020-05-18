const mouseFollow = document.querySelector('.mouse-follow')

window.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event
  mouseFollow.setProperty('--x', `${clientX}px`)
  mouseFollow.setProperty('--y', `${clientY}px`)
})
