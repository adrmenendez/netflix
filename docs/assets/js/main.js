"use strict";let series=[],favorites=[];const searchBtn=document.querySelector(".js-search-button"),searchBarBtn=document.querySelector(".js-searchbar-button"),resetButton=document.querySelector(".js-reset-button");function searchSeries(){const e=document.querySelector(".js-search-input").value;fetch("//api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{series=e,ensureData()})}function handleFavoriteClick(e){const t=getCurrentEventId(e),s=isSerieInSeries(t),r=s.show.id;isSerieInFavorites(r)?removeFromFavorites(t):favorites.push(s),ensureData()}function handleDeleteButton(e){const t=getCurrentEventId(e),s=favorites.find(e=>e.show.id===t).show.id;removeFromFavorites(s),ensureData()}function getHtmlCode(e,t){let s="";for(const r of e){s+='<li class= "series_container-main">',s+=void 0===favorites.find(e=>e.show.id===r.show.id)?`<section class="series_container js-series-card" id= ${r.show.id}>`:`<section class="series_container js-series-card favorite" id= ${r.show.id}>`,null===r.show.image?s+='  <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="" class="series_container--img" />':s+=`  <img src="${r.show.image.medium}" alt="" class="series_container--img" />`,s+=`  <h2 class="series_container--title">${r.show.name}</h2>`,s+="</section>",!0===t&&(s+=`  <i class="far fa-times-circle series_container--x js-x" id= ${r.show.id}></i>`),s+="</li>"}return s}function paintSeries(){const e=document.querySelector(".js-series-main");let t=getHtmlCode(series);e.innerHTML=t}function paintFavoritesSeries(){const e=document.querySelector(".js-series-favorites");let t=getHtmlCode(favorites,!0);e.innerHTML=t}function setData(e,t){localStorage.setItem(e,JSON.stringify(t))}function getData(e){localStorage.getItem(e)&&(favorites=JSON.parse(localStorage.getItem(e)))}function handleReset(){favorites=[],ensureData()}function handleSearchClick(e){e.preventDefault(),searchSeries()}function showBar(e){const t=e.target.closest("form");t.classList.toggle("show"),t.classList.toggle("form")}function listenEvents(e,t,s="click"){const r=document.querySelectorAll(e);for(const e of r)e.addEventListener(s,t)}searchBarBtn.addEventListener("click",handleSearchClick),resetButton.addEventListener("click",handleReset),searchBtn.addEventListener("click",showBar);const isSerieInFavorites=e=>!!favorites.find(t=>t.show.id===e),isSerieInSeries=e=>series.find(t=>t.show.id===e),removeFromFavorites=e=>{favorites=favorites.filter(t=>t.show.id!==e)},getCurrentEventId=e=>{const t=e.currentTarget;return parseInt(t.id)};function ensureData(){setData("favoritesLocal",favorites),paintFavoritesSeries(),paintSeries(),listenEvents(".js-series-card",handleFavoriteClick),listenEvents(".js-x",handleDeleteButton)}getData("favoritesLocal"),ensureData();