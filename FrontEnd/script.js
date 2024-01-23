// VARIABLES DU PROJET//
//Récupération de la section portfolio//
const portfolio = document.getElementById("portfolio");
//Récupération de la galerie//
const gallery = document.querySelector (".gallery");
//Récupération des boutons//
const divButtonFilter = document.querySelector(".div_btn_filter");


//**********************************************//
// AFFICHAGE DU PORTFOLIO
//**********************************************//

// Récupération de l'API works //
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const responseJson = await response.json();
  return responseJson;
}

//Affichage du portfolio + création balise "figure" (comprenant balises "img" et "figcaption)" //
async function displayPortfolio() {    
  const arrayWorks = await getWorks ();
  gallery.innerHTML = "";  

  updateGallery(arrayWorks);
  // for (let i=0; i<arrayWorks.length; i++) {
  //   const figure = document.createElement ("figure");
  //     gallery.appendChild(figure);

  //     const image = document.createElement ("img");
  //     figure.appendChild (image);
  //     image.src = arrayWorks[i].imageUrl;

  //     const figcaption = document.createElement ("figcaption");      
  //     figure.appendChild(figcaption);
  //     figcaption.textContent = arrayWorks[i].title;
  // }

}
displayPortfolio();


//**********************************************//
// CREATION DES BOUTONS
//**********************************************//

// récupération de l'API categories //
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const responseJson = await response.json();
  return responseJson;
}

// Création des boutons par catégories //
async function buttonsCategories() {
  const arrayCategories = await getCategories();
  
  const buttonNamedAll = document.createElement ("button")
    buttonNamedAll.classList.add ("btn");
    buttonNamedAll.textContent = "Tous";
    buttonNamedAll.id = 0;
    divButtonFilter.appendChild(buttonNamedAll);
    
// méthode foreach //
  arrayCategories.forEach(category => {
    const buttonFilters = document.createElement("button");
      buttonFilters.classList.add("btn");
      buttonFilters.textContent = category.name;
      buttonFilters.id = category.id;   
      divButtonFilter.appendChild(buttonFilters);
  });
}
buttonsCategories();

//**********************************************//
//CREATION DES FONCTIONS POUR LES FILTRES SUR BOUTONS
//**********************************************//

// Filtre par catégorie au clic sur le bouton //
async function filtersCategories () {
  const arrayAllPictures = await getWorks();
  
  const allButtons = document.querySelectorAll(".btn");
  allButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const btnId = event.target.id;
      
      if (btnId !== "0") {
        const filterPortfolio = arrayAllPictures.filter((picture) => {
          return picture.categoryId === parseInt(btnId);
        });
        updateGallery(filterPortfolio);
      } else {
        displayPortfolio();
      }
      });    
    });
  }  
    
filtersCategories();

// Mise à jour de la galerie avec les éléments filtrés
function updateGallery(filteredArray) {
  gallery.innerHTML = "";

  
    filteredArray.forEach(picture => {
      
      const figure = document.createElement("figure");
      gallery.appendChild(figure);
    
      const image = document.createElement("img");
      figure.appendChild(image);
      image.src = picture.imageUrl;
    
      const figcaption = document.createElement("figcaption");
      figure.appendChild(figcaption);
      figcaption.textContent = picture.title;
    });
  }



