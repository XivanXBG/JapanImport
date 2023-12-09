# Japan Import - Car Sales Website

## Overview

Welcome to Japan Import, your ultimate destination for purchasing high-quality cars imported from Japan. This React project utilizes Vite for a blazing fast development experience and Firebase for seamless authentication, data storage, and hosting. Whether you're looking to browse cars, place an order, leave a review, or manage your profile, this website has you covered.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Authentication](#authentication)
- [Lazy Loading](#lazy-loading)
- [State Management](#state-management)
- [Error Handling](#error-handling)
- [Contexts](#contexts)
- [Services](#services)
- [Technologies Used](#technologies-used)

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project folder: `cd <project-folder>`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

Visit [https://j-import.web.app/](https://j-import.web.app/) to access the live version of the website.

## Features

- Browse and view all available cars
- Search for cars using a simple or advanced form
- Favorite cars and manage your favorite offers
- Leave reviews for cars
- Place orders and track order details
- User authentication with login and registration
- Profile management, including created offers and order history
- Edit and update existing offers

## Authentication

All routes requiring authentication are guarded. Users must log in to access features such as creating offers, managing favorites, and viewing order details. Email and password are used for authentication. Additionally, users can authenticate via Google, Yahoo, or GitHub.

## Lazy Loading

To enhance performance, certain components such as wishlist, cars, favorites, orders, and order details are lazy-loaded, ensuring a smooth user experience.

## State Management

Redux is employed to store and manage the state across various components, simplifying data retrieval and updates.

## Error Handling

Toastify is integrated for effective error validation and handling. Users receive visual feedback in the form of toasts when errors occur.

## Contexts

Two contexts are utilized: `auth` for managing user authentication and `cart` for handling the shopping cart.

## Services

- `auth.js`: Authentication service
- `offers.js`: Service for managing car offers
- `orders.js`: Service for handling orders
- `reviews.js`: Service for managing reviews
- `search.js`: Search service for cars

## Technologies Used

- **Vite:** Chosen for its high-speed development experience and efficient bundling.
- **Firebase:** Utilized for authentication, data storage, and hosting.
- **Redux:** Employed for state management across components.
- **Toastify:** Integrated for effective error validation and handling.

Feel free to contribute, report issues, or suggest features. Happy exploring!

