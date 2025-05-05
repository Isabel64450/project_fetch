const postsPerPage = 5;
let posts = [];
let currentPage = 1;

// Création dynamique des éléments HTML
const title = document.createElement("h1");
title.textContent = "Liste des posts";
document.body.appendChild(title);

const postsContainer = document.createElement("div");
postsContainer.id = "posts-container";
document.body.appendChild(postsContainer);

const pagination = document.createElement("div");
pagination.className = "pagination-controls";

const prevBtn = document.createElement("button");
prevBtn.id = "prev-btn";
prevBtn.textContent = "Précédent";

const pageIndicator = document.createElement("span");
pageIndicator.id = "page-indicator";
pageIndicator.textContent = "Page 1";

const nextBtn = document.createElement("button");
nextBtn.id = "next-btn";
nextBtn.textContent = "Suivant";

pagination.appendChild(prevBtn);
pagination.appendChild(pageIndicator);
pagination.appendChild(nextBtn);
document.body.appendChild(pagination);

const loadAllBtn = document.createElement("button");
loadAllBtn.id = "load-all";
loadAllBtn.textContent = "Charger toutes les données";
document.body.appendChild(loadAllBtn);

const errorMessage = document.createElement("div");
errorMessage.id = "error-message";
document.body.appendChild(errorMessage);

// --- Fonction utilitaire pour créer un post ---
function createPostElement(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";

  const title = document.createElement("h3");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.textContent = post.body;

  postDiv.appendChild(title);
  postDiv.appendChild(body);

  return postDiv;
}

// --- Fonctions principales ---
async function fetchPosts(url = "https://jsonplaceholder.typicode.com/posts") {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur de chargement des données");
    posts = await response.json();
    showPage(1);
    errorMessage.textContent = "";
  } catch (err) {
    errorMessage.textContent = err.message;
    postsContainer.replaceChildren(); // Vide proprement
  }
}

function showPage(page) {
  currentPage = page;
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  postsContainer.replaceChildren(); // Vide proprement

  for (const post of pagePosts) {
    postsContainer.appendChild(createPostElement(post));
  }

  pageIndicator.textContent = `Page ${currentPage}`;
  updateButtons();
}

function updateButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= Math.ceil(posts.length / postsPerPage);
}

// --- Listeners ---
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) showPage(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentPage < Math.ceil(posts.length / postsPerPage)) {
    showPage(currentPage + 1);
  }
});

loadAllBtn.addEventListener("click", () => {
  postsContainer.replaceChildren();

  for (const post of posts) {
    postsContainer.appendChild(createPostElement(post));
  }

  pageIndicator.textContent = "Tous les posts chargés";
  prevBtn.disabled = true;
  nextBtn.disabled = true;
});

// --- Démarrage ---
fetchPosts();

const userContainer = document.getElementById("user-container");
const userPrevBtn = document.getElementById("prev-btn");
const userNextBtn = document.getElementById("next-btn");

currentPage = 1;
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

  // Nettoyer et afficher les utilisateurs //
  userContainer.innerHTML = "";
  usersToDisplay.forEach((user) => {
    const userElement = document.createElement("p");
    userElement.textContent = `${user.id}. ${user.name} - ${user.email}`;
    userContainer.appendChild(userElement);
  });

  // Désactiver les boutons en cas de limite
  userPrevBtn.disabled = currentPage === 1;
  userNextBtn.disabled = endIndex >= users.length;
};

// Gestion des boutons de pagination
userPrevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayUsers();
  }
});

userNextBtn.addEventListener("click", () => {
  if (currentPage * usersPerPage < users.length) {
    currentPage++;
    displayUsers();
  }
});

// Chargement initial des utilisateurs
fetchUsers();
