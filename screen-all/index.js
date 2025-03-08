const divPosts = document.getElementById("posts")
const disUsers = document.getElementById("users")

// GET ALL USERS
const getUsersBtn = document.getElementById("get-users").addEventListener("click", fetchGetAllUsers);

async function fetchGetAllUsers() {
  try {
    const response = await fetch("http://localhost:5051/login-user");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  const data = await response.json();
  renderAllUsersData(data);
  
  const resultsPFetch = document.querySelectorAll(".results");
  resultsPFetch.innerHTML= ""

  const allUsersContainer = document.getElementById("users");
  allUsersContainer.style.display = "block";
    
  } catch (error) {
    console.error("Error al traer datos")
  }
}

const renderAllUsersData = (data) => {
    const containerUsers = document.getElementById("users");
    containerUsers.innerHTML = "";
  
    data.forEach((user) => {
        const cardUser = document.createElement("div");
        cardUser.className = "card-user";
        cardUser.innerHTML = `
        <div class="image">
          <img src="${user?.urlImg}" alt="${user?.name}">
        </div>
        <div class="content">
          <h3>${user?.name}</h3>
          <p>${user?.userName}</p>
        </div>
        `;
        containerUsers.appendChild(cardUser);
    });
  }

// GET ALL POSTS

const getPostsBtn = document.getElementById("get-posts").addEventListener("click", fetchGetAllPosts);

async function fetchGetAllPosts() {
  try {
    const response = await fetch("http://localhost:5051/create-post");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  const data = await response.json();
  renderAllPostsData(data);
  
  const resultsPFetch = document.querySelectorAll(".results");
  resultsPFetch.innerHTML= ""

  const allPostContainer = document.getElementById("posts");
  allPostContainer.style.display = "block";
   
  } catch (error) {
    console.error("Error al traer datos")
  }
}

const renderAllPostsData = (data) => {
  const containerPosts = document.getElementById("posts");
  containerPosts.innerHTML = "";

  data.forEach((post) => {
      const cardPost = document.createElement("div");
      cardPost.className = "card-post";
      cardPost.innerHTML = `
      <p>${post?.name}</p>
      <div class="image">
        <img src="${post?.urlImg}" alt="${post?.title}">
      </div>
      <div class="content">
        <h3>${post?.title}</h3>
        <p>${post?.description}</p>
      </div>
      `;
      containerPosts.appendChild(cardPost);
  });
}


  