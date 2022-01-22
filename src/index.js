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

  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      const toyCollection = document.querySelector('#toy-collection')
      toys.forEach(toy => {
        toyCard = createToyCard(toy)
        toyCollection.append(toyCard)
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
        console.log(cardDiv)
        return cardDiv
      }
    })
    

});
