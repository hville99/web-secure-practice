import fastify, { FastifyInstance, RouteOptions } from "fastify";
import { expect } from "chai";
import { assertsResponseSchemaPresenceHook } from "../../lib/fastify";


describe('onRoute Hook', function() {
    describe('# assertResponsePresenceSchemaHook', function () {
        it('should raise an error if schema route option is missing', async function () {
            
            // Assert
            const path = '/hello';

            // Act
            const server = fastify()
                .addHook('onRoute', assertsResponseSchemaPresenceHook)
                .register(async (fastify: FastifyInstance) => {
                    fastify.post(path, () => true)
                })
            
            
            // TEST
            await expect(server).to.eventually.be.rejected.and.deep.include({
                message: 'No schema found for url /hello'
            })
        })
    })
})