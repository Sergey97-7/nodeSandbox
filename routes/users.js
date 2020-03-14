const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const sha256 = require("sha256")
const crypto = require('crypto');
const api = require('../public/javascripts/api')
    /* GET user listing */
router.get('/', async(req, res, next) => {
    const users = await User.find({});
    res.send(JSON.stringify(users));
});
/* GET users by :param */
router.get('/id/:id', async(req, res, next) => {
    const users = await User.find({ _id: req.params.id });
    res.send(JSON.stringify(users));
});
router.get('/name/:name', async(req, res, next) => {
    const users = await User.find({ name: req.params.name });
    res.send(JSON.stringify(users));
});
router.get('/lastName/:lastName', async(req, res, next) => {
    const users = await User.find({ lastName: req.params.lastName });
    res.send(JSON.stringify(users));
});
router.get('/age/:age', async(req, res, next) => {
    const users = await User.find({ age: req.params.age });
    res.send(JSON.stringify(users));
});
/* returns form to create new user */
router.get('/create', async(req, res) => {
        res.render('createUser');
    })
    /* create new user and save to db */
router.post('/create', async(req, res) => {
        const { name = null, lastName = null, age = null, description = null } = req.body;
        const user = new User({
            name,
            lastName,
            age,
            description
        })
        await user.save().then(() => {
            res.send('Success user creation!');
        }).catch(e => {
            res.send(e)
        })
    })
    /* returns form to create new file */
router.get('/send/file', async(req, res) => {
    res.render('sendFile');
})
router.post('/send/file', async(req, res) => {
        console.log(req.body);
        res.send('Success file creation!');
        // const { name = null, lastName = null, age = null, description = null } = req.body;
        // const user = new User({
        //     name,
        //     lastName,
        //     age,
        //     description
        // })
        // await user.save().then(() => {
        //     res.send('Success user creation!');
        // }).catch(e => {
        //     res.send(e)
        // })
    })
    /* create clone and save to db */
router.get('/create/clone', async(req, res) => {
    const user = new User({
        name: `clone${Math.round(Math.random() * 10000)}`,
        lastName: `lastname${Math.round(Math.random() * 10000)}`,
        age: Math.round(Math.random() * 100),
        description: `clone${Math.random()}`
    })
    await user.save().then(() => {
        res.send('Success clone creation!');
    }).catch(e => {
        res.send(e)
    })
})
router.get('/crypto', async(req, res, next) => {
    cryptoUser = sha256("Serj")
    console.log(`success crypto!, ${sha256("sss")}`);
    res.send('respond with a resource');
});
router.get('/decrypto', async(req, res, next) => {

    res.send(`decrypted`);
});
router.get('/test', function(req, res, next) {
    res.send(JSON.stringify({ res: "test answer2" }));
});
module.exports = router;
//TODO роуты на добавление и изменение пользователя