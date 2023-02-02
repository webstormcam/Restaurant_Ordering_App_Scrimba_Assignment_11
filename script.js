import { menuArray } from './data.js'
const orderedItems =[]


document.addEventListener('click',function(e){
    if(e.target.dataset){
      purchaseItem(e.target.dataset)
    }
   
})


function purchaseItem(selectedItem){
const ItemObj = menuArray.filter(function(food){
return food.name === selectedItem.foodType
})[0]

orderedItems.push(ItemObj)
purchases()
}









function renderMenu(){
    const menu = document.getElementById('menu')
    let options =''
    for(let food of menuArray){
   options+=`<div class="menu-item">
   <div class="food-info">
   <div class="icon">${food.emoji}</div>
   <div class="food-desc">
        <h2>${food.name}</h2>
        <p class="grey">${food.ingredients}</p>
        <p class="price">$${food.price}</p>
   </div>
   </div>
   <div class="add-food">
   <button data-food-type="${food.name}" class="btn-style">+</button>
   
   </div>
   
   
   </div>`
    }
    menu.innerHTML+=options
}


function purchases(){
    const order = document.getElementById('order')
    let list =''
    let total = 0
    for(let ordered of orderedItems){
       total+=ordered.price
    }
    console.log(total)
}


renderMenu()
