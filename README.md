# technical_test
repository for a technical test

DB -> DB.png est le schéma de la base de données demandée.

integration -> partie intégration du test réalisé avec html css
               lancement du projet via la commande ```cd integration;serve .```

code -> partie code du test réalisé avec React pour le front et Express pour le back
        Le client écoute le port 3000 et le serveur le port 8080
        La génération du tableau des scores d'un match de tennis se fait sur l'url "http://localhost:8080/scoreboard" avec la méthode POST
        Le body de la requête doit être en json et de la forme suivante 
        ```{
          "points": ["joueur2", "joueur1", "joueur1", ...],
          "players": ["joueur1", "joueur2"]
        }```
        La réponse est en Json et de la forme suivante
        ```{
          "Manu": {
            "Set 1": 6,
            "Set 2": 6,
            "Set 3": 7,
            "winner": true
          },
          "Ervé": {
            "Set 1": 2,
            "Set 2": 1,
            "Set 3": 6,
            "winner": false
          }
        }```
        le champ "winner" peut être remplacé par "currentGame" avec le score du joueur en question si le match n'est pas terminé.
        Pour la partie client, le formulaire de génération de faux match de tennis nécessite que les 2 champs de noms soit remplis et soit différent
        lancement du client ```cd code/client``` -> ```npm i``` -> ```npm start```
        lancement du serveur ```cd code/server``` -> ```npm i``` -> ```npm start```
