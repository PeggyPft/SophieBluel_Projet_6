//************/ VARIABLES GLOBALES ************//
// Variables 1ère modale //
const btnModify = document.querySelector (".div_title_and_btn_modify .btn_modify");
const modal = document.querySelector (".modal");
const selectionGallery = document.querySelector (".selection_gallery");
const cross = document.querySelector (".modal .fa-xmark");
const displayGallery = document.querySelector (".gallery");
const btnAddPicture = document.querySelector (".modal_portfolio .btn_Add_Picture");
const writeTitle = document.getElementById("title_form");  
const selectCategory = document.getElementById("category_form");

// Variables 2ème modale //
const containerModalAddPicture = document.querySelector(".content_modal_add_picture");
const formModal2 = document.querySelector(".form_Modal2");
const crossModal2 = document.querySelector (".modal_2 .fa-xmark");
const modal2 = document.querySelector (".modal_2");
const iconVector = document.querySelector (".iconVector");
const btnAddPictureModal2 = document.querySelector (".content_modal_add_picture .btn_add_picture");
const textExtensionPhoto = document.querySelector (".text_Extension_Photo");
const btnValidate = document.querySelector (".modal_add_picture .btn_validate");
const arrowModal2 = document.querySelector (".modal_add_picture .fa-arrow-left");
const previewImage = document.createElement("img");



//**************************** 1ère MODALE  *********************************/

// Fonction pour afficher la modale avec galerie photo et corbeille //
async function displayModal () {
    try {
        const arrayWorks = await getWorks();

        btnModify.addEventListener ("click", async ()=> {
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

    // Saisie du titre // 
                
            writeTitle.addEventListener("input", (event) => {
                const titlePicture = event.target.value;
            });

    // affichage de la liste déroulante des catégories//
            
            selectCategory.innerHTML = "";

                const categories = await getCategories();
                categories.forEach(category => {
                    const option = document.createElement("option");
                    option.value = category.id;
                    option.textContent = category.name;
                    selectCategory.appendChild(option);
                });
                    
            modal.style.display = "flex";
            deleteImg();      
        }); 
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
    }
    
}
displayModal ();


// Fonction pour supprimer une photo dans la modale //
function deleteImg() {
    const allBin = document.querySelectorAll (".fa-trash-can");
    allBin.forEach(bin => {
        bin.addEventListener ("click", () => {
            const binId = bin.id;
            const token = window.localStorage.getItem("token");
            fetch(`http://localhost:5678/api/works/${binId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("delete ne fonctionne pas");
            }
            // Supprimer l'image de la modale //
            const parentImg = bin.closest("figure");
            parentImg.remove();

            displayPortfolio();     
        })
        
    })  
    });
}


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



// Fonction pour ajouter des images //
function addPicture () {
    btnAddPicture.addEventListener ("click", () => {
        const retour = true;
        console.log("je clique sur le bouton");
        // Création d'une balise input de type file, pour insérer la photo en prévisualisation //
        const fileInput = document.createElement("input");
        fileInput.classList.add("previewPicture");
        const fileLabel = document.createElement("label");
        fileLabel.for = "file_form";
        fileInput.id = "file_form";
        fileInput.name = "image";
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.opacity = "0";
        fileInput.style.cursor = "pointer";
        
        
        formModal2.appendChild(fileInput);
        // containerModalAddPicture.appendChild(fileInput);

       // Ajout d'un écouteur d'évènement quand l'utilisateur choisit une nouvelle photo //
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];

        if (file) {
            // Cacher les balises img, bouton et h3 //
            iconVector.style.display = "none";
            btnAddPictureModal2.style.display = "none";        
            textExtensionPhoto.style.display = "none";

            const reader = new FileReader();

                reader.onload = function(event) {
                
                previewImage.classList.add ("photoLoad");
                previewImage.src = event.target.result;
                previewImage.style.width = "auto";
                previewImage.style.height = "100%";
                const containerPreviewImage = document.querySelector(".content_modal_add_picture");                
                containerPreviewImage.appendChild(previewImage);
                };                
                reader.readAsDataURL(file);            
            }    
            
        });
    })
    return addPicture;
}
addPicture();

// Fonction pour modifier la couleur du bouton "valider" lors de l'ajout d'une photo //
function imageValidationCondition () {
    
    
    formModal2.addEventListener("input", () => {
        const inputFile = document.querySelector(".previewPicture");    
        console.log(inputFile);
        if (inputFile.files.length !== 0 && writeTitle.value !== "") {   
                           
            btnValidate.disabled = false;
            btnValidate.style.backgroundColor = "rgb(29, 97, 84)";           
            console.log("vert");
                 
        }   else {
            btnValidate.disabled = true;
            btnValidate.style.backgroundColor = "rgb(167, 167, 167)";
            console.log("gris");
            
        }
    })
   
}
imageValidationCondition();

// Fonction pour valider le choix de la photo et l'ajout au portofolio //
function btnValidateChoiceImage () {
    
    btnValidate.addEventListener("click", () => {
        if (btnValidate.style.backgroundColor === "rgb(29, 97, 84)" ){
            const fileInput = document.querySelector(".previewPicture");
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append("image", file);
            formData.append("title", writeTitle.value);
            formData.append("category", selectCategory.value);

            const token = window.localStorage.getItem("token");
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error("Echec de l'ajout de la photo");
                }
                return response.json();
            })

            .then(data => {
                console.log("Photo ajoutée avec succès:", data);
            

            // Fermer la 2ème modale après avoir ajouté la photo //
            modal2.style.display = "none";

            // Ajouter la photo à la galerie //
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = data.imageUrl;

            const spanBin = document.createElement("span");
            const deletePicture = document.createElement("i");
            deletePicture.classList.add("fa-solid", "fa-trash-can");
            deletePicture.id = data.id;

            spanBin.appendChild(deletePicture);
            figure.appendChild(img);
            figure.appendChild(spanBin);
            selectionGallery.appendChild(figure);

        })

        } else {
            
            console.log("condition non remplie");

        }
    })
}
btnValidateChoiceImage();






// Fonction pour fermer la 2ème modale //
function closeModal2 () {
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

// Fonction pour revenir à la modale précédente au clic sur la flèche //
function returnModal1 () {
    arrowModal2.addEventListener ("click", () => {
        modal2.style.display = "none";
        displayModal();
        modal.style.display = "flex";
    });
}
returnModal1();