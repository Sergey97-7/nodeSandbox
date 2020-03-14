let workerFarm = require('worker-farm'),
    workers = workerFarm(require.resolve('./child')),
    ret = 0

for (let i = 0; i < 10; i++) {
    workers('#' + i + ' FOO', (err, outp) => {
        console.log(outp)
        if (++ret == 10)
            workerFarm.end(workers)
    })
}