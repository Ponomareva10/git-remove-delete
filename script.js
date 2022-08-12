const root = document.querySelector(".root");
const inputs = document.querySelectorAll("form input");
const createBtn = document.querySelector(".createBtn");

const Users_URL = " http://localhost:3001/users";

async function getUsers () {
    await fetch(Users_URL)
    .then(res => res.json())
    .then(data => renderUsers(data))
}

async function createUser (obj) {
    await axios.post(`http://localhost:3001/users`, obj)
}

async function deleteUser (id) {
    await axios.delete(`http://localhost:3001/users/${id}`)
}

createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const obj = {}
    inputs.forEach(item => {
        obj[item.name] = item.value;
    })
    createUser(obj);
    getUsers();
})

function renderUsers (users) {
    root.innerHTML = ` `;
    users.forEach(item => {
        root.innerHTML += `
            <div class="userCard">
                <h2 class="userName" >${item.name}, ${item.age} years old </h2>
                <button class="btn_delete" data-id=${item.id}>Удалить</button>
            </div>
        `
    });

    const userCard = document.getElementsByClassName("userCard");
    console.log(userCard)
    Array.from(userCard).forEach(item => {
        const deleteBtn = document.getElementsByClassName("btn_delete");
        Array.from(deleteBtn).forEach(item => {
            item.addEventListener('click', (e) => {
                deleteUser(e.target.dataset.id);
                getUsers();
            })
        })
    })
}   
getUsers()