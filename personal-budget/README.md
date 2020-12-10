# PersonalBudget

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Unit Test 

1. Unit Test on add-dialog.component to check confirmAdd() method is invoked on button click -> src/dialogs/add/add-dialog.component.spec.ts
2. Unit Test on delete-dialog.component to check confirmDelete() method is invoked on button click -> src/dialogs/delete/delete-dialog.component.spec.ts
3. Unit Test on edit-dialog.component to check stopEdit() method is invoked on button click -> -> src/dialogs/edit/edit-dialog.component.spec.ts

## e2e Testing

e2e testing for home page ('/') -> e2e/src/app.po.ts and e2e/src/app.e2e-spec.ts
