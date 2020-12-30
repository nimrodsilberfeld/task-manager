const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})



// const newTask=new Task({
//     task:"learn mongoose"
// })
// newTask.save()
// .then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// })


// const newUser = new User({
//     name: "Itamar",
//     age: 22,
//     email: "Itamar@gmail.com",
//     password: "12345"
// })

// newUser.save().then(() => {
//     console.log(newUser)
// }).catch((err) => {
//     console.log("Error! ", err)
// })

