Creation backend et frontend en base de donnee mysql pour le projet Groupomania

Ceci est le dernier projet de ma formation où j'ai développé entièrement l'application d'A à Z du Back au Front.

Ce site à été réalisé en Node Js Express avec une api rest et les règles de sécurité Owasp en Back-end.

Pour ce qui du Front-END les techniques utilisés sont: HTML Css et Vue.js.

Le projet Groupomania est un réseau social d'entreprise qui permet de partager des publications textes et images.

Un administrateur peut également modérer le site (supprimer commentaires et publications) et l'utilisateur peut modifier ou supprimer son profil.

Pour utiliser l'application : 

Cloner le REPO 

Dans le dossier Backend, intaller node.JS 

Puis creez un fichier .env avec les données suivantes : 

SECRET_KEY=NTCV36EE5AFC5FX352

CRYPT_KEY = 16Vx2P32TlX33C557cP2MO8HmMWFVufr;

DB_DEV=database_development_groupo
DB_USER=root
DB_PASS=Groupo1306-
DB_HOST=127.0.0.1

DB_URL=mysql://root:Groupo1306-@127.0.0.1:3306/database_development_groupo

ADMIN=groupoadmin@test.fr

Enfin, il ne vous plus qu'a lancer nodemon server

Dans le dossier Frontend, installer Vue.js puis lancer npm run serve

Le reseau social sera accessible à l'adresse : http://localhost:8080/

Pour tester plus en détail le backend (avec postman par exemple), ce dernier devrait répondre à l'adresse : http://localhost:3000/

N'oubliez pas d'avoir un serveur MYSQL de lancé en utilisant par exemple, MAMP ! 

