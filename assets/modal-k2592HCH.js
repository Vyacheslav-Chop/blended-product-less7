import{i as R,a as tt}from"./vendor-CG2pNq4b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const n of c.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(r){if(r.ep)return;r.ep=!0;const c=e(r);fetch(r.href,c)}})();const v={homeProducts:document.querySelector('.products[data-page="home"]'),wishlistProducts:document.querySelector('.products[data-page="wishlist"]'),homeCategories:document.querySelector(".categories"),notFoundDiv:document.querySelector(".not-found"),form:document.querySelector(".search-form"),modalProduct:document.querySelector(".modal-product"),modal:document.querySelector(".modal"),loadMoreBtn:document.querySelector(".load-more-btn"),cartBtnModal:document.querySelector(".modal-product__btn--cart"),wishlistBtnModal:document.querySelector(".modal-product__btn--wishlist"),cartProducts:document.querySelector('.products[data-page="cart"]'),cartSpan:document.querySelector("[data-cart-count]"),cartItems:document.querySelector("[data-count]"),cartTotal:document.querySelector("[data-price]"),wishlistSpan:document.querySelector("[data-wishlist-count]")},N={cart:"cart-products",wishlist:"wishlist-products"},h=12;let A=1;async function b(o=1){const t=(o-1)*h,e=`https://dummyjson.com/products?limit=${h}&skip=${t}`;return w(e)}async function ot(){return w("https://dummyjson.com/products/category-list")}async function O(o,t=1){const e="https://dummyjson.com/products/category/",s=(t-1)*h,r=`${e}${o}?limit=${h}&skip=${s}`;return w(r)}async function H(o,t=1){const e="https://dummyjson.com/products/search",s=(t-1)*h,r=`${e}?q=${o}&limit=${h}&skip=${s}`;return w(r)}async function C(o){const e=`https://dummyjson.com/products/${o}`;return w(e)}function P(o,t){localStorage.setItem(o,JSON.stringify(t))}function u(o){return JSON.parse(localStorage.getItem(o))??[]}const{wishlist:et}=N,{homeCategories:T,homeProducts:rt,modalProduct:S,cartBtnModal:j,wishlistBtnModal:U,cartProducts:st,notFoundDiv:m,wishlistProducts:x}=v;function W(o){return o.map(({id:t,title:e,brand:s,category:r,price:c,thumbnail:n})=>`
  <li class="products__item" data-id="${t}">
    <img class="products__image" src="${n}" alt="${e}"/>
    <p class="products__title">${e}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${s}</p>
    <p class="products__category">Category: ${r}</p>
    <p class="products__price">Price: $${c}</p>
 </li>`).join("")}async function ct(){try{const{products:o,total:t}=await b(A);q(rt,o),B(t,A)}catch{i("Something went wrong while loading products. Please try again later.")}}function nt(o){return o.map(t=>`
    <li class="categories__item">
   <button class="categories__btn" type="button">${t}</button>
 </li>`).join("")}async function It(){try{const t=["All",...await ot()];if(t.length===0){T.innerHTML="",m.classList.add("not-found--visible");return}T.innerHTML=nt(t)}catch{i("Something went wrong while loading categories. Please try again later.")}}function at(o){const{title:t,description:e,price:s,tags:r,images:c,shippingInformation:n,returnPolicy:p}=o;return`<img class="modal-product__img" src="${(c==null?void 0:c[0])||""}" alt="${t}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t}</p>
        <ul class="modal-product__tags">${Q(r)}</ul>
        <p class="modal-product__description">${e}</p>
        <p class="modal-product__shipping-information">Shipping: ${n}</p>
        <p class="modal-product__return-policy">Return Policy: ${p}</p>
        <p class="modal-product__price">Price: $${s}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`}async function F(o){try{const t=await C(o);if(!t){S.innerHTML="",m.classList.add("not-found--visible");return}S.innerHTML=at(t),j.dataset.id=t.id,U.dataset.id=t.id}catch{i("Failed to load product information. Please try again later.")}}function it(o){return o.map(({id:t,title:e,brand:s,category:r,price:c,thumbnail:n,qty:p})=>`
  <li class="products__item" data-id="${t}">
    <img class="products__image" src="${n}" alt="${e}"/>
    <p class="products__title">${e}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${s}</p>
    <p class="products__category">Category: ${r}</p>
    <p class="products__price">Price: $${c}</p>
    <p class="products__quantity">Quantity: ${p}</p>
 </li>`).join("")}function dt(o){const{title:t,description:e,price:s,tags:r,images:c,shippingInformation:n,returnPolicy:p,qty:Z}=o;return`<img class="modal-product__img" src="${(c==null?void 0:c[0])||""}" alt="${t}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t}</p>
        <ul class="modal-product__tags">${Q(r)}</ul>
        <p class="modal-product__description">${e}</p>
        <p class="modal-product__shipping-information">Shipping: ${n}</p>
        <p class="modal-product__return-policy">Return Policy: ${p}</p>
        <p class="modal-product__price">Price: $${s}</p>
        <p class="modal-product__quantity">Quantity: ${Z}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`}async function lt(o,t){try{const e=await C(o);if(!e){S.innerHTML="",m.classList.add("not-found--visible");return}const r=u(t).find(n=>n.id===o),c=(r==null?void 0:r.qty)||1;console.log(e),S.innerHTML=dt({...e,qty:c}),j.dataset.id=e.id,U.dataset.id=e.id}catch{i("Failed to load product information. Please try again later.")}}async function ut(o,t){try{const e=await J(t);if(e.length===0){st.innerHTML="",m.classList.add("not-found--visible");return}o.innerHTML=it(e),m.classList.remove("not-found--visible")}catch{i("Failed to render products. Please try again later.")}}async function pt(){try{const o=await yt(et);if(console.log(o),o.length===0){x.innerHTML="",m.classList.add("not-found--visible");return}x.innerHTML=W(o),m.classList.remove("not-found--visible")}catch{i("Failed to render products. Please try again later.")}}const{loadMoreBtn:k}=v;async function w(o){const{data:t}=await tt.get(o);return t}function i(o){R.error({message:o,position:"bottomRight",backgroundColor:"#ef4040",messageColor:"#ffffff",maxWidth:"400"})}function D(o){o.innerHTML=""}function mt(o,t){const e=o.querySelector(".categories__btn--active");e&&e.classList.remove("categories__btn--active"),t.classList.add("categories__btn--active")}function l(o){R.info({message:o,position:"center",maxWidth:"400",timeout:1500})}function ft(){const e=document.querySelector(".products__item").getBoundingClientRect().height;window.scrollBy({top:e*1.5,behavior:"smooth"})}function Q(o){return o.map(t=>`<li>${t}</li>`).join("")}function ht(){k.hidden=!1}function M(){k.hidden=!0}function B(o,t){console.log(`Current page: ${t}, Total: ${o}`),t*12>=o?(l("There are no more products to load at the moment."),M(),console.log("No more products to load. Button hidden.")):(ht(),console.log("More products available. Button shown."))}function q(o,t){o.insertAdjacentHTML("beforeend",W(t))}function I(o,t){if(!o||!t)return;const s=(u(t)||[]).reduce((r,{qty:c})=>r+c,0);o.textContent=s}async function J(o){try{const t=u(o);return await Promise.all(t.map(async({id:s,qty:r})=>({...await C(s),qty:r})))}catch{return i("Failed to load products. Please try again later."),[]}}async function yt(o){try{const t=u(o);return await Promise.all(t.map(async({id:s})=>await C(s)))}catch{return i("Failed to load products. Please try again later."),[]}}async function gt(o,t){if(!o||!t)return;const r=((await J(t)).reduce((c,{price:n,qty:p})=>c+n*100*p,0)/100).toFixed(2);o.textContent=`$${r}`}const{homeCategories:_t,homeProducts:$,notFoundDiv:Pt,form:E}=v;let g="",a=1,f="";async function At(o){if(o.target.classList.contains("categories__btn")){f=o.target.textContent.trim(),mt(_t,o.target),a=1,D($),M();try{let t;f==="All"?t=await b(a):t=await O(f,a);const{products:e,total:s}=t;e.length===0?Pt.classList.add("not-found--visible"):(q($,e),B(s,a))}catch(t){console.error("Oops! Couldn't fetch products:",t),i("Oops! Couldn't fetch products. Check your connection or try again.")}}}async function Tt(o){if(o.preventDefault(),a=1,D($),M(),g=E.elements.searchValue.value.trim(),!g){i("Please fill in the search field!");return}try{const{products:t,total:e}=await H(g,a);if(t.length===0){ct(),i("Unfortunately, no results were found for this query.");return}q($,t),B(e,a)}catch(t){console.error("An error occurred while searching for products:",t),i("An error occurred while searching for products. Please try again later.")}finally{E.reset()}}function K(o){const t=o.target.closest(".modal__close-btn"),e=o.target.closest(".modal-product__btn--cart"),s=o.target.closest(".modal-product__btn--wishlist");if(t){y();return}else if(e){if(e.textContent.trim()==="Add to Cart"){vt();return}else if(e.textContent.trim()==="Remove from Cart"){Ct();return}}else if(s){if(s.textContent.trim()==="Add to Wishlist"){Mt();return}else if(s.textContent.trim()==="Remove from Wishlist"){Bt();return}}}async function xt(o){const t=o.currentTarget;if(t){a++,t.disabled=!0,M();try{let e;g?e=await H(g,a):f?f==="All"?e=await b(a):e=await O(f,a):e=await b(a);const{products:s,total:r}=e;s.length===0?l("No products found matching your search criteria."):(q($,s),setTimeout(()=>ft()),B(r,a),t.disabled=!1)}catch{i("Oops! Something went wrong. Please try again later.")}}}const{modal:L,cartBtnModal:z,wishlistBtnModal:G,cartSpan:V,cartProducts:Y,cartItems:$t,cartTotal:wt,wishlistSpan:X,wishlistProducts:bt,homeProducts:St}=v,{cart:d,wishlist:_}=N;function Lt(){L.classList.add("modal--is-open"),L.addEventListener("click",K)}function y(){L.classList.remove("modal--is-open"),L.removeEventListener("click",K)}function Ft(o){const t=o.target.closest(".products__item");if(!t)return;const e=Number(t.dataset.id);!e||!t||(St?F(e):Y?lt(e,d):bt&&F(e),Lt())}function vt(){const o=Number(z.dataset.id);console.log(o);const t=u(d);console.log(t);const e=t.findIndex(({id:r})=>r===o);e===-1?(t.push({id:o,qty:1}),console.log(t)):t[e].qty++,P(d,t);const s=t.reduce((r,{qty:c})=>r+c,0);V.textContent=s,l("Product added to cart."),y()}function Ct(){const o=u(d),t=Number(z.dataset.id);if(!Array.isArray(o)||!t)return;const e=o.findIndex(({id:s})=>s===t);if(e!==-1&&o[e].qty>1)o[e].qty--,P(d,o),l("Product quantity decreased!");else{const s=o.filter(({id:r})=>r!==t);P(d,s),l("Product removed from cart!")}ut(Y,d),y(),I(V,d),I($t,d),gt(wt,d)}function Mt(){const o=Number(G.dataset.id);console.log(o);const t=u(_);if(console.log(t),t.findIndex(({id:r})=>r===o)!==-1){l("Product is already in wishlist."),y();return}t.push({id:o,qty:1}),P(_,t);const s=t.reduce((r,{qty:c})=>r+c,0);X.textContent=s,l("Product added to wishList."),y()}function Bt(){const o=u(_),t=Number(G.dataset.id);if(o.findIndex(({id:s})=>s===t)!==-1){const s=o.filter(({id:r})=>r!==t);P(_,s),l("Product removed from wishlist!")}y(),I(X,_),pt()}export{N as S,v as a,ct as b,It as c,Tt as d,gt as e,ut as f,xt as h,Ft as o,pt as r,At as s,I as u};
//# sourceMappingURL=modal-k2592HCH.js.map
