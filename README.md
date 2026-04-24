
# 📌 React Todo Dashboard App

This is a small React-based web application built as part of a frontend assessment. It includes authentication, todo management, and user-specific features using APIs.

## 🚀 Features

* 🔐 **User Authentication**

  * Login using API
  * Session stored in localStorage
  * Auto-redirect if already logged in

* 📋 **Todo Dashboard**

  * Fetch and display paginated todos
  * Loading, error, and empty states handled

* 👤 **User-based Filtering**

  * View all todos or only logged-in user’s todos

* ➕ **Add Todo**

  * Add new tasks via API
  * Form validation included

* 🔁 **Visit Counter**

  * Tracks dashboard visits using localStorage

## 🛠 Tech Stack

* React.js (Hooks & Functional Components)
* JavaScript
* Tailwind CSS (optional styling)
* DummyJSON API

## 📦 APIs Used

* Login: `https://dummyjson.com/user/login`
* Get Todos: `https://dummyjson.com/todos`
* User Todos: `https://dummyjson.com/users/{userId}/todos`
* Add Todo: `https://dummyjson.com/todos/add`

## ▶️ How to Run

```bash
npm install
npm run dev
