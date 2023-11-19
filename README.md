# Planning App

## Description

Une application de gestion de planning interactive développée avec React, SCSS et Zustand, permettant de créer des events dans un calendrier, les supprimer et les visualiser.

## Fonctionnalités

- Calendrier interactif pour la sélection et la visualisation des dates
- Gestion d'événements avec un formulaire détaillé
- Choix de couleurs pour les tâches
- Affichage et gestion des tâches sur le calendrier

## Technologies

- React
- Zustand
- SCSS
- TypeScript
- Material UI
- Vite

## Composants

- Calendar: Affiche le calendrier et permet la sélection des dates
- ColorPicker: Permet de choisir des couleurs pour les tâches
- DatePicker: Sélecteur de dates pour les événements
- DayList: Liste des jours dans le calendrier
- Events: Gestion et affichage des événements
- Form: Formulaire pour ajouter ou modifier des événements
- HeaderDate: En-tête affichant la date sélectionnée
- Main: Composant principal de l'application
- TimePicker: Sélecteur d'heure pour les événements

## Hooks personnalisés

- useCalendar: Gère la logique du calendrier
- useCloseModal: Gère la fermeture des modaux
- useSelectDay: Gère la sélection des jours dans le calendrier
- useShowEvents: Gère l'affichage des événements
- useShowDay: Gère l'affichage des jours dans le calendrier
- useSubmitForm: Gère la soumission du formulaire

## Utilitaires

- hexToRGBA: Convertit les couleurs HEX en format RGBA
- toLocalISOString: Convertit les dates en chaîne de caractères locale

## Configuration

- ESLint pour le linting du code
- Vite pour la construction et le développement rapide

## Installation et démarrage

\`\`\`bash
npm install
npm run dev
\`\`\`
