import fastify, { FastifyInstance, RouteOptions } from "fastify";
import { expect } from "chai";
import { assertsResponseSchemaPresenceHook, server as server_test } from "../../lib/fastify";


describe('onRoute Hook', function() {
    describe('# assertResponsePresenceSchemaHook', function () {
        it('should raise an error if schema route option is missing', async function () {
            
            // Assert
            const path = '/hello';

            // Act
            const server_hook = fastify()
                .addHook('onRoute', assertsResponseSchemaPresenceHook)
                .register(async (fastify: FastifyInstance) => {
                    fastify.post(path, () => true)
                })
            
            
            // TEST
            await expect(server_hook).to.eventually.be.rejected.and.deep.include({
                message: 'No schema found for url /hello'
            })
        })
    })
    describe('global server settings', function () {
        it('should validate the remove additionnal option set to false', async function () {
            // await server_test;

            // expect(server_test.ajv.)
        })
    })
})