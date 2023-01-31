import { Entity, Column, PrimaryGeneratedColumn , BeforeInsert, BeforeUpdate } from "typeorm"
// import {ValidationError} from "../lib/ValidationError";
import {IsNotEmpty, validate} from "class-validator";
import {compare, genSalt, hash} from "bcrypt";
import {UniqueInColumn} from "../decorators/uniqueInCol";
import { SetPasswordDTO } from "../lib/setpassdto";

@Entity()
export class User {
    

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;
    
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
    passwordHash!: string;

    /*
    @BeforeInsert()
    @BeforeUpdate()
    checkRequiredProperties() {
        if (!this.email || this.email === "") {
            throw new ValidationError("Email required", this, "email");
        }
    }
    */

    async setPassword(password: string, confirmation: string) {
        const dto = new SetPasswordDTO();
        dto.password = password;
        dto.confirmation = confirmation;
        const [error] = await validate(dto);
        if (error) {
            throw error;
        }

        const salt = await genSalt();
        this.passwordHash = await hash(dto.password, salt);
    }

    async isPasswordValid(password: string) {
        return await compare(password, this.passwordHash);
    }
}

