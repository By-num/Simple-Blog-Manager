# Simple Blog/Post Manager

This project is a simple blog/post manager web application that allows users to view, add, edit, and delete blog posts using a mock REST API powered by [json-server](https://github.com/typicode/json-server).

---

## Features

- **View all blog posts**: See a list of all post titles and images.
- **View post details**: Click a post to see its full details.
- **Add a new post**: Use the form to add a new blog post.
- **Edit a post**: Edit the title and content of an existing post.
- **Delete a post**: Remove a post from the list.

---

## Project Structure

```
Simple-Blog-Manager/
├── index.html
├── db.json
├── css/
│   └── styles.css
└── src/
    └── index.js
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Simple-Blog-Manager
```

### 2. Install `json-server` globally (if you haven't already)

```bash
npm install -g json-server
```

### 3. Start the mock API server

```bash
json-server --watch db.json
```

The API will be available at [http://localhost:3000/posts](http://localhost:3000/posts).

### 4. Open the app

Open `index.html` in your browser (you can use the Live Server extension in VS Code for a better experience).

---

## API Endpoints

- `GET /posts` - Retrieve all blog posts
- `GET /posts/:id` - Retrieve a single blog post by ID
- `POST /posts` - Create a new blog post
- `PATCH /posts/:id` - Update an existing blog post
- `DELETE /posts/:id` - Delete a blog post

---

## Customization

- Edit `db.json` to add or modify initial posts.
- Edit `css/styles.css` to change the look and feel.
- Edit `src/index.js` to add more features or change logic.

---

## License

This project is for educational