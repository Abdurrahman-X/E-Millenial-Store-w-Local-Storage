// PRODUCTS LIST
const productsList = [{
    index: 1,
    id: 'p1',
    name: 'Samsung TV',
    price: 500000,
    quantity: 0
},
{
    index: 2,
    id: 'p2',
    name: 'Pixel 4a',
    price: 250000,
    quantity: 0
},
{
    index: 3,
    id: 'p3',
    name: 'PS 5',
    price: 300000,
    quantity: 0
},
{
    index: 4,
    id: 'p4',
    name: 'MacBook Air',
    price: 800000,
    quantity: 0
},
{
    index: 5,
    id: 'p5',
    name: 'Apple Watch',
    price: 95000,
    quantity: 0
},
{
    index: 6,
    id: 'p6',
    name: 'Air Pods',
    price: 75000,
    quantity: 0
},
]

// SELECTORS
var sN = 1;

const intro = document.querySelector('.intro');
const cartIcon = document.querySelector('.cart-icon');
const cartContent = document.querySelector('.cart-content')

let cartTotal = document.getElementById('total');

cartIcon.addEventListener('click', () => {
  cartContent.style.display = 'block';
    
})


const tableContent = document.querySelector('.table-content');
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('span');
const tableHeader = document.querySelector('.table-header');
var cartItemRows = document.getElementsByClassName('.cart-item-row');

const products = []

for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener('click', (e) => {
        if (e.target.innerText === "ADD TO CART") {
           let targetButton = e.target.parentElement;
            
            let product = {
                id: targetButton.id,
                name: targetButton.getElementsByClassName('title')[0].textContent,
                price: targetButton.getElementsByClassName('price')[0].textContent,
                totalPrice: parseInt(targetButton.getElementsByClassName('price')[0].textContent.replace('₦', "")),
                quantity: 0
            }
    
      
            cartNumbers(productsList[i])
            totalCost(productsList[i])

            e.target.style.backgroundColor = '#FFED96';
            e.target.innerText = "Remove From Cart"; 

            // let bgColor = localStorage.getItem("color");
            // if (bgColor === null) {
            //     localStorage.setItem('color', e.target.style.backgroundColor)
            // } else {
            //     cartButtons[i].style.backgroundColor = bgColor;
            // }
          
            
            localStorage.setItem('color', e.target.style.backgroundColor);
            localStorage.setItem('innerText', e.target.innerText);

           
            displayCart()
         

        } else if (e.target.innerText !== "ADD TO CART") {
            e.target.style.backgroundColor = '#FF9A3D';
            e.target.innerText = "Add To Cart"; 

            let itemInCarts = document.querySelectorAll(`.cart-item-row .cart-title`);
            console.log(itemInCarts);
            let productNumbers = localStorage.getItem('cartNumbers');
            //console.log(productNumbers);
            let cartCost = localStorage.getItem("totalCost");
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);
            let productName;
            //console.log(cartItems);

            for (let i = 0; i < itemInCarts.length; i++) {
                productName = itemInCarts[i].innerText;
            }

            //let currentProduct = productName;
          
                localStorage.setItem('cartNumbers', productNumbers - 1);
                localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].quantity));
                
                cartTotal.innerText = '₦' + localStorage.getItem('totalCost');
                delete cartItems[productName];
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                
                // localStorage.setItem('color', e.target.style.backgroundColor);
                // localStorage.setItem('innerText', e.target.innerText);

           
      
             displayCart()
             onLoadCartNumbers()
           
            //cartItems[productName].quantity = 1;
            
        }
    });
}
function onLoadCartNumbers() {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
   }   

   let cartItems = localStorage.getItem('productsInCart')
   //console.log(JSON.parse(productName));
   cartItems = JSON.parse(cartItems);                 
    
}

function retainStuff() {
    let bgColor = localStorage.getItem('color');
    let bgText = localStorage.getItem('innerText');
    let propX;

    let cartItems = localStorage.getItem('productsInCart')
   //console.log(JSON.parse(productName));
   cartItems = JSON.parse(cartItems);

     for( var props in cartItems) {
            propX = cartItems[props].id
            cartButtons.forEach(element => {
                console.log(element);
                if (element.id === propX) {
                   //console.log('yes')
                    element.style.backgroundColor = bgColor;
                    element.innerText = bgText;
                } 
            });
        }
}




    
// window.onload = reload()
function cartNumbers(product, action,) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let currentProduct = product.name
       
    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        //console.log("action running");
    } else if( productNumbers ) {
        
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.name;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product,
                
            }
        } 
        
            cartItems[currentProduct].quantity = 1;
    } else {
        product.quantity = 1;
        cartItems = { 
            [product.name]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");
    //console.log(cart);

    if( action) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart - product.price);
        cartTotal.innerText =  '₦' + localStorage.getItem('totalCost');
    } else if(cart == null) {    
        localStorage.setItem("totalCost", product.price);
        cartTotal.innerText = '₦' + localStorage.getItem('totalCost');
    
    } else {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
        cartTotal.innerText = '₦' + localStorage.getItem('totalCost');
    }
    
    
}



function displayCart() {
   let totalCost = localStorage.getItem("totalCost");
   if (totalCost) {
       cartTotal.innerText = '₦' + totalCost;
   }
    let cartDetails = '';
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'))
    if (cartItems && tableContent) {
        Object.values(cartItems).map((item, index) => {
            cartDetails += `
            <tr class = "cart-item-row" id = ${item.id}>
                 <td class = "cart-index">${index + 1}</td>
                 <td class = "cart-title">${item.name}</td>
                 <td class = "cart-price"> ${item.quantity * item.price}</td>
                 <td>
                     <div class="container">
                         <button class = "quantity-btn quantity-btn-minus  ${item.price} ${item.id} ">-</button>
                         <h2 class="root"> ${item.quantity} </h2>
                         <button class = "quantity-btn quantity-btn-plus ${item.price} ${item.id}">+</button><br>
                     </div>
                 </td>
                 <td><button class="remove-cart-item" type="button">Remove</button></td>
             </tr>
         
            ` 
        });
    }
    
   
   tableContent.innerHTML = cartDetails;

   

   increment()
   decrement()
   removeCartItems()
}
//displayCart()


function increment() {
    let incrementButtons = document.querySelectorAll('.quantity-btn-plus');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < incrementButtons.length; i++) {
        
        incrementButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = incrementButtons[i].parentElement.children[1].innerText;
            console.log(currentQuantity);
            currentProduct = incrementButtons[i].parentElement.parentElement.parentElement.querySelector('.cart-title').innerText;
            console.log(currentProduct);

            cartItems[currentProduct].quantity += 1;
            let newQuantity = parseInt(currentQuantity) + 1
            incrementButtons[i].parentElement.children[1].innerText = newQuantity;

            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();

        });
    }
}

function decrement() {
    let decrementButtons = document.querySelectorAll('.quantity-btn-minus');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < decrementButtons.length; i++) {
        decrementButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decrementButtons[i].parentElement.children[1].innerText;
            console.log(currentQuantity);
            currentProduct = decrementButtons[i].parentElement.parentElement.parentElement.querySelector('.cart-title').innerText;
            console.log(currentProduct);

            //cartItems[currentProduct].quantity += 1;
            let newQuantity = parseInt(currentQuantity) - 1
            
            if (newQuantity < 1){
                alert("You cannot have less than 1 item. If you wish to remove the item, click remove!");
                newQuantity = 1;
            } else {
                decrementButtons[i].parentElement.children[1].innerText = newQuantity;
            }   


            if( cartItems[currentProduct].quantity > 1 ) {
                cartItems[currentProduct].quantity -= 1;
                //cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
    }
}

function removeCartItems() {
    let itemsRemoved = tableContent.getElementsByClassName('remove-cart-item');
    let productNumbers = localStorage.getItem('cartNumbers');
    //console.log(productNumbers);
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    

    for (let i = 0; i < itemsRemoved.length; i++) {
        itemsRemoved[i].addEventListener('click', (e) => {
            //console.log(e);
            var targetButton = e.target;
            var targetItem = targetButton.parentElement.parentElement;
            var productItems = document.getElementsByClassName('product-item');
            //console.log(productItems);
            for (let i = 0; i < productItems.length; i++) {
                if (targetItem.id === productItems[i].id) {
                    productItems[i].getElementsByClassName('add-to-cart')[0].style.backgroundColor = "#FF9A3D";
                    productItems[i].getElementsByClassName('add-to-cart')[0].innerText = "Add To Cart";
                    productItems[i].getElementsByClassName('add-to-cart')[0].disabled = false;
                }        
            }
            productName = itemsRemoved[i].parentElement.parentElement.querySelector('.cart-title').innerText;
            //console.log(productName)
            
            localStorage.setItem('cartNumbers', productNumbers - 1);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].quantity));
            
            cartTotal.innerText = '₦' + localStorage.getItem('totalCost');
        
           
            for (let i in cartItems) {
                if (cartItems[i].name === productName) {
                    delete cartItems[productName];
                };
            } 
            //cartItems[productName].quantity = 1
           
            
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            
             displayCart()
             onLoadCartNumbers()
             
        })
    }
    
}




// CHECKOUT FORM
const continueShopping = document.getElementById('continue-shopping');
const checkoutForm = document.getElementById('checkout')
const form = document.getElementById('form')
const buyerName = document.getElementById('buyer-name');
// console.log(userName.value);
const buyerMail = document.getElementById('buyer-email');
const telephone = document.getElementById('buyer-number');
const error = document.getElementsByClassName('error-msg');
checkoutForm.addEventListener('click', checkOut);

function onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
        return setErrorFor(telephone, 'Phone number can only be numbers');
    } else{
        return setSuccessFor(telephone);
    }
        
}
    
    


// CHECKOUT FUNCTION
function checkOut() {
    let allValid;
        let totalPrice = document.querySelector('#total');
        if (parseInt(totalPrice.innerText.replace('₦', '')) === 0) {
            alert('You need to select an item first' );
            return;
        }


    const buyerNameValue = buyerName.value.trim();    
    
    if (buyerNameValue === '' || buyerNameValue === null) {
        setErrorFor(buyerName, 'Please enter your name');
        allValid = false;
        
    } else{
        setSuccessFor(buyerName);
        allValid = true;
    }

    const buyerMailValue = buyerMail.value.trim();
    if (buyerMailValue == '') {
        setErrorFor(buyerMail, 'Please an enter an email');
        allValid = false;
    } else if (!buyerMailValue.includes('@')) {
        setErrorFor(buyerMail, 'Invalid Email');
        allValid = false;
    } else{
        setSuccessFor(buyerMail);
        allValid = true;
    }
   

    const telephoneNum = telephone.value.trim(); 
    if (telephoneNum == '') {
        setErrorFor(telephone, 'Please enter your telephone number');
        allValid = false;
    // } else if (telephoneNum.type !== 'tel') {
    //     setErrorFor(telephone, 'Phone number can only be numbers');
    //     allValid = false;
    } else if (telephoneNum.length < 11) {
        setErrorFor(telephone, 'Phone number cannot be less than 11 characters');
        allValid = false;
    } else if (telephoneNum.length > 11) {
        setErrorFor(telephone, 'Phone number cannot be more than 11 characters');
        allValid = false;
    } 
    else{
        setSuccessFor(telephone);
        allValid = true;
    }
     
    if (allValid == true) {
       
        closeModal();
        payWithPaystack();
        
    }
    
    
}

// NAME VALIDATION
function validateName() {
    
    const buyerNameValue = buyerName.value.trim();    
    if (buyerNameValue === '' || buyerNameValue === null) {
        setErrorFor(buyerName, 'Please enter your name');
       
    } else{
        setSuccessFor(buyerName);
      
    }
}

// MAIL VALIDATION
function validateMail() {
  
    const buyerMailValue = buyerMail.value.trim();
    if (buyerMailValue == '') {
        setErrorFor(buyerMail, 'Please an enter an email');
       
    } else if (!buyerMailValue.includes('@')) {
        setErrorFor(buyerMail, 'Invalid Email');
      
    } else{
        setSuccessFor(buyerMail);
    }
}

// PHONE NUMBER VALIDATION
function validatePhone() {

    const telephoneNum = telephone.value.trim(); 

    if (telephoneNum == '') {
        setErrorFor(telephone, 'Please enter your telephone number');
      
    //   } else if (telephoneNum.type !== 'tel') {
    //       setErrorFor(telephone, 'Phone number can only be numbers');
         
    } else if (telephoneNum.length < 11) {
         setErrorFor(telephone, 'Phone number cannot be less than 11 characters');
     } else if (telephoneNum.length > 11) {
         setErrorFor(telephone, 'Phone number cannot be more than 11 characters');
         allValid = false;
    }  
    else{
        setSuccessFor(telephone);
       
    }
}

// VALIDATION ERROR
function setErrorFor(input, errorMessage) {
    const formControl = input.parentElement;
	const small = formControl.querySelector('.form-control div');
	formControl.className = 'form-control error';
	small.innerText = errorMessage;
    //error.className = 'error-msg';
}

// VALIDATION SUCCESS
function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}



continueShopping.addEventListener('click', closeModal);



//CLOSE CART
function closeModal() {
    document.querySelector(".cart-content").style.display = "none";
}





// INTEGRATE PAYSTACK
function payWithPaystack() {
    let handler = PaystackPop.setup({
      key: 'pk_test_a230251758fb3ae6afc26dde5f95ca6386f05aeb', // Replace with your public key
      email: document.getElementById("buyer-email").value,
      amount: document.getElementById("total").innerText.replace('₦', '') * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        showSummary()
      }
    });
    handler.openIframe();
  }
        
    
  // SHOW SUMMARY UPON SUCCESSFUL PURCHASE
function showSummary() {
    document.getElementById('summary').style.display = 'flex';
    document.getElementById('summary').style.flexDirection = 'column';
    document.getElementById('summary').style.justifyContent = 'space-around';
    document.querySelector('#customer-name').innerHTML = buyerName.value;
    const Summary = document.querySelector('#summary-content')
    const itemRow = document.querySelectorAll('.cart-item-row');
    


    itemRow.forEach((element, index) => {
       let itemName = element.getElementsByClassName('cart-title')[0].innerText;
    
       let itemQty = element.getElementsByClassName('root')[0].innerText;
      


       let summaryContent = `
    
    <tr>
        <td>${index + 1}</td>
        <td>${itemName}</td>
        <td>${itemQty}</td>
    </tr>
`
Summary.innerHTML += summaryContent;
    });
    
}


onLoadCartNumbers()
displayCart()
retainStuff()

// UPON ACKNOWLEDGEMENT OF SUMMARY PURCHASE, CLEAR LOCAL STORAGE AND UPDATE CART CONTENT AND CARTNUMBERS.
function reloadPage() {
    
    localStorage.clear();
    onLoadCartNumbers()
    displayCart()

    window.location.reload();
}


