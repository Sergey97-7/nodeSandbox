function asyncFunc() {
    const start = new Date().getTime();
    let i = 0;
    while (i < 1000000000) {
        i++
    }
    const end = new Date().getTime();
    console.log(end - start);
    console.log("threadAsyncFunc: ", process.pid)
}
asyncFunc()