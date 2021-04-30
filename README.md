# graphql-rest-composite-sample

## Overview

This sample shows how the REST WebAPI and the GraphQL WebAPI can be combined to provide a single GraphQL WebAPI (compliant with the Apollo Federation).

## Usage

```shell
yarn
yarn start  
```
## Architecture

```
+------------------+     +---------------------------+
|  gateway         |     |  tasks                    |
| (Apollo Gateway) |--+--| (GraphQL Server: Nest.js) |
+------------------+  |  +---------------------------+
                      |
                      |  +-----------------+     +------------------------+
                      +--|  aggregator     |     |  accounts              |
                         | (Apollo Server) |-----| (REST Server: Fastify) |
                         +-----------------+     +------------------------+
```

## License

MIT