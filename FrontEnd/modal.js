const btnModify = document.querySelector (".btn_modify");
const modal = document.querySelector (".modal");
const selectionGallery = document.querySelector (".selection_gallery");
const cross = document.querySelector (".modal .fa-xmark");
const displayGallery = document.querySelector (".gallery");

// Fonction pour afficher la modal avec galerie photo et corbeille //
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

// Fonction pour fermer la modal //
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

