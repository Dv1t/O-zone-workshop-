'use strict';


//чекбокс

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach((elem) => {
        elem.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}
toggleCheckbox();
//end чекбокс


//корзина

function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');

    btnCart.addEventListener('click', function () {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}
toggleCart();

//end корзина


//работа с товаром

function workCart() {

    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = "Удалить из корзины";
            removeBtn.style.backgroundColor = "red";
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let sum = 0;

        countGoods.textContent = cardsCart.length.toString();

        cardsPrice.forEach((cardPrice) => {
            sum += parseFloat(cardPrice.textContent);
        });
        cardTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}
workCart();
//end работа с товаром


//фильтр акции
function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById("discount-checkbox"),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    //фильтр по акции
    discountCheckbox.addEventListener('change', filterDuo);
    //фильтр по цене
    min.addEventListener('change', filterDuo);
    max.addEventListener('change', filterDuo);

    //объединение двух фильтров
    function filterDuo()
    {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            
            if ((min.value && price < min.value) || (price > max.value && max.value)) {
                card.parentNode.style.display = "none";
                if (discountCheckbox.checked) {
                    if (!card.querySelector('.card-sale')) {
                        card.parentNode.style.display = "none";
                    }
                } 
            } else {
                card.parentNode.style.display = "";
                if (discountCheckbox.checked) {
                    if (!card.querySelector('.card-sale')) {
                        card.parentNode.style.display = "none";
                    }
                } else {
                    card.parentNode.style.display = "";
                }
            }
        });
    }

    //поиск
    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
        search.value='';
    });
   
}
actionPage();

//end фильтр акции