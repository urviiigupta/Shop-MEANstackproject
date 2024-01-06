const mongoose=require('mongoose')
const Schema=mongoose.Schema


const ItemSchema = new Schema({
    itemname: { type: String, default: '' },
    qty: { type: Number, default: 1 },
    rate: { type: Number, default: 0 },
    amt: { type: Number, default: 0 }
  });
  
  const BillSchema = new Schema({
    Billno: { type: String, default: '' },
    Billdate: { type: Date, default: Date.now },
    Customername: { type: String, default: '' },
    Itemsarray: [ItemSchema],
    Totalamt: { type: Number, default: 0 }
  },{ timestamps: true });

const Bill=mongoose.model('Bill',BillSchema)
module.exports=Bill

