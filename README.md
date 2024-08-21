# Backend - Explication du développement

## Choix et décisions

### Structure du projet
En tant qu'étudiant, j'ai choisi d'organiser le backend de l'application de manière modulaire, en séparant les différentes entités (tâches, utilisateurs, etc.) dans des modules distincts. Cela permet de maintenir un code plus lisible et évolutif à long terme.

### Utilisation de NestJS
Pour le développement du backend, j'ai décidé d'utiliser le framework NestJS. Celui-ci offre une architecture basée sur les modules, les services et les contrôleurs, qui correspond bien aux bonnes pratiques de développement backend. De plus, NestJS intègre nativement la gestion des dépendances via l'injection de dépendances, ce qui facilite la testabilité et la maintenabilité du code.

### Intégration de Prisma
J'ai choisi d'utiliser Prisma comme ORM (Object-Relational Mapping) pour interagir avec la base de données. Prisma permet de générer automatiquement le client de la base de données à partir du schéma, ce qui réduit considérablement le code boilerplate nécessaire pour les opérations CRUD.

## Première étape : Préparation de l'environnement de développement

1. **Forker et cloner les dépôts** :
   - J'ai commencé par forker et cloner les deux dépôts de mon projet. Cela m'a permis d'avoir une copie locale des sources sur laquelle travailler.

2. **Préparer la base de données** :
   - Comme l'image Docker MySQL fournie ne fonctionnait pas avec mon architecture ARM64, j'ai décidé d'installer la base de données MySQL directement sur ma machine.
   - Je me suis connecté à MySQL en utilisant la commande `mysql -u root -p` et le mot de passe présent dans le fichier `.env`.

3. **Créer la base de données** :
   - Après m'être connecté à MySQL, j'ai créé la base de données `hdmtestdev` avec la commande SQL `CREATE DATABASE hdmtestdev;`.

4. **Exécuter les migrations Prisma** :
   - Après avoir préparé la base de données, j'ai exécuté les commandes Prisma présentes dans le fichier `package.json` pour générer le client Prisma et appliquer les migrations.
   - `yarn prisma:generate` : Cette commande a généré le client Prisma à partir de mon schéma de base de données.
   - `yarn prisma:migrate:run` : Cette commande a appliqué les migrations Prisma sur ma base de données.

## Deuxième étape : Démarrage du serveur backend

1. **Lancer le serveur en mode développement** :
   - Une fois que l'environnement de développement était prêt, j'ai lancé le serveur backend en mode développement avec la commande `yarn start:dev`.

2. **Exécuter la commande `yarn start`** :
   - Cependant, lorsque j'ai exécuté la commande `yarn start`, une erreur est apparue indiquant que la commande "start" n'était pas trouvée.

3. **Ajouter la commande `start` dans le `package.json`** :
   - Après avoir vérifié le fichier `package.json`, j'ai remarqué que la commande `start` n'y était pas définie.
   - J'ai donc ajouté la ligne `"start": "vite"` dans la section `scripts` du `package.json`.

4. **Lancer l'application** :
   - Après avoir ajouté la commande `start`, j'ai pu lancer l'application avec succès en utilisant la commande `yarn start`.
   - Cela m'a permis d'accéder à l'application en local à l'adresse `http://localhost:5173/`.

## Contrôleurs (Controllers)

Les contrôleurs dans mon backend NestJS sont chargés de gérer les points d'entrée de l'API. Ils reçoivent donc les requêtes entrantes, interagissent avec les services et renvoient les réponses. Cette séparation des responsabilités entre les contrôleurs et les services permet de maintenir une architecture modulaire et testable.

Par exemple, j'ai un contrôleur `TaskController` qui exposerait des endpoints comme `/tasks`, `/tasks/:id`, `/tasks/create`, `/tasks/:id/`. Ce contrôleur interagirait avec un service `TaskController` pour effectuer les opérations CRUD sur les tâches.

## Classes Factory (ServiceFactory)

Mon projet utilise une classe abstraite `ServiceFactory` qui joue le rôle de fabrique d'instances pour mes cas d'utilisation (UseCase). Cette classe encapsule la logique d'instanciation et d'injection de dépendances, ce qui permet de découpler la création des instances des cas d'utilisation du reste de mon application.

La méthode `create<T extends U>(type: Type<T>): Promise<T>` de cette classe factory me permet de créer facilement des instances de mes cas d'utilisation, en m'abstrayant des détails d'implémentation.

## Cas d'utilisation (UseCases)

Les cas d'utilisation sont des classes qui encapsulent la logique métier de mon application. Ils sont découplés des contrôleurs et des services, ce qui facilite leur réutilisation et leur testabilité.

Par exemple, j'ai un cas d'utilisation `CreateTaskUseCase` qui est chargé de la création d'une nouvelle tâche. Ce cas d'utilisation interagit avec un référentiel (repository) de tâches pour effectuer l'opération de création.

En utilisant cette architecture basée sur les cas d'utilisation, je favorise la maintenabilité, la testabilité et la réutilisabilité de mon code backend.

## Points de blocage rencontrés

### Préparation de l'environnement de développement
Lors de la configuration de l'environnement de développement, j'ai rencontré quelques difficultés, notamment avec l'utilisation de l'image Docker MySQL qui ne fonctionnait pas avec mon architecture ARM64. J'ai donc dû installer MySQL directement sur ma machine et configurer les variables d'environnement en conséquence.

### Intégration de Prisma
L'intégration de Prisma dans le projet a également nécessité quelques ajustements. J'ai dû bien comprendre les commandes Prisma (`prisma:generate`, `prisma:migrate:run`) et les intégrer dans les scripts n pour faciliter l'exécution des migrations lors du développement.

### Problèmes de typage TypeScript
Au début du développement, j'ai également rencontré quelques problèmes liés au typage en TypeScript. Par exemple, lorsque j'ai essayé de déclarer un paramètre de type "string et number", le compilateur a signalé une erreur, car en TypeScript, les variables et les paramètres doivent avoir un type unique et spécifique