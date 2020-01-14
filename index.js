const burgerMenuDiv = document.querySelector("#burger-menu")

const orderListUl = document.querySelector("#order-list")

const customBurgerForm = document.querySelector("#custom-burger")

// debugger

const burgerUrl = "http://localhost:3000/burgers"

fetch(burgerUrl)
.then(resp => resp.json())
.then(burgersData => {
  burgersData.forEach(burger => {
    displayBurger(burger)
  });
})

createMenu()

function displayBurger(burger){
  const burgerDiv = document.createElement('div')
    burgerDiv.className = "burger"
    const h3Burger = document.createElement('h3')
      h3Burger.className = "burger_title"
      h3Burger.innerText = burger.name
    const imgBurger = document.createElement('img')
      imgBurger.src = burger.image
    const pBurger = document.createElement('p')
      pBurger.className = "burger_description"
      pBurger.innerText = burger.description
    const buttonBurger = document.createElement('button')
      buttonBurger.className = "button"
      buttonBurger.innerText = "Add to Order"

      addToOrder(burger, buttonBurger)
  
    
      burgerDiv.append(h3Burger, imgBurger, pBurger, buttonBurger)

  burgerMenuDiv.append(burgerDiv)
}

function addToOrder(burger, buttonBurger){
  buttonBurger.addEventListener('click', (e) => {

    fetch(`${burgerUrl}/${burger.id}`)
    .then(resp => resp.json())
    .then(addToSideBar => {
      addNewOrder(addToSideBar)
    })
  })
}

function addNewOrder(addToSideBar){
  const newOrderLi = document.createElement('li')
        newOrderLi.innerText = addToSideBar.name

    orderListUl.append(newOrderLi)
}

function createMenu(){
  customBurgerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nBurgerName = e.target.name.value
    const nBurgerDes = e.target.description.value
    const nBurgerImg = e.target.url.value
    // console.log("I've been clicked!", newBurgerName)
    // debugger
    fetch(burgerUrl, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "name": nBurgerName,
        "description": nBurgerDes,
        "image": nBurgerImg
      })
    })
    .then(resp => resp.json())
    .then(newBurger => {
      displayBurger(newBurger)
      addNewOrder(newBurger)
    })
  })
}