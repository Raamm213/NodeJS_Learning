const fs = require("fs")
const os = require("os")

const EventEmitterClass = require("events")


class Logger extends EventEmitterClass {
    log(message){
        this.emit('message', {message})
    }
}

const logger = new Logger()
const logFile = './logFile.txt'


const logToFile = (event) => {
    const logmeg = `${new Date().toISOString()} - ${event.message} \n`
    fs.appendFile(logFile,logmeg,(err)=> {
        if (err){
            console.error("failed at write log:",err)
        }
    })
}


logger.on('message' , logToFile)


setInterval(()=>{
    const memusage = (os.freemem()/os.totalmem) * 100
    logger.log(`Current memory usage: ${memusage.toFixed(2)}`)
},1000)


logger.log("Application started")

logger.log('Application event occured')