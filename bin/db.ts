import mongodb = require('mongodb');
import assert = require('assert');

import { Item } from './shared/Item';
import { Login } from './shared/Login';
import { User } from './shared/User';

var client = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/products';

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
export function getProducts(callback: (item: Item) => void) {
    client.connect(url,(err, db)=>{
        assert.equal(null,err);
        db.collection('products').find({},{description:1, price:1, count:1, _id:0}).toArray((err, item) =>{
            assert.equal(null, err);
            db.close();
            callback(item);
        });
    });
}
