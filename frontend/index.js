const form = document.querySelector(".beautiful-form");
const output = document.querySelector(".output");

let editMode = false;
let editUserId = null;

fetchUsers();

// FORM SUBMIT HANDLER
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone || !email) return alert("Please fill all fields");

  try {
    let response;

    if (editMode) {
      // Edit user mode
      response = await fetch(`http://localhost:3000/book-appointment/update-details/${editUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone_no: phone, email }),
      });
    } else {
      // Create new user
      response = await fetch("http://localhost:3000/book-appointment/user-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone_no: phone, email }),
      });
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    form.reset();
    editMode = false;
    editUserId = null;
    fetchUsers();
  } catch (err) {
    console.error("Error:", err.message);
  }
});

// FETCH USERS
async function fetchUsers() {
  try {
    const res = await fetch("http://localhost:3000/book-appointment/user-details");
    const { allUsers } = await res.json();

    output.innerHTML = "";

    allUsers.forEach((user) => {
      const li = document.createElement("li");
      li.classList.add("output-list");
      li.innerHTML = `
        ${user.name} - ${user.phone_no} - ${user.email}
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      `;

      output.appendChild(li);
    });
  } catch (error) {
    console.log(error.message);
  }
}

// DELETE USER
async function deleteUser(id) {
  try {
    const res = await fetch(`http://localhost:3000/book-appointment/delete-users/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete user");
    }

    fetchUsers();
  } catch (error) {
    console.log("Delete Error:", error.message);
  }
}

// EDIT USER
async function editUser(id) {
  try {
    const res = await fetch(`http://localhost:3000/book-appointment/user-details/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user details");

    const user = await res.json();

    // Pre-fill form with existing user data
    document.getElementById("name").value = user.name;
    document.getElementById("phone").value = user.phone_no;
    document.getElementById("email").value = user.email;

    editMode = true;
    editUserId = id;
  } catch (error) {
    console.error("Edit Error:", error.message);
  }
}
