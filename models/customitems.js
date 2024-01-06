const mongoose=require('mongoose')
const Schema=mongoose.Schema

const CustomItemSchema = new Schema({
    itemname: { type: String, default: '' }, 
    rate: { type: Number, default: 0 },
  
  });
  
const Item=mongoose.model('Item',CustomItemSchema)

module.exports=Item