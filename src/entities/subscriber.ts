import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from "typeorm";
import {User} from "./user";
import {validate} from 'class-validator';

@EventSubscriber()
export class Subscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User
    }

    async beforeInsert(event: InsertEvent<User>) {
        const [error] = await validate(event.entity);

        if (error) {
            throw error;
        }
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        const [error] = await validate(event.entity!);

        if (error) {
            throw error;
        }
    }
}