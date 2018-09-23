
# Email App

An (in progress) mock email application built with Feathers JS backend and SSR React

Design credit goes to -> https://dribbble.com/shots/3903437-Dashboard-message


## Uses

- next.js v7
- mobx
- react-emotion (styled-components type of thing)
- feathersjs
- postgres
- docker
- flowtype on the client and server
- ES6/7 on the client and server

## Credits to the homies

- http://www.albertgao.xyz/2018/02/04/how-to-do-server-side-rendering-with-feathersjs-and-nextjs/
- https://github.com/zeit/next.js/blob/master/examples/with-mobx


## Setup

First, install docker and docker compose on your machine and then run the following commands.

```
npm run docker:build
npm run docker:up
```

Once `docker:build` is run, only docker:up needs to be run from now on.

### Migrations and seeding

```bash
# Log into the web image
docker exec -it emailapp_web sh -l

npm run db:setup
```

Do note that you can also log into psql by running logging into the postgres container with `docker exec -it emailapp_web sh -l` and running `psql -U postgres`.


## Todo

- Figure out 404 and 500 pages on the feathersjs side
- Add https://stylelint.io/
- Read https://github.com/zeit/next.js/tree/canary/examples/ssr-caching

