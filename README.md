# 🌍 Travelogged ✈  
## A Social Travel Blogging Platform

**Travelogged** is a vibrant travel blogging platform where users can share their travel stories, photos, background music, and receive feedback through comments and likes. Users can explore all blogs, search by user, country, or city, and interact with the community — while managing their own content securely.

---

## 🧭 Table of Contents

- [Features](#-features)
- [User Stories](#-user-stories)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Route Table](#-route-table)
- [Wireframes](#-wireframes)
- [Future Enhancements](#-future-enhancements)

---

## ✨ Features

- User signup and login (with card-style flip form)
- Users can create, edit, and delete travel blogs
- Each blog includes: Title, Image, Country, City, Date, Duration, Background Sound, and Story
- All blogs are displayed publicly on the homepage
- Like and comment system for blog interaction
- Search blogs by user, country, or city
- Only blog owners can edit or delete their blogs

---

## 👤 User Stories

- As a user, I can sign up and log in securely
- As a user, I can create a blog with text, image, and music
- As a user, I can view all blogs from other travelers
- As a user, I can search for blogs by country, city, or user name
- As a user, I can like and comment on blogs
- As a user, I can edit or delete only my own blogs

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS (Embedded JavaScript Templates)
- Multer (for file uploads)
- bcrypt (for password hashing)
- dotenv
- Method-Override
- Custom CSS

---

## ⚙️ Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/travelogged.git
   cd travelogged
   ```
2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the following:
    ```bash
    MONGODB_URI=your_mongo_connection_string
    SESSION_SECRET=your_session_secret
    ```

4. Start the development server
    ```bash
    npm run dev
    ```
---

## 🗺️ Route Table

| Method | Route              | Description             | Access     |
|--------|--------------------|-------------------------|------------|
| GET    | `/`                | Show all blogs (Homepage) | Public     |
| GET    | `/signup`          | Show signup form        | Public     |
| POST   | `/signup`          | Handle user signup      | Public     |
| GET    | `/login`           | Show login form         | Public     |
| POST   | `/login`           | Handle login            | Public     |
| GET    | `/logout`          | Handle logout           | Auth Users |
| GET    | `/blogs/new`       | Show create blog form   | Auth Users |
| POST   | `/blogs`           | Submit new blog         | Auth Users |
| GET    | `/blogs/:id`       | Show single blog        | Public     |
| GET    | `/blogs/:id/edit`  | Show blog edit form     | Blog Owner |
| PUT    | `/blogs/:id`       | Handle blog update      | Blog Owner |
| DELETE | `/blogs/:id`       | Delete blog             | Blog Owner |
| POST   | `/blogs/:id/like`  | Like a blog             | Auth Users |
| POST   | `/blogs/:id/comment` | Add comment            | Auth Users |
| GET    | `/search`          | Search by user, country, or city | Public |


## 🧱 [Wireframes](https://www.canva.com/design/DAGuvqXvQpU/TQ6v3UIkLobbhJCiB6vclg/edit?utm_content=DAGuvqXvQpU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## 🖥️ Landing Page (with Card Flip)
- Left: Signup card

- Right: Login card (flips on toggle)

- Button: “Already have an account?” → flips the card

## 🏠 Home Page (after login)
- Blog grid or list view

- Each blog shows image, title, short preview, likes, comments, and author

- Search bar (top): user, country, city

## ➕ Create/Edit Blog
- Form with:
    - Title
    - Image upload
    - Country & City
    - Travel Date
    - Duration
    - Background sound upload
    - Text area for story

## 💬 Blog Details Page
- Shows full blog with:
    - Background audio autoplay
    - Full description and media
    - Comments section
    - Like button
    - Edit/Delete options (if owner)

## 🔮 Future Enhancements
- Profile pages for each user
- Pagination or infinite scroll on the blog list
- Add tags/categories for filtering
- Email verification and password reset
- Dark mode support
- Save favorite blogs

