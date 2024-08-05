const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const Employee=require('./models/Employee')
const connectionString="mongodb://127.0.0.1:27017/srmap"
const PORT=process.env.PORT | 9000

mongoose.connect(connectionString)
// const con=mongoose.connection

const app=express()
app.use(cors())
app.use(express.json())
//get api call
app.get("/",
    (req,res)=>{
        Employee.find({})
        .then(employees=>res.json(employees))
        .catch(err=>res.json(err))
    }
)
//get api call with parameter
app.get("/getEmployee/:id",
    (req,res)=>{
        const id=req.params.id
        Employee.findById({_id:id})
        .then(employees=>res.json(employees))
        .catch(err=>res.json(err))
    }
)
//put api call
app.put("/updateEmployee/:id",
    (req,res)=>{
        const id=req.params.id
        Employee.findByIdAndUpdate(
                    {_id:id},
                        {
                            Name:req.body.Name,
                            Gender:req.body.Gender,
                            Salary:req.body.Salary
                        }
                    )
        .then(employees=>res.json(employees))
        .catch(err=>res.json(err))
    }
)
// con.on('open',()=>console.log('Connected'))
//post api call
app.post("/createEmployee",
    (req,res)=>{
        Employee.create(req.body)
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }
)

app.delete("/deleteEmployee/:id",
    (req,res)=>{
        const id=req.params.id
        Employee.findByIdAndDelete(
                    {_id:id})
        .then(result=>res.json(result))
        .catch(err=>res.json(err))
    }
)

app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))