# Code Assignment

## Prerequisites

In order to launch this app in a local environment you will need:

- [Node](https://nodejs.org/) with NPM
- [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4

## Starting the backend

Go to `inventory-back` and execute the following commands in the directory:

- `npm install`
- `npm run dev`

## Starting the frontend

Go to `inventory-front` and execute the following command in the directory:

- `npm install`
- `ng serve -o`

## Reseting articles data

The app is writting real data in the backend. If you wish to reset the original data, just make a call to this url (copy and paste it in your browser):

- http://localhost:4000/api/articles/reset

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## About the development

The application consists in two parts: frontend and backend. With this principles always in mind: **simplicity, readability, maintainability and testability**.

### Backend

The backend has been created with `node + express`. A json is used to update the articles with the `fs` module.

- **simplicity**: Simple solution using microservices and endpoints to let the frontend consume what it needs.
- **readability**: All the names are self descriptive and the code is divided accordingly.
- **maintainability**: The app is SOLID letting the developers grow and improve it in a simple way.
- **testability**: A reset endpoint has been provided to let the developers make quick test with the data.

### Frontend

The backend has been created with `Angular 15` and SCSS with any other external library.

- **simplicity**: The application has been designed in such a way that it is easy to understand.
- **readability**: All the names are self descriptive and the code is divided accordingly.
- **maintainability**: The app is SOLID letting the developers grow and improve it in a simple way.
- **testability**: A test suit with Karma has been included to let the developers create unit-testing for each of the components.

## Future iterations

Some `TODOs` comments has been included in different parts of the application to let the developers grow the application without much complexity. As a first iteration, it would be good to agree on a data model for both articles and products that is easier to consume on the front end (quantities as numbers, for example).
