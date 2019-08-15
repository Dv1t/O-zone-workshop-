'use strict';
//чекбокс

const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach((elem)=>{
    elem.addEventListener('change',function()
    {
        if (this.checked)
        {
            this.nextElementSibling.classList.add('checked');
        }else{
            this.nextElementSibling.classList.remove('checked');
        }
    });
});
//end чекбокс


//корзина

const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

btnCart.addEventListener('click',function(){
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click',()=>{
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});

//end корзина

//работа с товаром
const cards  = document.querySelectorAll('.goods .card'),
 cartWrapper = document.querySelector('.cart-wrapper'),
 cartEmpty = document.getElementById('cart-empty'),
 countGoods = document.querySelector('.counter');

cards.forEach((card)=>{
    const btn = card.querySelector('button');
    btn.addEventListener('click',()=>{
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    });
});

function showData(){
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length.toString();
}

//end работа с товаром