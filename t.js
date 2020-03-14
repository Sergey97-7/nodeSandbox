const process = require('child_process')
    // const workerFarm = require('worker-farm')
const { Worker, workerData, parentPort } = require('worker_threads')

function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./ttt.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
    })
}

async function run() {
    const result = await runService('world')
    console.log(result);
}

function asyncFunc() {
    const start = new Date().getTime();
    let i = 0;
    while (i < 1000000000) {
        i++
    }
    const end = new Date().getTime();
    console.log(end - start);
    console.log("asyncFunc: ", process.pid)
}

function notAsyncFunc() {
    const start = new Date().getTime();
    let i = 0;
    while (i < 1000000000) {
        i++
    }
    const end = new Date().getTime();
    console.log(end - start);
    console.log("notAsyncFunc: ", process.pid)
}
run().catch(err => console.error(err))
process.fork("./tt.js")
process.fork("./tt.js")
    // process.fork("./tt.js")
setImmediate(asyncFunc)
    // process.fork("./tt.js")
notAsyncFunc()
notAsyncFunc()
notAsyncFunc()

//10000000000