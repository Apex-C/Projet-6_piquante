# Projet-6_piquante

<!-- ABOUT THE PROJECT -->

## 🧐 About The Project

[![Piquante]

L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”. Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

#### CONTRAINTES

Utiliser les bonnes pratiques de l'OWASP pour sécuriser l'API
Les données utilisateur doivent être protégées côté API et base de donnée grâce à des méthodes de masquage.
Projet hébergé par un serveur Node.js.
Base de données sous MongoDB et utilisation du framework Express.
Utiliser un plugin Mongoose pour signaler toute erreur de la base de données.

#### Sécurité:

- L’API doit respecter le RGPD et les standards OWASP.
- Le mot de passe des utilisateurs doit être chiffré.
- 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données.
- La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine.
- L’authentification est renforcée sur les routes requises.
- Les mots de passe sont stockés de manière sécurisée.
- Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.
- Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation).
- Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

### 🎯 Objectives

- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

### ⛏️ Built With

-Backend

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/fr/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

-Frontend

- Made by OpenClassrooms

https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

### Spécifications de l'API

### Data ModelsSauce

- userId : String —
  sauce
- name : String —
- manufacturer : String —
- description : String —
- mainPepper : String —
- imageUrl : String —
- heat : Number —
- likes : Number —
- dislikes : Number —
  sauce
- usersLiked : [ "String <userId>" ] —
  qui ont aimé (= liked) la sauce
- usersDisliked : [ "String <userId>" ] —

### Data ModelUsers

- email : String —
- password : String —
