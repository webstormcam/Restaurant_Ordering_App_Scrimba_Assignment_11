import { menuArray } from './data.js'

function renderMenu(){
    const menu = document.getElementById('menu')
    let options =''
    for(let food of menuArray){
   options+=`<div class="menu-item">
   <div class="food-info">
   <div class="icon">${food.emoji}</div>
   <div class="food-desc">
        <h2>${food.name}</h2>
        <p>${food.ingredients}</p>
        <p>${food.price}</p>
   </div>
   </div>
   <div class="add-food"></div>
   
   
   </div>`
    }
    menu.innerHTML+=options
}


renderMenu()
