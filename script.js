const postsPerPage = 5;
let posts = [];
let currentPage = 1;

// Création dynamique des éléments HTML
// function async qui englobe tout :
async function app() {
  function creerTitre(titre) {
    const title = document.createElement("h2");
    title.textContent = titre;
    document.body.appendChild(title);
    return title;
  }

  const title = creerTitre("Liste de Posts");
  const postsContainer = document.createElement("div");
  postsContainer.appendChild(title);
  postsContainer.id = "posts-container";
  document.body.appendChild(postsContainer);
  console.log(title);
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
  async function fetchPosts(
    url = "https://jsonplaceholder.typicode.com/posts"
  ) {
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

  const fetchPost = async () => {
    await fetchData("posts", showPage);
    let post = await fetchData("posts", showPage);
    console.log(posts);
    return posts;
  };
  posts = await fetchPost();
  console.log("hello", posts);
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

  /* const userContainer = document.getElementById("user-container");
const userPrevBtn = document.getElementById("prev-btn");
const userNextBtn = document.getElementById("next-btn"); */

  const userCont = document.createElement("div");
  document.body.appendChild(userCont);
  userCont.id = "users";

  const titleUser = creerTitre("list d'Users");

  const userContainer = document.createElement("div");

  const userPrevBtn = document.createElement("button");
  const userNextBtn = document.createElement("button");
  console.log(userNextBtn);

  userContainer.id = "user-container";

  userCont.append(titleUser);
  userCont.append(userContainer);
  userCont.append(userPrevBtn);
  userCont.append(userNextBtn);
  userNextBtn.textContent = "suivant";
  userPrevBtn.textContent = "précident";
  currentPage = 1;
  const usersPerPage = 5;
  let users = [];

  async function fetchData(finLink, fn) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${finLink}`
      );
      const data = await response.json();
      fn(data);
      return data;
    } catch (error) {
      console.error("Erreur de chargement des utilisateurs :", error);
    }
  }

  // Fonction pour récupérer et stocker les utilisateurs
  /* const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await response.json();

    displayUsers(users);
  } catch (error) {
    console.error("Erreur de chargement des utilisateurs :", error);
  }
}; */

  // Fonction pour afficher les utilisateurs en fonction de la page
  const displayUsers = (users) => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToDisplay = users.slice(startIndex, endIndex);

    // Nettoyer et afficher les utilisateurs //

    userContainer.innerHTML = "";

    /*   userCont.append([userContainer, titleUser, userPrevBtn, userNextBtn]); */
    console.log(userCont);
    usersToDisplay.forEach((user) => {
      const userElement = document.createElement("p");
      userElement.textContent = `${user.id}. ${user.name} - ${user.email}`;
      userContainer.appendChild(userElement);
    });

    // Désactiver les boutons en cas de limite
    userPrevBtn.disabled = currentPage === 1;
    userNextBtn.disabled = endIndex >= users.length;
  };
  const fetchUsers = async () => {
    await fetchData("users", displayUsers);
    let users = await fetchData("users", displayUsers);
    console.log(users);
    return users;
  };
  users = await fetchUsers();
  console.log("hi", users);

  // Gestion des boutons de pagination
  userPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayUsers(users);
    }
  });

  userNextBtn.addEventListener("click", () => {
    if (currentPage * usersPerPage < users.length) {
      currentPage++;
      displayUsers(users);
    }
  });

  // Chargement initial des utilisateurs
  /*   fetchUsers(); */
}
app();
