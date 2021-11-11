const links = Array.from(document.querySelectorAll('.nav-link'))
const containers = Array.from(document.querySelectorAll('[id]'))

links.forEach(link => {
  const href = link.getAttribute('href')
  const linked = links.filter(l => l.getAttribute('href') === href)

  link.addEventListener('mouseenter', function (e) {
    linked.forEach(l => l.classList.add('hover'))
  })

  link.addEventListener('mouseleave', function (e) {
    linked.forEach(l => l.classList.remove('hover'))
  })
})

window.addEventListener('scroll', updateActiveLink)
updateActiveLink()

function updateActiveLink() {
  const active = findActiveContainer()
  activateLink(active.id)
}

function findActiveContainer() {
  for (const container of containers) {
    const rect = container.getBoundingClientRect()
    const yMiddle = rect.bottom - window.innerHeight / 3
    if (yMiddle > 0) {
      return container
    }
  }
  return containers[0]
}

function activateLink(id) {
  const lookupHref = '#' + id
  links.forEach(l => l.classList.remove('active'))
  links.forEach(link => {
    const href = link.getAttribute('href')
    if (href === lookupHref) {
      link.classList.add('active')
    }
  })
}

// Apply parallax effect
const bg = Array.from(document.getElementsByClassName('section-header'))
window.addEventListener('scroll', updateParallaxes)
updateParallaxes()

function updateParallaxes() {
  bg.forEach(updateParallaxEffect)
}

function updateParallaxEffect(el) {
  const yOffset = window.scrollY * -0.333
  el.style.backgroundPositionY = yOffset + 'px'
}

// Force the browser to re-render when the user scrolls down
// Fixes issue with the navbar not being visible when the user scrolls down
window.addEventListener('scroll', function () {
  document.body.style.transform = 'scale(1)'
  document.body.offsetHeight
  document.body.style.transform = null
}, false)
