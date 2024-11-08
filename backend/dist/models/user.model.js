"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [];
    }
    findAll() {
        return this.users;
    }
    findById(id) {
        const user = this.users.find(user => user.id === id);
        if (!user)
            return undefined;
        return user;
    }
    findByUsername(username) {
        const user = this.users.find(user => user.username === username);
        if (!user)
            return undefined;
        return user;
    }
    create(newUser) {
        const user = Object.assign({ id: (0, uuid_1.v4)() }, newUser);
        this.users.push(user);
        return user;
    }
    edit(id, newData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return undefined;
        const user = Object.assign(Object.assign({}, this.users[index]), newData);
        this.users[index] = user;
        return user;
    }
    delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
}
exports.default = new UserModel;
