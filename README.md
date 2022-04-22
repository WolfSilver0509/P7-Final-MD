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
mysql -u votreNomDADMINmysql -p
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


<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> <a href="https://vuejs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" alt="vuejs" width="40" height="40"/> </a> </p>

