const express = require('express');
const fs = require('fs');
const router = express.Router();
const zlib = require('zlib');

router.get('/', async(req, res, next) => {
    const string = "super string";
    const string2 = "super string24124";
    const buf = Buffer.from(string);
    const gz = zlib.deflateSync(buf)
    const inflated = zlib.inflateSync(gz)
    console.log({ gz: gz.toString() })
        // zlib.gzip(string2, (err, data) => {
        //     zlib.unzip(data, (err, result) => {
        //         res.send(result.toString());
        //     })
        // });
    res.send(inflated.toString());
});
router.get('/stream', async(req, res, next) => {
    const buffers = [];
    let buffer = null;
    const string = "super string";
    const gz = zlib.createGzip();
    const readStream = fs.createReadStream('./zlib.txt')
        // const writeStream = fs.createWriteStream()
    gz.on('data', buf => {
        buffers.push(buf)
    });
    gz.on('end', () => {
        buffer = Buffer.concat(buffers)
        res.send(buffer.toString());
    })
    readStream.pipe(gz);
    console.log({ buffer })
});
router.get('/zlib', async(req, res, next) => {
    const string = "lorem"
    const gz = zlib.createGzip()

    //TODO zlib String
    res.send("zlib");
});
// router.post('/', async(req, res, next) => {
//     const { message, level } = req.body;
//     console.log(req.body)
//     const gzip = createGzip();
//     // var gzip = zlib.createGzip({
//     //         level: 9 // maximum compression
//     //     }),
//     //     buffers = [],
//     //     nread = 0;

//     // gzip.on('error', function(err) {
//     //     gzip.removeAllListeners();
//     //     gzip = null;
//     // });

//     // gzip.on('data', function(chunk) {
//     //     Buffer.concat(chunk)
//     //         // buffers.push(chunk);
//     // });


//     // gzip.on('end', function() {
//     //     var buffer;
//     //     switch (buffers.length) {
//     //         case 0: // no data.  return empty buffer
//     //             buffer = new Buffer(0);
//     //             buffer = Buffer.alloc(0);
//     //             break;
//     //         case 1: // only one chunk of data.  return it.
//     //             buffer = buffers[0];
//     //             break;
//     //         default: // concatenate the chunks of data into a single buffer.
//     //             buffer = Buffer.alloc(nread);
//     //             var n = 0;
//     //             buffers.forEach(function(b) {
//     //                 var l = b.length;
//     //                 b.copy(buffer, n, 0, l);
//     //                 n += l;
//     //             });
//     //             break;
//     //     }

//     //     gzip.removeAllListeners();
//     //     gzip = null;

//     //     // do something with `buffer` here!
//     // });

//     // // and finally, give it data to compress
//     // gzip.write(inputBuffer);
//     // gzip.end();




//     res.send(`zlib ${JSON.stringify(req.body)}`);
// });
router.post('/file', async(req, res, next) => {
    console.log(req)
    res.send(`zlibed file ${req}`);
})
module.exports = router;