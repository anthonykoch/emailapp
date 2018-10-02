
# Email App

An (in progress) mock email application built with Feathers JS backend and SSR React


## Uses

- [next.js v7](https://nextjs.org)
- [mobx](https://mobx.js.org)
- [react-emotion](https://emotion.sh/docs) (styled-components type of thing)
- [feathersjs](https://feathersjs.com)
- postgres
- docker
- [flowtype](https://flow.org) on the client and server
- ES6/7 on the client and server


## Credits to the homies

- http://www.albertgao.xyz/2018/02/04/how-to-do-server-side-rendering-with-feathersjs-and-nextjs/
- https://github.com/zeit/next.js/blob/master/examples/with-mobx
- https://dribbble.com/shots/3903437-Dashboard-message


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


## Module Aliases

The following aliases are available in both the browser and server.

```js
import '@root/types/index.js'                     // -> will import '/types/index.js'
import '@server/services/messages/messages.class' // -> will import '/server/services/messages/messages.class'
import '@app/components/Button'                   // -> will import '/client/components/Button'
```


## Defining routes

Routes are defined in `@app/routes.js`.


## Using services in getInitialProps

In order to use feathers services in a page's getInitialProps, import it in `app.js` and add it to the api object.

```js
// @server/services/messages/messages.class.js
export class Service {
  static route = '/api/messages'
}
```

```js
// @server/services/messages/messages.service.js
import createService, { Service } from './messages.class.js'

export default function () {
  // ...
  app.use(Service.route, new Service)

  const service = app.service(Service.route)
  // ...
}
```

```js
// @server/app.js
import { Service as MessagesService } from './messages'
import type { Services } from '@root/types'

const app = express(feathers())

// ...

const __NEXT__ { services: Services } = {
  messages: app.service(MessagesService.route)
}

app.__NEXT__ = __NEXT__
```

```js
// @app/pages/dashboard-messages
class DashboardMessages extends React.Component<Props> {
  static async getInitialProps({ services }: NextInitialArgs) {
    let messages = null

    if (SERVER) {
      messages = services.messages.get(1);
    }

    return {
      messages,
    }
  }
}
```

## Server only code in getInitialProps

Code that should be stripped out when sent to the client can be put under an `If` statement with `SERVER` as the test condition. `SERVER` is a boolean defined in `next.config.js`

```
import clientapi from '@app/core/api'

class HomePage extends React.Component<Props> {
  static async getInitialProps({ api }: NextInitialArgs) {
    let messages = null

    if (SERVER) {
      messages = await api.messages.get(1)
    } else {
      messages = await clientapi.messages.get(1)
    }

    return {
      messages,
    }
  }
}
```

Make sure to update the types in `/types/index.js` when adding/removing services!


## Notes

- This project requires a unix platform or [git bash](https://git-scm.com/downloads) for windows to run commands


## Todo

- https://www.npmjs.com/package/eslint-plugin-import
- Figure out 404 and 500 pages on the feathersjs side
- Add https://stylelint.io/
- Read https://github.com/zeit/next.js/tree/canary/examples/ssr-caching
- https://github.com/facebook/flow/issues/345
- https://github.com/zeit/next.js/issues/184
- Add keys to meta items in HEAD
- https://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode
- https://medium.freecodecamp.org/secure-your-web-application-with-these-http-headers-fd66e0367628
- https://til.hashrocket.com/posts/e65bb49204-lower-is-faster-than-ilike

