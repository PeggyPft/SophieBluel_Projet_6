// VARIABLES DU PROJET//
const form = document.querySelector ("form");
const email = document.querySelector ("#email");
const password = document.querySelector("#password");


// Pour empêcher le rechargement de la page à la soumission du formulaire //
form.addEventListener("submit",async(event)=>{
    event.preventDefault();

// Extraction des valeurs saisies dans le formulaire (email et mot de passe) //    
    const userEmail = email.value;
    const userPassword = password.value;
    
// Requête POST asynchrone vers API users/Login //    
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
        });

// Récupération de la réponse JSON //
        const data = await response.json();

// Condition d'authentification //   

        // Authentification réussie (statut !== 404)

        if (response.ok && data.message !== "user not found") {            
            const errorLogin = document.querySelector(".error_Login");
            errorLogin.textContent = "";
            window.localStorage.setItem("token", data.token);
            window.location.href = "index.html";

          } else { // Authentification échouée = affiche message d'erreur //
            
            const errorLogin = document.querySelector(".error_Login");
            errorLogin.textContent = "Votre e-mail ou mot de passe est incorrect";
          }

// Gestion des erreurs lors de la requête fetch //          
        } catch (error) {
          console.error("Erreur lors de la requête fetch :", error);
      
          const errorLogin = document.querySelector(".error_Login");
          errorLogin.textContent = "Une erreur s'est produite lors de l'authentification.";
        }
      });

// Mise à jour du lien "login/logout" //
async function updateLoginLink() {
  const loginLink = document.querySelector(".logout");
  const divButtonFilter = document.querySelector(".div_btn_filter");
  const btnModify = document.querySelector (".btn_modify");
  const topBar = document.querySelector (".topBar");
  const userLogged = window.localStorage.getItem ("token");
  

  if (userLogged) {
    loginLink.textContent = "logout";
    loginLink.addEventListener("click", () => {
      window.localStorage.removeItem("token");
      window.location.href = "login.html";
    });
    if (divButtonFilter) {
      divButtonFilter.style.display = "none";
    }
    if (btnModify, topBar) {
      btnModify.style.display = "flex";
      topBar.style.display = "flex";
    }
    
  } 
}
updateLoginLink();

