const fs = require('fs');
const os = require('os');
const EventEmitter = require('events');

const filePath = './cpuLog.txt';

class Writer extends EventEmitter {
    write(message) {
        this.emit('cpu', { message });
    }
}

const writerObj = new Writer();

const writeOnFile = (event) => {
    const osdata = os.cpus();
    fs.appendFile(filePath, JSON.stringify(osdata) + '\n', (err) => {
        if (err) {
            console.log(`Failed at: ${err}`);
        }
    });
};

writerObj.on('cpu', writeOnFile);

writerObj.write("the");
