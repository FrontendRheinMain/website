# FERM Website
The public website of FrontendRheinMain — Feel free to join, collaborate &amp; improve

### Prerequisites

#### node.js
There are plenty ways to install node.js. Checkout [Node.js] for a suitable installation guide for your operating
system.

#### AngularCli
```shell
npm install -g @angular/cli
```
For more information checkout [AngularCLI]


#### Database
The FERM backend makes use of [mongo]. which must be configured on port **27017** wihch is also the default port of 
mongo.

There are two tested ways how it can be installed:

- via Docker (preferred) run the `build-and-run.sh` script once the project dependencies were finally resolved...
  There will be a hint to do this later in this document 😉)
- Independently (See further instructions at [mongo installation] chapter)


### Setup the development environment 
> currently tested on OSX only

#### Resolve dependencies

Before development can start it's mandatory to resolve all npm dependencies. This means resolving deps for:

- Project itself
- Client - Angular 6.x application
- Server - Express.js application written in [TypeScript]

To keep this as simple as possible those sub dependencies are resolved as a post install step.
So just type following command and you should be good to go.

```shell
npm install
```

> Notice: Once npm install has been finished, check if mongo db is running before continue (see database chapter above).

#### Start development environment

The development environment is served with both, watchers for **frontend** and **backend**. Once code has changed the
change gets detected by the watchers and the according application part is restarted immediately to provide the latest 
functionality on the fly. Start the development environment by following command:

```shell
npm run develop
```
## Project structure

> A simplified project structure overview

### Frontend development
Go to `app/client` and then create new components, service etc. via [AngularCli].


```shell
.
├── app
│   ├── client
│   │   ├── src                 // Here is the front development root
│   │   │   ├── app
│   │   │   │   ├── components
│   │   │   │   ├── modules
│   │   │   │   └── shared
│   │   │   ├── assets
│   │   │   ├── environments
│   │   │   │   ├── environment.prod.ts
│   │   │   │   └── environment.ts
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   ├── styles.scss
│   │   │   ├── theme
│   │   │   │   ├── _bootstrap.vars.scss
│   │   │   │   ├── _font.vars.scss
│   │   │   │   └── _theme.scss
``` 

### Backend development
Go to `app/server` and check existing items as controllers, models, repositories, persistences because there is no 
detailed documentation yet 😬.

```shell
.
├── app
│   ├── data
│   └── server                  
│       ├── src                 // Here is the backend development root
│       │   ├── app.ts
│       │   ├── classes
│       │   │   ├── base
│       │   │   └── instance-loader.ts
│       │   ├── config
│       │   │   ├── config.development.json
│       │   │   ├── config.production.json
│       │   │   └── config.testing.json
│       │   ├── controllers
│       │   ├── index.ts
│       │   ├── interfaces
│       │   │   ├── model.interface.ts
│       │   │   ├── persistence.interface.ts
│       │   │   └── repository.interface.ts
│       │   ├── models
│       │   ├── persistences
│       │   │   ├── persistence.all.spec.ts
│       │   │   ├── persistence.fs.ts
│       │   │   ├── persistence.memory.ts
│       │   │   └── persistence.mongodb.ts
│       │   └── repositories
``` 

## Production Run (via docker)
Make sure the project folder is writable for the docker daemon.
Then execute following script to start the production environment.

```shell
./reset-build-and-run.sh
```
This script will start two docker containers [mongo] with external storage connection for persisted data 
and the application server.

The application is then available at **http://localhost:4001/**

> Note you can run this shell-script locally as well to have a running mongo instance at place.
It's then available via localhost:27017

## Troubleshooting
If there are issues try to clean the project by call

```shell
npm run clean:install
```
this will remove all dependencies and perform a fresh install. If problems still persist don't hesitate to submit an 
issue in our [issue tracker].

#### Authors

- [Bernhard Behrendt](mailto:bernhard.bezdek@gmail.com) [@FrontendRheinMain](https://github.com/FrontendRheinMain)
- [Jan Deppisch](mailto:mail@netzartist.de) [@FrontendRheinMain](https://github.com/FrontendRheinMain),

#### Contributors

### License
License: [MIT]



[Node.js]: https://nodejs.org/en/ "Node.js"
[AngularCLI]: https://cli.angular.io/ "Angular CLI"
[mongo]: https://www.mongodb.com/ "mongo"
[mongo installation]: https://docs.mongodb.com/manual/installation/ "mongo installation"
[TypeScript]: https://www.typescriptlang.org/ "TypeScript"
[issue tracker]: https://github.com/FrontendRheinMain/website/issues/new "GitHub issue tracker"
[MIT]: https://mit-license.org/#2018 "MIT License"

[End]: //.
