const express = require('express')
const  userRouter  = require('./Router/User/user.router')
const  adminRouter  = require('./Router/Admin/admin.router')
const { connectMongo } = require('./Model/mongo')

const app = express();
const PORT = 3500;
app.use(express.json());

app.use('/user/', userRouter);
app.use('/admin/', adminRouter);

async function connectingMongo(){
    await connectMongo() 
}

async function startServer(){
    await connectingMongo() 
    app.listen(PORT, ()=>{ console.log(`listening on the port ${PORT}`)})
}


startServer().catch(e=>console.log(e));

app.listen(3000); 