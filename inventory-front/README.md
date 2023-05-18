# This app is a tech assessment with the following instructions:

## Intro

This assignment will be used as a discussion during a technical interview.
Time constraints are part of software development and even though we don't expect a perfect solution, imagine your code to be on its way to production.
If you have to make compromises, provide a README to briefly explain pros and cons of your approach, what considerations you would make for another iteration and in general what your
future colleagues might be interested in if they had to pick up your code.

The primary values for the code we look for are: simplicity, readability, maintainability, testability. It should be easy to scan the code, and rather quickly understand what it’s doing.
Pay attention to naming.

You may choose any coding language, and we look forward to discussing your choice.

## The Task

The assignment is to implement a warehouse software. This software should hold articles, and the articles should contain an identification number, a name and available stock.
It should be possible to load articles into the software from a file, see the attached inventory.json.
The warehouse software should also have products, products are made of different articles. Products should have a name, price and a list of articles of which they are made from with a quantity.
The products should also be loaded from a file, see the attached products.json.

The warehouse should have at least the following functionality;

- Get all products and quantity of each that is an available with the current inventory
- Remove(Sell) a product and update the inventory accordingly

## The Inventory app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
