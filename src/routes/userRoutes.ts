import { AppDataSource } from "../lib/typeorm";
import { FastifyInstance } from "fastify";
import { User } from "../entities/user";
import * as createUserReqBody from '../schemas/json/createuserreqbody.json';
import * as createUserResBody from '../schemas/json/createuserresbody.json';
import { CreateSessionReqBody as CreateSessionReqBodyInterface } from '../schemas/types/createsessionreqbody';
import { CreateUserReqBody as CreateUserReqBodyInterface } from '../schemas/types/createuserreqbody';
import { CreateUserResBody as CreateUserResBodyInterface } from '../schemas/types/createuserresbody';


export async function userRoutes(fastify: FastifyInstance) {
    
    
    fastify.post<{ 
        Body: CreateUserReqBodyInterface
    }>('/web-api/users', {
        schema: {
            body: createUserReqBody,
            response: {200: createUserResBody}
        }
    }, async (req, res)  => {

        const {email, firstname, lastname, password, passwordConfirmation} = req.body;

        const repo = AppDataSource.getRepository(User);
        const user = new User();
        
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;

        await user.setPassword(password, passwordConfirmation);
        await repo.save(user);
      })
    
}