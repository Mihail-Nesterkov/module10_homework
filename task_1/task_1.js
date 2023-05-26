const button = document.querySelector('.first_btn');
const svg = document.querySelector('.arrow_svg');
let active = document.querySelector('.svg_active');
let deActive = document.querySelector('.svg_deActive')

button.addEventListener('click', () =>{
active.classList.toggle('svg_active')
    active.classList.toggle('svg_deActive')
deActive.classList.toggle('svg_deActive')
    deActive.classList.toggle('svg_active')
})