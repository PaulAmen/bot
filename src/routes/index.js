const express = require("express");

const routes = express.Router();

routes.get("/help", function(req,res){
    res.send("Bot desarrollado por Paúl Amén");
})

module.exports = routes;
