import mongodb = require('mongodb');
import assert = require('assert');

import { Item } from './shared/Item';
import { Login } from './shared/Login';
import { User } from './shared/User';
import { Category } from './shared/Category';

var client = mongodb.MongoClient;

var url = 'mongodb://127.0.0.1:27017/products';

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
        db.collection('products').find({},{description:1, price:1, count:1, _id:0, category:1}).toArray((err, item) =>{
            assert.equal(null, err);
            db.close();
            callback(item);
        });
    });
}

export function getProductsFromCategory(categoryName: string, callback: (item: Item) => void) {
    client.connect(url,(err, db)=>{
        assert.equal(null,err);
        db.collection('products').find({category: categoryName},{description:1, price:1, count:1, _id:0, category:1}).toArray((err, item) =>{
            assert.equal(null, err);
            db.close();
            callback(item);
        });
    });
}

export function getCategories(callback: (category: Category) => void){
    client.connect(url,(err, db)=>{
        assert.equal(null, err);
        db.collection("products").distinct("category",(err, category)=>{
            assert.equal(null, err);
            db.close();
            callback(category);
        })
    })
}
