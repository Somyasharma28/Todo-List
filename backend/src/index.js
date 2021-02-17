const express= require('express');
const session= require('express-session');
const cors= require('cors');
const mongoose= require('mongoose');

const app= express();
const port= 8080;

const session_Secret= "todoapp2021";

mongoose.connect('mongodb://localhost:27017/TodoList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("Database is running"))
.catch(err => {
    console.log(err);
  });


app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));
app.use(session({
    secret: session_Secret,
    cookie: {maxAge: 1*60*60*1000}
}));


//Routes defined in separate files
const userRoutes= require('./routes/UserRoutes');
const taskRoutes= require('./routes/TaskRoutes');

app.use("",userRoutes);
app.use("/task",taskRoutes);



app.listen(port,()=>console.log("Application is running on port 8080"));



