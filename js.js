// Partie Utilisateurs ------------------------------------:
// fecthe prametres(url, options);
fetch("https://jsonplaceholder.typicode.com/users");
//consolo
// network : voir ce qui envoyer et recu
// actualisation js / voir headers exemple fetch fait par defaut du get(recuperer les donées), et fait aussi post pour les envoyées
// mnt recuppere notre reponse, la un peut complique
//car fetch envoye des promises, on va utliser la fonction then
// utiliser soit  fonction .then(funtion(repense){ })
// ou anonyme avec un seul param ou fonction fleché plus simple :

/* .then(reponse = > console.log(reponse)); ??? ----- a voir avec marine -------
/* .then((reponse) => console.log(reponse)); */
/* .then((reponse) => reponse.json()); */

// pourquoi ne fonctione pas ???---------------- a voir avec marine ------------
/* let reponse = users
.then((reponse) => reponse.json());
.then((reponse2) => console.log(reponse2.json()));
.then(users => console.log(users))
.catch(error => console.error("Erreur :", error)); */
//-------------------------------------------------------------------
//---------meeeeeee--------------------------------------------------
fetch("https://jsonplaceholder.typicode.com/users");
/*.then((reponse) => reponse.json()) // Convertir la réponse en JSON
  .then((data) => console.log(data)) // Afficher les données
  .catch((error) => console.error("Erreur :", error)); // Gérer les erreurs */
//-------------------------------------------------------------------
//--------------------------------marine-----------------------------
/* fetch("https://jsonplaceholder.typicode.com/users");
.then((data) => console.table(data))
const usersPerPage = 5;
let allUsers = [];
let currentPageUsers = 1;
let url = "https://jsonplaceholder.typicode.com/users";

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Loading ${url.split("/").pop()} data failed`);
  }
  return await response.json();
} */
//-------------------------copi-------------------------------------
const userContainer = document.getElementById("user-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentPage = 1;
const usersPerPage = 5;
let users = [];

// Fonction pour récupérer et stocker les utilisateurs
const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await response.json();
    displayUsers();
  } catch (error) {
    console.error("Erreur de chargement des utilisateurs :", error);
  }
};

// Fonction pour afficher les utilisateurs en fonction de la page
const displayUsers = () => {
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersToDisplay = users.slice(startIndex, endIndex);

  // Nettoyer et afficher les utilisateurs
  userContainer.innerHTML = "";
  usersToDisplay.forEach((user) => {
    const userElement = document.createElement("p");
    userElement.textContent = `${user.id}. ${user.name} - ${user.email}`;
    userContainer.appendChild(userElement);
  });

  // Désactiver les boutons en cas de limite
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = endIndex >= users.length;
};

// Gestion des boutons de pagination
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayUsers();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage * usersPerPage < users.length) {
    currentPage++;
    displayUsers();
  }
});

// Chargement initial des utilisateurs
fetchUsers();
