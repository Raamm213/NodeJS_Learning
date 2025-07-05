const fs = require("fs")
const filePath = "./taskLog.json"

const command = process.argv[2]
const argument = process.argv[3]


const loadTasks = () => {
    try {
        const dataBUffer = fs.readFileSync(filePath)
        const dataJSON = dataBUffer.toString()
        return JSON.parse(dataJSON)
        
    } catch (error) {
        return []
    }
}

const saveTasks = (argument) => {
    const dataJSON = JSON.stringify(argument)
    fs.writeFileSync(filePath,dataJSON)
}




const addTasks = (argument) => {
    const tasks = loadTasks()
    tasks.push(argument)
    saveTasks(tasks)
    console.log("successfully added" )
}

const listTasks = () => {
    const tasks = loadTasks()
    tasks.forEach((ele,i)=>{
        console.log(`${i+1}-${ele}`)
    })

}
const removeTasks = (argument) => {
    const tasks = loadTasks()
    const updated =  tasks.filter((ele,i)=> (i+1) !== Number(argument))
    saveTasks(updated)
    console.log("successfully removed!" )
}



if (command === 'add') {
    addTasks(argument)
}else if(command === 'list') {
    listTasks()
}else if (command === 'remove') {
    removeTasks(argument)
}else if (command === 'save') {
    const tasks = loadTasks()
    saveTasks(tasks)
    console.log("succesfully saved!")
}else if (command === 'wishme'){
    console.log("Happy life !😉")
}

else {
    console.log("commend not found!")
}