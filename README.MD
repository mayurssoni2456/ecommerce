# Node.js Ecommerce like Backend implementation in Typescript
The main goal is to create an ecommerce platform which support features like registration, login, products, search, product ratings and reviews, average rating, etc.

# Key highlights
1. Node.js
2. Express.js
3. Mongodb
4. Typescript
5. Mongoose
6. JWT
7. Joi
8. Redis (Future)
9. Unit Tests (future)

<br>

# Project features

<br>

Following are the features of this project:
* **This backend is written in Typescript**: The type safety at build time.
* **Separation of concern principle**: Each component has been given a particular role. This makes the project easy to be unit tested.
* **Centralised Error handling**: We have created a framework where all the errors are handled centrally. This reduces the ambiguity in the development when the project grows larger.
* **Centralised Response handling**: Similar to Error handling we have a response handling framework. This makes it very convenient to apply a common API response pattern.
* **Mongodb is used through Mongoose**: Mongodb fits very well to the node.js application. Being NoSQL, fast, and scalable makes it ideal for modern web applications.
* **Async execution**: We have used async/await for the promises and made sure to use the non-blocking version of all the functions with few exceptions.
* **Unit test**: (Future).

<br>

## API documentation 
* future

## How to build and run this project
* project is still in development

 ## Project Directory Structure
 ```
├── .vscode
│   ├── settings.json
│   └── launch.json   
├── src
│   ├── server.ts
│   ├── app.ts
│   ├── config.ts
│   ├── auth
│   │   ├── apikey.ts
│   │   ├── authentication.ts
│   │   ├── authorization.ts
│   │   └── schema.ts
│   ├── common
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── Jwt.ts
│   │   └── utils.ts
│   ├── database
│   │   ├── index.ts
│   │   ├── model
│   │   │   ├── Product.ts
│   │   │   └── User.ts
│   │   └── repository
│   │       ├── ProductRepo.ts
│   │       └── UserRepo.ts
│   ├── helpers
│   │   ├── validator.ts
│   ├── routes
│   │   ├── index.ts
    │    ├── userRoutes.ts
    │    ├── productRoutes.ts
├── tests
├── .env
├── .gitignore
├── .eslintrc
├── .eslintignore
├── .prettierrc
├── .prettierignore
├── package-lock.json
├── package.json
├── jest.config.js
└── tsconfig.json
 ``` 
 
