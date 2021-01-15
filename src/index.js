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
});

// let the challenge begin!
// fetch toys
  async function fetchToys() {
    return fetch("http://localhost:3000/toys")
      .then(response => response.json())
      // .then(results => addToys(results))
      .then(function(toys) {
        renderToys(toys);
      })
  }

// add toy info to the card
  function renderToys(toys) {
    toys.forEach(function(toy) {
      // parse each toy data, set variables, manipulate dom, and add event lisenser
      // impotant!!! Never use the Dot Notation when using a Variable
      let toyId = toy["id"]; // or toy.id
      let toyName = toy["name"]; // or toy.name
      let toyImage = toy["image"]; // or toy.image
      let toyLikes = toy["likes"]; // or toy.likes

      let h2 = document.createElement("h2")
      h2.innerText = toyName

      let img = document.createElement("img")
      // .classList.add("toy-avatar"); ---> this causes cannot read prperty for next line; why???
      img.setAttribute('class', "toy-avatar")
      img.setAttribute('src', toyImage);

      let p = document.createElement("p")
      p.innerText = `${toyLikes} likes`

      let btn = document.createElement('button')
      // .classList.add("like-btn"); ---> this line causes cannot read property for next line like above; why??
      btn.setAttribute('class', "like-btn")
      btn.setAttribute('id', toyId)
      btn.addEventListener('click', (event) => {likeToys})
      
      // create div with class card -> append to toy collection
      // append each toy attribute to div with class card
      let divCard = document.createElement('div')
      divCard.setAttribute('class', 'card')
      let toyContainer = document.querySelector("#toy-collection")
      divCard.appendChild(h2, img, p, btn)
      toyContainer.appendChild(divCard)
    });
  }

    // likeToys function to handle like toys button
      function likeToys(event) {
        let likeToy = event
        console.log(e.target.dataset)
        likes(event)
      } 

// create new toys
  async function createToys(toyName, toyImage) {
    let toyForm = {
      name: toyName,
      image: toyImage
    }

    let toyObject = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyForm)
    }

    return fetch("http://localhost:3000/toys", toyObject)
      .then(function(response) {
        return response.json();
      })
      .then(newToyData => renderNewToys(newToyData)
      )
      .catch(function(error) {
        alert("something is not right. trace and debug!");
        console.log(error.message);
      });

      function renderNewToys(newToyData) {
        let toyFormContainer = document.querySelector(".container");

        let h2 = document.createElement("h2")
        h2.innerHTML = newToyData.name

        let img = document.createElement("img")
        img.setAttribute('class', "toy-avatar")
        img.setAttribute('src', newToyData.image)

        let btn = document.createElement('button')
        btn.setAttribute('class', "like-btn")
        btn.setAttribute('id', newToyData.id)
        btn.addEventListener('click', (event) => {event.target.dataset})

        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.appendChild(h2, img, btn)

        toyFormContainer.appendChild(divCard)
      }
  }

  // increase toy's likes
    async function likesToy() {

      let toyObj = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Accept": "application/json"
        },

        body: JSON:stringify({
          "likes": `${likes}`
        })
      }

      return fetch('http://localhost:3000/toys/:id')

    }
    