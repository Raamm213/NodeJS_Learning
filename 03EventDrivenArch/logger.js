const fs = require("fs")
const os = require("os")
const EventEmitterClass = require("events")
const logger = new Logger()
const logFile = './logFile.txt'


class Logger extends EventEmitterClass {
    log(message){
        this.emit('message', {message})
    }
}

logger.on('message' , logToFile)

const logToFile = (event) => {
    const logmeg = `${new Date().toISOString()} - ${event.message} \n`
    fs.appendFile(logFile,logmeg,(err)=> {
        if (err){
            console.error("failed at write log:",err)
        }
    })
}




setInterval(()=>{
    const memusage = (os.freemem()/os.totalmem) * 100
    logger.log(`Current memory usage: ${memusage.toFixed(2)}`)
},1000)


logger.log("Application started")

logger.log('Application event occured')