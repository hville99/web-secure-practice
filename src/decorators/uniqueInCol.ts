import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";
import {User} from "../entities/user";
import {AppDataSource} from "../lib/typeorm";

export function UniqueInColumn(property?: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'UniqueInColumn',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: {
                message: `${propertyName} already exists`,
            },
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    if(!AppDataSource.isInitialized){
                        await AppDataSource.initialize();
                    }

                    return AppDataSource.manager.find(User, { where: { email: value as string } }).then(([user]) => !user);
                },
            },
        });
    };
}