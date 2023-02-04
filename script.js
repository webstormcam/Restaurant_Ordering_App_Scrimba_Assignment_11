import { menuArray } from './data.js'



let orderedItems =[]







document.addEventListener('click',function(e){
    if(e.target.dataset.food){
      purchaseItem(e.target.dataset.food)
    
    }
   
   else if(e.target.dataset.item){
        deleteItem(e.target.dataset.item)
    }

    else if(e.target.dataset.spend){
        const modal = document.getElementById('modal')
        const purchaseButtons = document.getElementsByClassName('item-purchase-remove-btn')
        for(let button of purchaseButtons){
            button.disabled = true
        }
        modal.style.display="flex"
        
    } 
    


   
})






function purchaseItem(selectedItem){
const ItemObj = menuArray.filter(function(food){
return food.name === selectedItem
})[0]

orderedItems.push(ItemObj)
renderPurchases()
}



function deleteItem(selectedItem){
orderedItems.splice(selectedItem,1)
if(orderedItems.length<1){
    const orders =  document.getElementById('order')
    orders.classList.remove('show')
    return
}
renderPurchases()

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
   <button data-food="${food.name}" class="item-purchase-remove-btn btn-style">+</button>
   
   </div>
   
   
   </div>`
    }
    menu.innerHTML+=options
}


function renderPurchases(){
    const orderedFoods = document.getElementById('order')
    orderedFoods.innerHTML=`
    <h2 class="order-header">Your order</h2>
        <div class="purchased-style" id="purchased"></div>
        <div class="total-style" id="total"></div>
        <button data-spend="btn" class="order-button">Complete Order</button>
    
    
    
    `
    const purchased = document.getElementById('purchased')
    const totalPrice = document.getElementById('total')
    let list =''
    let priceOfItAll =''
    let total = 0
    for(let i=0;i<orderedItems.length;i++){
        
       list +=`
       <div class="item">
       <div class="name-remove">
       <h2>${orderedItems[i].name}</h2>
       <button  data-item="${[i]}"  class="grey item-purchase-remove-btn">remove</button>
       </div>
      
       <p class="render-price-style">$${orderedItems[i].price}</p>
       </div>
       `
       total+=orderedItems[i].price
     priceOfItAll = `
       <h2>Total Price:</h2>
       <p class="render-price-style">$${total}</p>
       `
    }
    purchased.innerHTML = list
    totalPrice.innerHTML= priceOfItAll
    order.classList.add('show')
    console.log(orderedItems)
}


const form = document.getElementById('form')
form.addEventListener('submit',function(e){
    e.preventDefault()
  const customerName = document.getElementById('customerName').value
  const modal = document.getElementById('modal').style.display="none"
    form.reset()
    const purchaseButtons = document.getElementsByClassName('item-purchase-remove-btn')
    for(let button of purchaseButtons){
        button.disabled = false
    }
    const orderArea = document.getElementById('order').innerHTML=""
    orderedItems=[]
    renderThanks(customerName)
})

function renderThanks(name){
const savedName = name;
console.log(`Hello ${savedName}`)
}




renderMenu()
