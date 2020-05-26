import {v1 as uuidv1} from 'uuid';

export function User() {
    this.model = {
        id: uuidv1(),
        name: null,
        usernameOrEmail: null,
        password: null,
    }
    return this.model;
}
