import pathToSvg from '../images/icons.svg';
import { getLength } from './header.js';
import {
  openDropDown,
  rotateButton,
  changeCategoriesValue,
  changeTypesValue,
  collectQueryParameters,
  filterBySearchParameter,
} from './drop-downs.js';
import {
  getProductsByQuery,
  getAllProducts,
  getDiscountProducts,
  getPopularProducts,
  getProducttById
} from './api.js';
import { renderMarkup } from './templates/cards.js';
import { openProductModal } from './card-button.js';
import { saveToLocalStorage } from './addToCart.js';
import { renderPagination } from './pagination.js';


const searchForm = document.querySelector('.filters-form');
const categoriesInput = document.querySelector('.filters-categories');
const allSearchInput = document.querySelector('.filters-allTypes');
const downBtn = document.querySelectorAll('.filters-down-svg');
const categoriesItem = document.querySelectorAll('.filters-categories-item');
const allTypesItem = document.querySelectorAll('.filters-allTypes-item');
const productsListGeneral = document.querySelector('.products-list-general');
const productListDiscount = document.querySelector('.products-list-discount');
const productListPopular = document.querySelector('.products-list-popular');

//ДЕФОЛТНИЙ РЕНДЕР ТОВАРІВ ПРИ ПЕРШОМУ ЗАВАНТАЖЕННІ САЙТУ

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const allProduct = await getAllProducts();
    const arrOfAllProducts = allProduct.results;
    const pages = allProduct.totalPages;
    renderMarkup(arrOfAllProducts, 'general', productsListGeneral);
    productsListGeneral.insertAdjacentHTML(
      'beforeend',
      renderPagination(pages)
    );

    let cards = document.querySelectorAll('.product-card-general');
    cards.forEach(card => {
      card.addEventListener('click', openProductModal);
    });

    const arrOfDiscountProducts = await getDiscountProducts();
    renderMarkup(arrOfDiscountProducts, 'discount', productListDiscount);
    let cardsDisc = document.querySelectorAll('.discount-product-card');
    cardsDisc.forEach(card => {
      card.addEventListener('click', openProductModal);
    });

    const arrOfPopularProducts = await getPopularProducts();
    renderMarkup(arrOfPopularProducts, 'popular', productListPopular);
    let cardsPop = document.querySelectorAll('.popular-product-card');
    cardsPop.forEach(card => {
      card.addEventListener('click', openProductModal);

      const addToCartBtn = document.querySelectorAll('.js-addToCart-btn');
      addToCartBtn.forEach(btn => {
        btn.addEventListener('click', saveToLocalStorage);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// РОБОТА ДРОПДАУНІВ + ІНПУТ

categoriesInput.addEventListener('click', openDropDown);
allSearchInput.addEventListener('click', openDropDown);
downBtn.forEach(btn => {
  btn.addEventListener('click', rotateButton);
});

categoriesItem.forEach(item => {
  item.addEventListener('click', changeCategoriesValue);
});

allTypesItem.forEach(item => {
  item.addEventListener('click', changeTypesValue);
});

// ФІЛЬТРАЦІЯ ТОВАРІВ

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const queryParameters = collectQueryParameters();
    const filteredParameter = queryParameters.filterSearch;
    console.log(filteredParameter);
    const response = await getProductsByQuery(queryParameters);
    const pages = response.totalPages;
    const productForRender = response.results;
    const filteredProducts = filterBySearchParameter(
      filteredParameter,
      productForRender
    );
    console.log(productForRender);
    productsListGeneral.innerHTML = '';
    renderMarkup(filteredProducts, 'general', productsListGeneral);
    productsListGeneral.insertAdjacentHTML(
      'beforeend',
      renderPagination(pages)
    );

    let cardsDisc = document.querySelectorAll('.discount-product-card');
    cardsDisc.forEach(card => {
      card.addEventListener('click', openProductModal);
    });

    const addToCartBtn = document.querySelectorAll('.js-addToCart-btn');
    addToCartBtn.forEach(btn => {
      btn.addEventListener('click', saveToLocalStorage);
    });
  } catch (error) {
    console.log(error);
  }
});

// ДОДАВАННЯ ТОВАРУ В КОРЗИНУ З МОДАЛЬНОГО ВІКНА

export async function addToCartFromModal(event) {
  const productData = {};
  const textBtn = event.target.innerText;
  const id = event.currentTarget.getAttribute('data-id');
  const isInCart = arrProducts.some(product => product.id === id); 
         
        if (!isInCart) {
        event.currentTarget.innerHTML = `Remove from <svg class="modal-btn-svg" width="18" height="18">
                <use class="modal-icon-svg" href="${pathToSvg}#icon-shopping-cart"></use>
                </svg>`;
            try {
                const product = await getProducttById(id);
               console.log(product);
                const { category,  size, _id, name, price, img  } = product;
                productData.category = category;
                productData.size = size;
                productData.id = _id;
                productData.name = name;
                productData.price = price;
                productData.img = img;
               } catch (error) {
                console.log(error);
               }

                const localStorage = window.localStorage;
            
                arrProducts.push(productData);
               
                localStorage.setItem("product", JSON.stringify(arrProducts));
            
                getLength();
    
               
      
        } 

    if (isInCart) {
       event.currentTarget.innerHTML = `Add to <svg class="modal-btn-svg" width="18" height="18">
        <use class="modal-icon-svg" href="${pathToSvg}#icon-shopping-cart"></use>
        </svg>`;
        // Видаляємо продукт з arrProducts
        const idCard = event.currentTarget.getAttribute('data-id');
        arrProducts = arrProducts.filter(item => item.id !== idCard);
      
        // Оновлюємо локалсторідж
        localStorage.setItem('product', JSON.stringify(arrProducts));
      
       
    
        getLength();
    }
 
} 

