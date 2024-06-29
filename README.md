# BookSphere
BookSphere is a comprehensive web application that enables users to manage their personal book collections. Users can add, remove, update, and read books from their collections, as well as explore and read books shared by other users.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Team](#team)

## Features
- User Authentication: Secure user registration and login.
- Book Management: Add, remove, and update books in your personal collection.
- Explore Books: Browse and read books shared by other users.
- User Profiles: View and manage user profiles and book collections.

## Technologies Used
### Frontend:
- HTML5
- CSS3
- JavaScript
- React.js

### Backend:
- Node.js
- Express.js
- MongoDB

### Authentication:
- JWT (JSON WEB TOKEN)
- Bcrypt (PASSWORD HASHING)

## Installation
1. Clone the repository to your local machine : git clone https://github.com/hachimB/BookSphere.git
2. cd BookSphere
3. Install dependencies: npm install
4. Set up environment variables:
   - Create a .env file in the root directory and add the following variables:
        - PORT=5000
        - MONGO_URI=your_mongodb_connection_string
        - JWT_SECRET=your_jwt_secret_key
5. Start the application:
    - cd frontend
    - cd book-app
    - npm start

## Usage
1. Navigate to http://localhost:5000 in your browser.
2. Register to the application.
3. Login to the application.
4. Explore: Browse books shared by other users and read them online.

## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature/your-feature).
6. Open a pull request.

## Team
- Houcine Walaq
- Hamza Elimali
- Hachim Boubacar
