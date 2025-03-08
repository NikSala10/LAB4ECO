const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use("/screen-user-post", express.static(path.join(__dirname, "screen-user-post")));
app.use("/screen-all", express.static(path.join(__dirname, "screen-all")));

const usersFilePath = path.join(__dirname, "users.json");
const postsFilePath = path.join(__dirname, "posts.json");

let users = [];
let posts = [];

if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

if (fs.existsSync(postsFilePath)) {
    posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
}

app.post("/registro-user", (request, response) => {
    const { userName, name, urlImg, password } = request.body;
    const existingUser = users.find(user => user.userName === userName);

    if (existingUser) {
        return response.status(400).json({ error: "Usuario ya registrado" });
    }

    const newUser = { id: users.length + 1, userName, name, urlImg, password };
    users.push(newUser);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    response.status(201).json({ message: "Usuario registrado correctamente", user: newUser });
});

app.get("/registro-user", (request, response) => {
    // const { userName, name, urlImg} = request.query; 
    // console.log(search, age);
    response.status(200).send(users);
});

app.post("/login-user", (request, response) => {
    const { userName, password } = request.body;
    const user = users.find(u => u.userName === userName);

    if (!user) {
        return response.status(404).json({ error: "Usuario no registrado" });
    }

    if (user.password !== password) {
        return response.status(401).json({ error: "Contraseña incorrecta" });
    }
 
    response.status(200).json({ message: "Login exitoso", user });
});

app.get("/login-user", (request, response) => {
    response.status(200).send(users);
});

app.post("/create-post", (request, response) => {
    const { name, urlImg, title, description } = request.body;

    const user = users.find(u => u.name === name);

    if (!user) {
        return response.status(404).json({ error: "Usuario no encontrado" });
    }

    const newPost = { 
        postId: posts.length + 1,
        name: user.name,
        urlImg: urlImg || "", 
        title, 
        description 
    };

    posts.push(newPost);

    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

    response.status(201).json({ message: "Post creado exitosamente", post: newPost });
});

app.get("/create-post", (request, response) => {
    response.status(200).send(posts);
});

app.listen(5051);
