//************/ VARIABLES GLOBALES ************//
// Variables 1ère modale //
const btnModify = document.querySelector (".div_title_and_btn_modify .btn_modify");
const modal = document.querySelector (".modal");
const selectionGallery = document.querySelector (".selection_gallery");
const cross = document.querySelector (".modal .fa-xmark");
const displayGallery = document.querySelector (".gallery");
const btnAddPicture = document.querySelector (".modal_portfolio .btn_Add_Picture");

// Variables 2ème modale //
const crossModal2 = document.querySelector (".modal_2 .fa-xmark");
const modal2 = document.querySelector (".modal_2");
const btnAddPictureModal2 = document.querySelector (".content_modal_add_picture .btn_add_picture");
const btnValidate = document.querySelector (".modal_add_picture .btn_validate");



//**************************** 1ère MODALE  *********************************/

// Fonction pour afficher la modale avec galerie photo et corbeille //
async function displayModal () {
    const arrayWorks = await getWorks();
    console.log(arrayWorks);

    btnModify.addEventListener ("click", ()=> {
        selectionGallery.innerHTML = "";

        arrayWorks.forEach(picture => {         
            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = picture.imageUrl;

            const spanBin = document.createElement("span");

            const deletePicture = document.createElement("i");
            deletePicture.classList.add("fa-solid", "fa-trash-can");
            deletePicture.id = picture.id;
                        
            selectionGallery.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(spanBin);
            spanBin.appendChild(deletePicture);           
        });
        modal.style.display = "flex";
        deleteImg();      
    }); 
    
    
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


//**************************** 2ème MODALE  *********************************/

// Fonction pour ouverture de la 2ème modale //
async function displayModalAddPicture () {
    btnAddPicture.addEventListener ("click", () => {
        modal.style.display = "none";
        modal2.style.display = "flex";
        btnValidate.style.backgroundColor = "rgb(167, 167, 167)";
        btnValidate.style.borderColor = "rgb(167, 167, 167)";
    });
}
displayModalAddPicture();


// Fonction pour supprimer une photo dans la modale //
function deleteImg() {
    const allBin = document.querySelectorAll (".fa-trash-can");

    allBin.forEach(bin => {
        bin.addEventListener ("click", () => {
            // Récupération de l'élément parent //
            const parentImg = bin.closest("figure");
            // suppression de l'élément parent //
            parentImg.remove();
        });
    });
}

// Fonction pour ajouter des images //
function addPicture () {
    btnAddPictureModal2.addEventListener ("click", () => {
        // Cacher les balises img, bouton et h3 //
        const iconVector = document.querySelector (".iconVector");
        iconVector.style.display = "none";
        btnAddPictureModal2.style.display = "none";
        const textExtensionPhoto = document.querySelector (".text_Extension_Photo");
        textExtensionPhoto.style.display = "none";

        // Création d'une balise input de type file, pour insérer la photo en prévisualisation //
        const fileInput = document.createElement("input");
        fileInput.classList.add("previewPicture");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";
        fileInput.style.height = "20px";
        fileInput.click();
        
        // Ajout d'un écouteur d'évènement si l'utilisateur annule son choix d'ajouter une photo : la balise input apparaît //
        fileInput.addEventListener("cancel", () => {
            fileInput.style.display = "flex";
        })

        // Ajout d'un écouteur d'évènement quand l'utilisateur choisit une nouvelle photo //
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
            const previewImage = document.createElement("img");
            previewImage.src = event.target.result;
            previewImage.style.width = "auto%";
            previewImage.style.height = "100%";
            const containerPreviewImage = document.querySelector(".content_modal_add_picture");
            containerImgPreview.appendChild(previewImage);
            }
            reader.readAsDataURL(file);
            }
        });
    


        const containerImgPreview = document.querySelector (".content_modal_add_picture");
        containerImgPreview.appendChild(fileInput);
        console.log(fileInput);
    })
}
addPicture();

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