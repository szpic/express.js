import express = require("express")

export function index(req: express.Request, res: express.Response) {
    
     res.send('I am alive!');
};