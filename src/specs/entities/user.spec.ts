import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {AppDataSource} from "../../lib/typeorm";
import {User} from "../../entities/user";
import {expect} from "chai";
import {Repository} from "typeorm";
import {faker} from "@faker-js/faker";

chai.use(chaiAsPromised)

describe('User', function () {
    let repo: Repository<User>;

    before(async function () {
        await AppDataSource.initialize();
        repo = AppDataSource.getRepository(User);
    })

    beforeEach(async function () {
        await repo.clear();
    })

    describe('validations', function () {
        it('should create a new User in database', async () => {

            const user = new User();

            user.firstName = faker.name.firstName();
            user.lastname = faker.name.lastName();
            user.email = faker.internet.email();
            user.passwordHash = "123456";

            await repo.save(user);

            expect(user).haveOwnProperty('id').and.be.a('string');
        })

        it('[insert] should raise error if email is missing', async function () {
            // hint to check if a promise fails with chai + chai-as-promise:

            const user = new User();

            user.firstName = faker.name.firstName();
            user.lastname = faker.name.lastName();
            user.passwordHash = "123456";


            await expect(repo.save(user)).to.eventually.be.rejected.and.deep.include({
                target: user,
                property: 'email',
                constraints: {isNotEmpty: 'email should not be empty'}
            })

        })

        it('[update] should raise error if email is missing', async function () {
            // hint to check if a promise fails with chai + chai-as-promise:

            const user = new User();

            user.firstName = faker.name.firstName();
            user.lastname = faker.name.lastName();
            user.email = faker.internet.email();
            user.passwordHash = "123456";

            await repo.save(user);

            const userInserted = (await repo.findOneBy({id: user.id})) as User;

            userInserted.email = "";


            await expect(repo.save(userInserted)).to.eventually.be.rejected.and.deep.include({
                target: userInserted,
                property: 'email',
                constraints: {isNotEmpty: 'email should not be empty'}
            })

        })

        it('should create user with lowercase email', async function () {
            // hint to check if a promise fails with chai + chai-as-promise:

            const user = new User();

            const email = "JOHN.DOE@gmail.com";

            user.firstName = faker.name.firstName();
            user.lastname = faker.name.lastName();
            user.email = email;
            user.passwordHash = "123456";

            await repo.save(user);

            const userInserted = (await repo.findOneBy({id: user.id})) as User;


            expect(userInserted.email).eq("john.doe@gmail.com")
        })

        it('should raise error if email is missing', async function () {
            // hint to check if a promise fails with chai + chai-as-promise:

            const user = new User();

            const email = faker.internet.email();

            user.firstName = faker.name.firstName();
            user.lastname = faker.name.lastName();
            user.email = email;
            user.passwordHash = "123456";

            await repo.save(user);

            const secondUser = new User();

            secondUser.firstName = faker.name.firstName();
            secondUser.lastname = faker.name.lastName();
            secondUser.email = email;
            secondUser.passwordHash = "123456";

            await chai.expect(repo.save(secondUser)).to.eventually.be.rejected.and.deep.include({
                target: secondUser,
                property: 'email',
                value: email,
                constraints: { UniqueInColumn: 'email already exists' },
            });
        })

        
    })
})