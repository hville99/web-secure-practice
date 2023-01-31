import { expect } from 'chai'
import { server } from '../../../lib/fastify'

describe('User routes', function () {
  describe('# POST Create new user at endpoint /web-api/users', function () {
    
    let user = {
      firstname: "fisrt",
      lastname: "last",
      email: "fisrt@last.fr",
      password: "123456",
      passwordConfirmation: "123456"
    }

    beforeEach(async function () {
      user = {
        firstname: "fisrt",
        lastname: "last",
        email: "fisrt@last.fr",
        password: "1ciur&obpouoi5BJHF5EUYO",
        passwordConfirmation: "1ciur&obpouoi5BJHF5EUYO"
      }
    })


    it('should register the user', async function () {
      const response = await server.inject({ 
        url: `/web-api/users`, method: 'POST', payload: user });
      
      // console.log(response.body);
      expect(response.statusCode).to.be.equal(200);
    })
  })
})

