const mongoose=require('mongoose')

const employeeSchema=new mongoose.Schema({
    Name:String,
    Gender:String,
    Salary:Number
})

const Employee=mongoose.model("employee",employeeSchema)
module.exports=Employee