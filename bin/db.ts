import mongodb = require('mongodb');
import assert = require('assert');

var client = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/products';

export interface User {
    _id: string;
    login: string;
    password: string;
}

export function getUser(id: string, callback: (user: User) => void) {
    client.connect(url,(err, db)=>{
        assert.equal(null,err);
        db.collection('users').find({login:id}).nextObject((err, user) =>{
            assert.equal(null, err);
            db.close();
            callback(user);
        });
    });
}

export function getUsers(callback: (user: User) => void) {
    client.connect(url,(err, db)=>{
        assert.equal(null,err);
        db.collection('users').find({}).toArray((err, user) =>{
            assert.equal(null, err);
            db.close();
            callback(user);
        });
    });
}

