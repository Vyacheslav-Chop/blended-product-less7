import{i as l,a as g}from"./vendor-CG2pNq4b.js";const p={homeProducts:document.querySelector('.products[data-page="home"]'),wishListProducts:document.querySelector('.products[data-page="wishlist"]'),homeCategories:document.querySelector(".categories"),notFoundDiv:document.querySelector(".not-found"),form:document.querySelector(".search-form"),modalProduct:document.querySelector(".modal-product"),modal:document.querySelector(".modal"),loadMoreBtn:document.querySelector(".load-more-btn"),addToCartBtn:document.querySelector(".modal-product__btn--cart"),addToWishListBtn:document.querySelector(".modal-product__btn--wishlist")},R={cart:"cart-products",wishlist:"wishlist-products"},s=12;let u=1;async function _(t=1){const o=(t-1)*s,e=`https://dummyjson.com/products?limit=${s}&skip=${o}`;return a(e)}async function f(){return a("https://dummyjson.com/products/category-list")}async function j(t,o=1){const e="https://dummyjson.com/products/category/",r=(o-1)*s,c=`${e}${t}?limit=${s}&skip=${r}`;return a(c)}async function I(t,o=1){const e="https://dummyjson.com/products/search",r=(o-1)*s,c=`${e}?q=${t}&limit=${s}&skip=${r}`;return a(c)}async function y(t){const e=`https://dummyjson.com/products/${t}`;return a(e)}const{homeCategories:$,homeProducts:S,modalProduct:b,addToCartBtn:B,addToWishListBtn:w}=p;function P(t){return t.map(({id:o,title:e,brand:r,category:c,price:n,thumbnail:i})=>`
  <li class="products__item" data-id="${o}">
    <img class="products__image" src="${i}" alt="${e}"/>
    <p class="products__title">${e}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${r}</p>
    <p class="products__category">Category: ${c}</p>
    <p class="products__price">Price: $${n}</p>
 </li>`).join("")}async function U(){try{const{products:t,total:o}=await _(u);A(S,t),k(o,u)}catch(t){console.error("Error while fetching products:",t),d("Something went wrong while loading products. Please try again later.")}}function C(t){return t.map(o=>`
    <li class="categories__item">
   <button class="categories__btn" type="button">${o}</button>
 </li>`).join("")}async function x(){try{const o=["All",...await f()];$.innerHTML=C(o)}catch{d("Something went wrong while loading categories. Please try again later.")}}function L(t){const{title:o,description:e,price:r,tags:c,images:n,shippingInformation:i,returnPolicy:h}=t;return`<img class="modal-product__img" src="${(n==null?void 0:n[0])||""}" alt="${o}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${o}</p>
        <ul class="modal-product__tags">${M(c)}</ul>
        <p class="modal-product__description">${e}</p>
        <p class="modal-product__shipping-information">Shipping: ${i}</p>
        <p class="modal-product__return-policy">Return Policy: ${h}</p>
        <p class="modal-product__price">Price: $${r}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`}async function H(t){try{const o=await y(t);console.log(o),b.innerHTML=L(o),B.dataset.id=o.id,w.dataset.id=o.id}catch{d("Failed to load product information. Please try again later.")}}const{loadMoreBtn:m,homeProducts:W}=p;async function a(t){const{data:o}=await g.get(t);return o}function d(t){l.error({message:t,position:"bottomRight",backgroundColor:"#ef4040",messageColor:"#ffffff",maxWidth:"400"})}function D(t){t.innerHTML=""}function F(t,o){const e=t.querySelector(".categories__btn--active");e&&e.classList.remove("categories__btn--active"),o.classList.add("categories__btn--active")}function q(t){l.info({message:t,position:"bottomCenter",maxWidth:"400"})}function O(){const e=document.querySelector(".products__item").getBoundingClientRect().height;window.scrollBy({top:e*1.5,behavior:"smooth"})}function M(t){return t.map(o=>`<li>${o}</li>`).join("")}function T(){m.hidden=!1}function v(){m.hidden=!0}function k(t,o){console.log(`Current page: ${o}, Total: ${t}`),o*12>=t?(q("There are no more products to load at the moment."),v(),console.log("No more products to load. Button hidden.")):(T(),console.log("More products available. Button shown."))}function A(t,o){t.insertAdjacentHTML("beforeend",P(o))}export{R as S,A as a,_ as b,D as c,j as d,k as e,y as f,I as g,U as h,v as i,q as j,O as k,H as l,x as m,p as r,d as s,F as u};
//# sourceMappingURL=helpers-BxnrvCMH.js.map
