// src/specs/entities/user.spec.ts
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { User } from '../../entities/user'
import { AppDataSource } from '../../lib/typeorm'

chai.use(chaiAsPromised)

describe('User', function () {
  before(async function () {
    // TODO: initialise the datasource (database connection)
    AppDataSource.initialize()
    AppDataSource.query("DROP TABLE USERS IF EXISTS")
    AppDataSource.query("CREATE TABLE USERS")
  })
    
  beforeEach(async function () {
    // TODO: drop the content of the user table between each it().
    AppDataSource.query("DELETE * FROM USERS")
  })

  describe('validations', function () {
    it('should create a new User in database')
    // const user_test = new User(1, "bob", "dylan", "bob@dylan.com", "password")
    try {
        console.log("ok test")
    } catch (err) {
        console.log(err)
    }

    it('should raise error if email is missing', async function () {
      // hint to check if a promise fails with chai + chai-as-promise:
      // await chai.expect(promise).to.eventually.be.rejectedWith(QueryFailedError, "message")
    })
  })
})