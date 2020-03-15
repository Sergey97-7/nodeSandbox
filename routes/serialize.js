const express = require('express');
const fs = require('fs');
const router = express.Router();
const v8 = require('v8');

router.get('/', async(req, res, next) => {
    const string = {
        a: "super string",
        b: "asdasf"
    };
    console.time("v8");

    const ser = v8.serialize(string)
    console.timeEnd("v8");


    console.time("json");
    const json = JSON.stringify(string)
    console.timeEnd("json");

    console.log("ser", ser)
    console.log("ser", ser.toString())
    res.send(ser.toString());
});
module.exports = router;