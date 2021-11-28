# Budgetiz

Ceci est une application personnel de budgetisation et est la propriété d'Alexandre CHAIGNE.

© Copyright 2021

Le projet est fait avec [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.

# Lancement de l'application

Run `npm run start:e` pour lancer l'application desktop

Run `ng serve -o` pour lancer avec rafraichissement en temps réel

# Dépendances
    "@angular/animations": "~12.2.0",
    "@angular/cdk": "^12.2.12",
    "@angular/common": "~12.2.0",
    "@angular/compiler": "~12.2.0",
    "@angular/core": "~12.2.0",
    "@angular/fire": "^6.0.4",
    "@angular/forms": "~12.2.0",
    "@angular/material": "^12.2.12",
    "@angular/platform-browser": "~12.2.0",
    "@angular/platform-browser-dynamic": "~12.2.0",
    "@angular/router": "~12.2.0",
    "firebase": "^8.0.1",
    "firebaseui": "^4.7.1",
    "firebaseui-angular": "^5.1.0",
    "rxjs": "~6.6.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.11.4"

# Roadmap

## V1.0.0

Feature - Mettre en place la page Category

Feature - Mettre en place la page Undercategory
    
Feature - Mettre en place la page BankAccount
    
Feature - Mettre en place la page Datas

Feature - Mettre en place la page du tableau

Feature - Deployer

Fix - Vérification de la Documentation

Fix - Vérification des imports, suppresion des inutilisés

Fix - Mettre la gestion des Erreurs dans un service Utils


## V2.0.0

Feature - Mettre en place la page Principale (Home) (à spécifier)

Feature - Mettre en place la page des Provisions (à spécifier).

Feature - Mettre en place la page de l'Epargne (à spécifier).

Feature - Mettre en place la page de Settings (à spécifier).

Feature - Mettre en place la page de Profil Utilisateur (à spécifier). (Même que Settings ?)

Fix - Header (refaire)




TODO Page Labels:
- Faire que dans labels le clic sur une ligne amène vers un résumé de toutes les transactions faite sur cette catégorie
- Refaire les tabs de Label, avec juste une recharge du tableau a l'ajout et non une redirection
- Faire en sorte que l'apparition du formulaire d'ajout mette a jour l'input de l'idBase
- Contrôle sur le deleteCategory() - LabelsCategoriesComponent
- Contrôle sur le deleteUndersection() - LabelsUndercategoriesComponent
- Contrôle sur le deleteBankAccount() - LabelsBankAccountComponent

TODO Page Transactions:

- Rajout des filtres sur les header
- Pagination sur le tableau
- Trier Transaction par ordre inverse de l'idBase (la plus récente en haut)
- DatePicker for Year https://material.angular.io/components/datepicker/overview#watching-the-views-for-changes-on-selected-years-and-months 
- Faire en sorte que l'apparition du formulaire d'ajout mette a jour l'input de l'idBase
- Ajout de la zone de description au clic sur une ligne