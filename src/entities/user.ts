import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm"

@Entity()
export class User {
    
    constructor(id: number, firstName: string, lastName: string, email: string, passwordHash: string){
        this.id = id
        this.firstName = firstName
        this.lastname = lastName
        this.email = email
        this.passwordHash = passwordHash
    }

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName: string

    @Column()
    lastname: string

    @Column()
    email: string
    
    @Column()
    passwordHash: string

}