import { ObjectId } from "mongodb";

export default class User {
    constructor(
        public username: string,
        public password: string,
        public created: number,
        public id?: ObjectId,
    ){}
}

export type Credentials = Pick<User, 'username' | 'password'>