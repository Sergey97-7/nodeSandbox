const express = require('express');
const fs = require('fs');
const router = express.Router();
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const Data = require("../models/Data");

router.get('/text', async(req, res, next) => {
    const buffer = Buffer.from(text)
    const data = new Data({
        text: buffer
    })
    await data.save().then(() => {
        res.send("Buffer saved!");
    }).catch(e => {
        res.send(e)
    })
});
//TODO искать только с полем text
router.get('/gettext', async(req, res, next) => {
    const data = await Data.find();
    const result = data.map(buf => {
        return {
            id: buf._id,
            buffer: buf.text.toString('utf-8')
        }
    })
    res.send(result);
})
router.get('/savefile/type/:type', async(req, res, next) => {
    const type = req.params.type;
    let data;
    let content;
    if (type === "image") {
        await new Promise((resolve, reject) => {
            fs.readFile("./files/testImg.PNG", (err, result) => {
                if (err) {
                    reject(err)
                }
                content = result;
                data = new Data({
                    image: result
                })
                resolve(data)
                    // console.log("result", result)
            });
        })

    } else if (type === "doc") {
        await new Promise((resolve, reject) => {
            fs.readFile("./files/doc.pdf", (err, result) => {
                if (err) {
                    reject(err)
                }
                content = result;
                data = new Data({
                    pdf: result
                })
                resolve(data)
                    // console.log("result", result)
            });
        })
    } else {
        const buffer = Buffer.from(text)
        data = new Data({
                text: buffer
            })
            // res.send("Wrong param :type!");
    }
    console.log("data", data)
        // res.writeHead(200, { 'Content-Type': 'image/png' });
        // res.send(content);
    if (data) {
        await data.save().then(() => {
            res.send(content)
                // res.send(`Saved ${type}!`);
        }).catch(e => {
            res.send(e)
        })
    }

});
module.exports = router;