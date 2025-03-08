const screenPrincipal = document.getElementById("screen-principal")
const screenRegister = document.getElementById("screen-register")
const screenLogin = document.getElementById("screen-login")
const screenCreatePost = document.getElementById("screen-create-post")
const goToScreenPp = document.querySelectorAll(".go-to-screen-pp")


screenRegister.style.display = "none";
screenLogin.style.display = "none";
screenCreatePost.style.display = "none";

document.getElementById("go-to-registro").addEventListener("click", () => {
  screenRegister.style.display = "block"
  screenPrincipal.style.display = "none"
  screenLogin.style.display = "none"
})

document.getElementById("go-to-login").addEventListener("click", ( ) => {
  screenLogin.style.display = "block"
  screenPrincipal.style.display = "none"
  screenRegister.style.display = "none"
})

goToScreenPp.forEach(p => {
  p.addEventListener("click", () => {
      screenPrincipal.style.display = "block";
      screenLogin.style.display = "none";
      screenRegister.style.display = "none";
      screenCreatePost.style.display = "none";
  });
});

// Crear usuario

const userNameInput = document.getElementById("user-register")
const nameInput = document.getElementById("name-register")
const urlImgInput = document.getElementById("user-img")
const passwordInput = document.getElementById("password-register")

const fetchUrl = 'http://localhost:5051/registro-user'
async function fetctDataUserRegister() {
  try {
    if (!userNameInput.value || !nameInput.value || !urlImgInput.value || !passwordInput.value) {
      throw new Error("Por favor rellene todos los campos");
    }
    const userRequest = { 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify({
        userName: userNameInput.value,
        name: nameInput.value,
        urlImg: urlImgInput.value,
        password: passwordInput.value
      }),
    }
  
    const response = await fetch(fetchUrl, userRequest);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en el registro");
    }

    const data = await response.json();
    alert(data.message);
    
    userNameInput.value = "";
    nameInput.value = "";
    urlImgInput.value = "";
    passwordInput.value = "";

    screenPrincipal.style.display = "block";
    screenRegister.style.display = "none";

  } catch (error) {
    console.error("Error en el registro:", error.message);
    alert(error.message)
  }
}

document.getElementById("register").addEventListener("click", fetctDataUserRegister);


//Login

let currentUserName = "";

const userNameInputLogin = document.getElementById("user-login")
const passwordInputLogin = document.getElementById("password-login")

const loginUrl = "http://localhost:5051/login-user";

async function fetchDataUserLogin() {
  try {
    if (!userNameInputLogin.value || !passwordInputLogin.value) {
      throw new Error("Por favor, complete todos los campos");
    }

    const loginRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userNameInputLogin.value,
        password: passwordInputLogin.value,
      }),
    };

    const response = await fetch(loginUrl, loginRequest);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en el inicio de sesión");
    }

    const data = await response.json();
    alert("Inicio de sesión exitoso, bienvenido " + data.user.name);

    currentUserName = data.user.name;

    userNameInputLogin.value = "";
    passwordInputLogin.value = "";

    screenCreatePost.style.display = "block";
    screenLogin.style.display = "none";

  } catch (error) {
    console.error("Error en el login:", error.message);
    alert(error.message);
  }
}

document.getElementById("login").addEventListener("click", fetchDataUserLogin);

// Crear Post

const titleInput = document.getElementById("title")
const urlImgPostInput = document.getElementById("image")
const descriptionInput = document.getElementById("description")

const createPostUrl = "http://localhost:5051/create-post";

async function fetchDataCreatePost() {
  try {
    if (!titleInput.value || !descriptionInput.value) {
      throw new Error("Por favor, complete los campos de titulo y descripción");
    }

    if (!currentUserName) {
      throw new Error("Debes iniciar sesión antes de crear un post");
    }

    const createPostRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: currentUserName,
        title: titleInput.value,
        description: descriptionInput.value,
        urlImg: urlImgPostInput.value || "",
      }),
    };

    const response = await fetch(createPostUrl, createPostRequest);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en el inicio de sesión");
    }

    const data = await response.json();
    alert(data.post.name + " tu post ha sido creado");

    titleInput.value = "";
    descriptionInput.value = "";
    urlImgPostInput.value = "";

  } catch (error) {
    console.error("Error al crear post", error.message);
    alert(error.message);
  }
}

document.getElementById("create").addEventListener("click", fetchDataCreatePost);
