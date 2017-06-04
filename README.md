# Car Wash Demo

This project was built with [Angular 4](http://angularjs.blogspot.com/2017/03/angular-400-now-available.html) using [Angular CLI](https://github.com/angular/angular-cli) version 1.0.6.

## Live App

A **live version** of the app has been published to GitHub Pages.

- Car Wash Demo: <https://tonysneed.github.io/carwash-demo/>

## Using the App

- Enter user **first name** (optional) and **vehicle license**.
- Select the **vehicle type** (car or truck).
- For trucks indicate if the bed **has mud** or is **let down**.
- You may include a **wax option** (used for for wash cycles when implemented).
- Click **'Get Price'** and the price will be displayed.
- If you wish, select various *options* to see how it affects the price.
- When satisfied with the options, click **'Start Wash'** to save the transaction (in-memory).
- Clicking 'Get Price' with a previously used license plate will **discount** the price.
- To clear previously saved transactions simply **refresh** the page.

## Running Locally

- Clone the repository and run `npm install`.
- Run `ng serve -o` to launch the app using a dev server. The app will load in your default browser at `http://localhost:4200/`, and it will automatically reload if you change any of the source files.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
- Run `ng test` to execute the unit tests.
- Run `ng e2e` to execute the end-to-end tests.

## Git Branches

Numbered branches indicate phases of development:

- **01-add-models**: Models and specs for transactions and wash cycles
- **02-add-styles**: [Material Design](https://material.angular.io/) styles
- **03-add-routes**: Routing added with a dashboard component
- **04-add-transactions**: Dashboard functionality for creating and saving transactions

## Application Internals

- Business rules are implemented using the [Chain of Responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern) design pattern.
  + Unit tests demonstrate usage of the pattern.

- Wash cycles are implemented using the [State](https://en.wikipedia.org/wiki/State_pattern) design pattern.
  + Unit tests demonstrate usage of the pattern.
  + *Note that the UI for this feature is not implemented in the current version of the app.*

- Transaction history is currently maintained **in-memory**.
  + This could be refactored using a *Web API* and/or *local storage*.

