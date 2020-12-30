const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRoute')
const taskRouter = require('./routers/taskRoute')
//const jwt = require('jsonwebtoken')
// const Task = require('./models/task')
// const User = require('./models/user')

const app = express()
const port = process.env.PORT

// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("Server run on port", port)
})

const main = async () => {




}
//main()
