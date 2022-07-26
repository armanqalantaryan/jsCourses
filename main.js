const factorial = require('./index2');
const {performance} = require('perf_hooks');
const { Worker } = require('worker_threads');
const { exec } = require('child_process');

const childProces = exec('ls',(err,stdout,stderr) => {





})

const compute = (array) => {
return new Promise(((resolve, reject) => {
    const worker = new Worker('./index1.js',{
        workerData: {
            array
        }
    });
    worker.on('message', (msg) => {
        console.log(worker.threadId);
        resolve(msg);
    })
    worker.on('error',(err) => {
        reject(err);
    });
    worker.on('exit', () => {
        console.log("thread over");
    })
}))
}

const main  = async () => {
  performance.mark('start');
  const result = await Promise.all([
     compute([25,20,19,48,30,50]),
     compute([25,20,19,48,30,50]),
      compute([25,20,19,48,30,50]),
      compute([25,20,19,48,30,50])
  ]);
  console.log(result);
  performance.mark('end');
  performance.measure('main','start', 'end');
};

main();
