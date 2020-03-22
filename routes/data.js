const express = require('express');
const fs = require('fs');
const router = express.Router();
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const Data = require("../models/Data");
const Files = require("../models/Files");

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

    if (data) {
        await data.save().then(() => {
            res.send(content)

        }).catch(e => {
            res.send(e)
        })
    }

});

router.get('/generateFile', async(req, res) => {
        res.render('data2');
    })
    //TODO убрать эту шляпу
let Ipath = 3;
router.post('/generateFile', async(req, res, next) => {
    const path = `./fileCollection${Ipath % 2 ? 1 : 2}/`;
    let schema = [];
    if (req.body.status === true) {
        Object.keys(req.files).forEach((file) => {
            req.files[file].mv(path + Ipath + req.files[file].name);
            schema.push({
                path,
                name: Ipath + req.files[file].name,
                mimetype: req.files[file].mimetype
            })
        })
        let files = new Files({ files: schema })
        files.save().then(() => {
            Ipath++;
            res.send({
                status: true,
                message: 'Files uploaded',
                files: schema
            });
        }).catch(e => {
            res.sendStatus(400)
        })
    } else {
        res.send('ok')
    }
})
router.get('/file/:file', async(req, res, next) => {
    const { file } = req.params;
    const result = await Files.findOne({ 'files.name': { $regex: new RegExp(file) } });
    res.send(result !== null ? result : 'Nothing found!');
})
router.get('/file2/:file', async(req, res, next) => {
    const { file } = req.params;
    const result = await Files.findOne({ 'files.name': { $regex: new RegExp(file) } });
    const { path, name } = result.files[0];
    let content = await fs.promises.readFile(path + name);
    res.send(!!content ? { content } : 'Nothing found!');
})
module.exports = router;