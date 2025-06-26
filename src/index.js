const API_URL = "http://localhost:3000/posts";

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);

function displayPosts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";
      posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post-item";
        div.innerHTML = `
          <h4>${post.title}</h4>
          <img src="${post.image}" alt="${post.title}" width="100">
        `;
        div.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(div);
      });
      // Show first post details automatically
      if (posts.length > 0) handlePostClick(posts[0].id);
    });
}

function handlePostClick(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.image}" alt="${post.title}">
        <p>${post.content}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;
      document.getElementById("edit-btn").onclick = () => showEditForm(post);
      document.getElementById("delete-btn").onclick = () => deletePost(post.id);
    });
}

function addNewPostListener() {
  document.getElementById("new-post-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("new-title").value;
    const author = document.getElementById("new-author").value;
    const image = document.getElementById("new-image").value;
    const content = document.getElementById("new-content").value;
    const newPost = { title, author, image, content };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(() => {
      displayPosts();
      this.reset();
    });
  });
}

// Edit and Delete
function showEditForm(post) {
  const form = document.getElementById("edit-post-form");
  form.classList.remove("hidden");
  form["edit-title"].value = post.title;
  form["edit-content"].value = post.content;
  form.onsubmit = function(e) {
    e.preventDefault();
    const updated = {
      title: form["edit-title"].value,
      content: form["edit-content"].value
    };
    fetch(`${API_URL}/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })
    .then(res => res.json())
    .then(() => {
      displayPosts();
      form.classList.add("hidden");
    });
  };
  document.getElementById("cancel-edit").onclick = () => form.classList.add("hidden");
}

function deletePost(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      displayPosts();
      document.getElementById("post-detail").innerHTML = "";
    });
}