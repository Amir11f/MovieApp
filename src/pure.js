import React from 'react'

export default function pure() {
    const nav = document.querySelector('.navbar')
    let lastScrollY = window.scrollY
    window.addEventListener('scroll', ()=>{
        if(lastScrollY < window.scrollY){
            nav.classList.add('nav-hidden')
            console.log('we are going down');
        }else{
            nav.classList.remove('nav-hidden')
        }
        lastScrollY = window.scrollY 
    })
}
