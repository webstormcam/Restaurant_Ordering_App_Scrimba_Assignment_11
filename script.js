import { menuArray } from './data.js'

let orderedItems =[]

//These are my buttons to select items, remove items, & disable items once the modal is open! 
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

//This function selects the item for purchase.
function purchaseItem(selectedItem){
const ItemObj = menuArray.filter(function(food){
return food.name === selectedItem
})[0]
orderedItems.push(ItemObj)
renderPurchases()
}

// This fuction removes items from the purchase area.
function deleteItem(selectedItem){
orderedItems.splice(selectedItem,1)
if(orderedItems.length<1){
    const orders =  document.getElementById('order')
    orders.classList.remove('show')
    return
}
renderPurchases()

}

// This renders out the entire menu available.
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

// This renders out the full list of items that the user has decided to purchase.
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

//This is all the logic that I created for the form to work! 
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



//This is the function that runs at the end thanking the user for making a purchase! 

function renderThanks(name){
const savedName = name;
const orderedFoods = document.getElementById('order')
orderedFoods.innerHTML=`
<div class="thanks">
<p>Thanks, ${savedName}! Your order is on its way!</p>
</div>
`
}

renderMenu()
