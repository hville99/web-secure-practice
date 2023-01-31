import { FASTIFY_LOGGING } from './dotenv';
import fastify, { RouteOptions } from 'fastify';
import { userRoutes } from '../routes/userRoutes';

export const server = fastify({
  logger: FASTIFY_LOGGING,
  ajv: {
    customOptions: {
      removeAdditional: false
    }
  } 
})
  .addHook('onRoute', assertsResponseSchemaPresenceHook)
  .register(userRoutes)

export function assertsResponseSchemaPresenceHook (routeOptions: RouteOptions) {
  //console.log(routeOptions)
  if (!routeOptions.schema) {
    throw new Error(`No schema found for url ${routeOptions.url}`);
  }
}

/*
.setErrorHandler((error, request, reply) => {
  // based on https://github.com/fastify/fastify/blob/1e94070992d911a81a26597c25f2d35ae65f3d91/fastify.js#L74
  if (error instanceof UnauthorizedError) {
    void reply.status(403).send(error)
  } else if (error instanceof EntityNotFoundError) {
    reply.log.info({ res: reply, err: error }, error?.message)
    void reply.status(404).send(new Error('Requested entity not found'))
  } else if (reply.statusCode < 500) {
    reply.log.info({ res: reply, err: error }, error?.message)
    void reply.send(error)
  } else {
    reply.log.error({ req: request, res: reply, err: error }, error?.message)
    void reply.send(new Error('Internal Server Error, message dropped'))
  }



/*
server.get<{
    Querystring: IQuerystring,
    Headers: IHeaders
  }>('/auth', async (req, res) => {
    const { username, password } = req.query
    const customerHeader = res.headers['h-Custom']
    // do something with request data
  
    return `logged in!`
})


//generic interfaces are also available inside route level hook methods
/*
server.get<{
    Querystring: IQuerystring,
    Headers: IHeaders
  }>('/auth', {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query
      done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
    }
  }, async (request, reply) => {
    const customerHeader = request.headers['h-Custom']
    // do something with request data
    return `logged in!`
})
*/

