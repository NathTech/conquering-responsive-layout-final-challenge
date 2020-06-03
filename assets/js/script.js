
const navButton = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')

navButton.addEventListener('click', (e) => {
    console.log('hello');
    
    nav.classList.toggle('nav--visible')
})