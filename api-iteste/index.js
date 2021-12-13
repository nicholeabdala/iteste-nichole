const api = require("./api");
const express = require("express");

const server = express();

server.use(express.json());

server.listen(8001);

server.get('/', async(req, res) => {
    
    try {
        const{ data } = await api.get('/');
       
        return res.send({data});
    } catch (error) {
        res.send({error: error.message});
    }
});