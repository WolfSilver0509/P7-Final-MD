# Groupomania
Projet 7 de la formation développeur Web d'OpenClassrooms. 
Création d'un réseau social interne 


:pushpin: ## Utilisation : 
Voici la liste des créations utilisées pour ce projet :
### Frontend

* Vue.js : Version 3.0.0

### Backend

* Mysql2 : Version 2.3.3
* Sequelize : Version 6.16.1
* Node.js : Version 17.6.0
* Express : Version 4.17.2
* Nodemon : Version 2.0.15
* Et bien d'autres !

Vous trouverez [la documentation de l'API](https://documenter.getpostman.com/view/17892890/UVsJy7bM)

:pushpin: ## Installation

:computer: ### Base de données
Vous devez avoir MySQL installé sur votre ordinateur ( si ce n'est pas le cas vous pouvez le télécharger [ici - MySql](https://www.mysql.com/fr/). 

Une fois cela fait ouvrez le terminal de commande :

:point_right: Connectez-vous à MySql 
```
mysql -u root -p
```
:point_right: Connectez-vous avec votre mot de passe: 
```
Enter password: VotreMotDePasse
```
:point_right: Créez la base de données : 
```
CREATE DATABASE NomDeVotreBase;
```
:computer: ### Application
Vous devez avoir Node.js installé sur votre ordinateur. si ce n'est pas le cas installez le [ici](https://nodejs.org/en/)<br/>

:point_right: Clonez ce dépôt GitHub. Rendez-vous dans le dossier **Back** et installez les modules nécessaires : 
```
npm install
```
:point_right: Démarrez l'API :
```
npm start
```
:point_right: Pour continuer, vous devez avoir Vue CLI installé :
```
npm install -g @vue/cli
```
:point_right: Depuis le dossier **Front**, installez les modules nécessaires :
```
npm install
```
:point_right: Puis démarrez l'application frontend :
```
npm run serve
```
Rendez-vous sur votre navigateur à l'adresse : http://localhost:8080

:computer: ### Création d'utilisateur
Créez autant d'utilisateur que vous le souhaitez en naviguant sur le réseau social Groupomania

:raising_hand: ### Pour définir un utilisateur en tant qu'administrateur

:point_right: Rendez-vous dans la base de données groupomania :
```
USE NomDeVotreBase;
```
:point_right: Modifier la donnée isAdmin en renseignant l'adresse email de votre inscription :
```
UPDATE user set isAdmin = 1  WHERE email =' l'adresse email voulu en tant que ADMIN';
```
:warning: ### N'oubliez pas de remplir un fichier .env dans le dossier **Back** avec vos données de MySql et de remplir le .env du dossier **Front**.

