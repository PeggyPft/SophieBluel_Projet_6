const btnModify = document.querySelector (".div_title_and_btn_modify .btn_modify");
const modal = document.querySelector (".modal");
const selectionGallery = document.querySelector (".selection_gallery");
const cross = document.querySelector (".modal .fa-xmark");
const crossModal2 = document.querySelector (".modal_2 .fa-xmark");
const displayGallery = document.querySelector (".gallery");
const btnAddPicture = document.querySelector (".modal_portfolio .btn_Add_Picture");
const modal2 = document.querySelector (".modal_2");

// Fonction pour afficher la modale avec galerie photo et corbeille //
async function displayModal () {
    const arrayWorks = await getWorks();
    
    btnModify.addEventListener ("click", ()=> {
        selectionGallery.innerHTML = "";

        arrayWorks.forEach(picture => {         
            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = picture.imageUrl;

            const spanBin = document.createElement("span");

            const deletePicture = document.createElement("i");
            deletePicture.classList.add("fa-solid", "fa-trash-can");
                        
            selectionGallery.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(spanBin);
            spanBin.appendChild(deletePicture);           
        });
        modal.style.display = "flex";        
    })    
}
displayModal ();

// Fonction pour fermer la modale //
async function closeModal () {
    modal.addEventListener ("click", (event) => {
        if (event.target.className == "modal") {
            modal.style.display = "none";
        }
    })
    cross.addEventListener ("click", () => {
        modal.style.display = "none";
    })
}
closeModal();

// Fonction pour ouverture de la 2ème modale //
async function displayModalAddPicture () {
    btnAddPicture.addEventListener ("click", () => {
        modal.style.display = "none";
        modal2.style.display = "flex";

    });
}
displayModalAddPicture();

// Fonction pour fermer la 2ème modale //
async function closeModal2 () {
    modal2.addEventListener ("click", (event) => {
        if (event.target.className == "modal_2") {
            modal2.style.display = "none";
        }
    })
    crossModal2.addEventListener ("click", () => {
        modal2.style.display = "none";
    })
}
closeModal2();