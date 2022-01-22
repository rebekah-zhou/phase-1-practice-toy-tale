let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyIdArray = []
  let toyCounter = 0
  const toyCollection = document.querySelector('#toy-collection')

  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
    
      toys.forEach(toy => {
        toyCard = createToyCard(toy)
        toyCollection.append(toyCard)
        toyIdArray.push(++toyCounter)
      })
       
      function createToyCard(obj) {
        const h2Name = document.createElement('h2')
        const cardDiv = document.createElement('div')
        const imgAvatar = document.createElement('img')
        const pLikes = document.createElement('p')
        const buttonId = document.createElement('button')

        cardDiv.className = 'card'
        imgAvatar.src = obj.image
        imgAvatar.className = 'toy-avatar'
        h2Name.textContent = obj.name
        pLikes.textContent = `${obj.likes} likes`
        buttonId.className = 'like-btn'
        buttonId.id = obj.id
        buttonId.textContent = 'Like ❤️'
        cardDiv.append(h2Name, imgAvatar, pLikes, buttonId)

        return cardDiv
      }
    })

    const newToySubmit = document.querySelector("form.add-toy-form")
    newToySubmit.addEventListener('submit', e => {
      
      e.preventDefault()
      const newToyName = document.querySelector("form.add-toy-form input[name='name']")
      const newToyImage = document.querySelector("form.add-toy-form input[name='image']")
      addToy = !addToy;
      toyFormContainer.style.display = "none";

      const newToy = {
        id: ++toyCounter,
        name: newToyName.value,
        image: newToyImage.value,
        likes: 0
      }

      console.log(newToy)

      const configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(newToy)
      }

      fetch('http://localhost:3000/toys', configObj)
        .then(() => {
          const newToyCard = createToyCard(newToy)
          toyCollection.append(newToyCard)
          toyIdArray.push(toyCounter)
          console.log(toyIdArray)
        })
    
    })
  
  const idButton = document.querySelectorAll('#toy-collection div button')
  idButton.forEach(button => {
    console.log(button)
    button.addEventListener('click', e => {
    console.log(e.target)
    })
  })
  

});
