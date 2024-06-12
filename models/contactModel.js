const { timeStamp } = require('console');
const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please add name"]
    },
    email:{
        type:String,
        required:[true, "please add email address"]
    },
    phone:{
        type:String,
        required:[true, "please add phone number"]
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model("Contact", contactSchema);