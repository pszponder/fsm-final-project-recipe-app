# What's Cooking Recipe App

The purpose of this application is to provide the user with cooking recipes based on what available ingredients they have.

This is a final project using the MERN stack for the Full Stack Mastery Coding Bootcamp.

## Usage

Rename the `.envexample` file to `.env`.

In order to correctly connect to MongoDB database, update the MONGO_URI variable in the `.env` file.

Navigate to the root directory and execute the following commands below for installing dependencies and running the server.

### Install Dependencies:

```
# Backend dependencies:
npm install

# Frontend dependencies:
cd frontend
npm install
```

### Running the Server

```
npm run server
```

### Seeding the DB

If you need to seed the DB with dummy data, run the seedDB.js file in node

Assuming you are in the root directory, use this command to seed the DB:

```
node backend/seed/seedDB.js
```

## References / Resources Used:

- [Traversy Media: Learn the MERN Stack](https://youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm)
- [Node.js Full Course for Beginners | Complete All-in-One Tutorial](https://youtu.be/f2EqECiTBL8)
- [What are Refresh Tokens and How to Use Them Securely](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
- [JWT Authentication with Access Tokens & Refresh Tokens - Node.js](https://youtu.be/XYjOteYbCMo)
