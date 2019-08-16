'use strict';
//выбранная пользователем категория товара
var choosenCategory='';
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
        search.value = '';
    });

}

//объединение фильтров по акции категории и цене
function filterDuo() {
    const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById("discount-checkbox"),
    min = document.getElementById('min'),
    max = document.getElementById('max');
    cards.forEach((card) => {
        const cardPrice = card.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
        if ((min.value && price < min.value) || (price > max.value && max.value)||(card.dataset.category!==choosenCategory)) {
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


//end фильтр акции

//получение данных с сервера

function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены, ошибка: ' + response.status);
            }
        })
        .then((data) => {
            return data;
        })
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="font-size:1.5em; position:absolute; left:40%; top:20%;">Упс что-то пошло не так</div>';
        });
}


//выводим карточки товара
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
            <div class="card" data-category="${good.category}">
                ${good.sale?'<div class="card-sale">🔥Hot Sale🔥</div>': ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
        `;
        goodsWrapper.appendChild(card);
    })
}
//end получение данных с сервера

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const category = new Set();
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    cards.forEach((card)=>{
        category.add(card.dataset.category);
    });

    category.forEach((item)=>{
        const li = document.createElement('li');
        li.textContent=item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click',(event)=>{
        if( catalogList.parentNode.style.display)
        {
            catalogList.parentNode.style.display='';
        }
        else
        {
        catalogList.parentNode.style.display='flex';
        }
        if(event.target.tagName === 'LI')
        {
            choosenCategory=event.target.textContent;
            filterDuo();
        }
    });
}

getData().then((data) => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    workCart();
    actionPage();
    renderCatalog(); 
});