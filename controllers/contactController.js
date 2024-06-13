const expressAsyncHandler=require('express-async-handler');
const Contact=require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts=expressAsyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Get contact by id
//@route GET /api/contacts
//@access private

const getContact=expressAsyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).json(contact);
});

//@desc create contact 
//@route POST /api/contacts
//@access private

const createContact=expressAsyncHandler(async(req,res)=>{
    const {name, email, phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are mandatory!...');
    }
    const contact=await Contact.create({
        user_id:req.user.id,
        name,email,phone
    })
    res.status(200).json(contact);
});

//@desc update contact by id
//@route PUT /api/contacts
//@access private

const updateContact=expressAsyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    } 
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts")
    }

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    );
    res.status(200).json(updatedContact);
});

//@desc delete contact by id
//@route Delete /api/contacts
//@access public

const deleteContact=expressAsyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    } 

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts")
    }
    
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports={getContacts,getContact,createContact,updateContact,deleteContact}