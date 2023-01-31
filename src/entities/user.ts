import { Entity, Column, PrimaryGeneratedColumn , BeforeInsert, BeforeUpdate } from "typeorm"
// import {ValidationError} from "../lib/ValidationError";
import {IsNotEmpty, ValidationError} from "class-validator";
import {compare, genSalt, hash} from "bcrypt";
import {UniqueInColumn} from "../decorators/uniqueInCol";
import { SetPasswordDTO } from "../lib/setpassdto";
import { entropy } from "../lib/entropy";

@Entity()
export class User {
    

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    firstName!: string

    @Column()
    lastname!: string
    
    @Column({
        transformer: {
            from(value: string) {
                return value.toLowerCase();
            },
            to(value: string) {
                return value.toLowerCase();
            },
        },
    })
    @IsNotEmpty()
    @UniqueInColumn()
    email!: string;
    /*
    @Column({
        nullable: false
    })
    email?: string
    */
    @Column()
    passwordHash!: string

    /*
    @BeforeInsert()
    @BeforeUpdate()
    checkRequiredProperties() {
        if (!this.email || this.email === "") {
            throw new ValidationError("Email required", this, "email");
        }
    }
    */

    async setPassword(dto: SetPasswordDTO) {
        if (dto.password != dto.confirmation || entropy(dto.password) < 80) {
            throw new ValidationError();
        }

        const salt = await genSalt();
        this.passwordHash = await hash(dto.password, salt);
    }

    async isPasswordValid(password: string) {
        return await compare(password, this.passwordHash);
    }
}

