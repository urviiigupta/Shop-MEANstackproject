const express= require('express')
const app=express()
const mongoose=require('mongoose')
const Bill=require('./models/bills.js')
const Item=require('./models/customitems.js')
const Urldb="mongodb+srv://ug187:test1234@cluster1.wovcv6k.mongodb.net/node-project?retryWrites=true&w=majority"

// static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

mongoose.connect(Urldb).then((result)=>{
    app.listen(5000,()=>{
        console.log("server is listening at port 5000")
    })

    console.log("connected to the database")
}).catch((err)=>{
    console.log(err)
})

app.post('/bill/api/bill',(req,res)=>{
    const{body}=req
    Bill.find().sort({Billno: -1}).limit(1).then((result) => {
        const maxBillNo = result.length > 0 ? result[0].Billno : 0;

        const bill = new Bill({
            Billno: parseInt(maxBillNo) + 1,
            Billdate: body.Billdate,
            Customername: body.Customername,
            Itemsarray: body.Itemsarray,
            Totalamt: body.Totalamt
        });

        bill.save().then((result) => {
            res.status(200).json({data: bill.Billno});
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/bill/api/items', (req, res) => {
    Item.find().then((result) => {
        res.status(200).json({success: true, data: result})
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/bill/api/bill', (req, res) => {
    Bill.find().select('Billno').then((result) => {
        res.status(200).json({success: true, data: result})
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
})



app.get('/bill/api/bill/:id', (req, res) => {
    const billno = req.params.id;
    Bill.findOne({ Billno: billno }).then((result) => {
        res.status(200).json({success: true, data: result})
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
})

app.post('/items/api/items',(req,res)=>{
    const{body}=req
    for(i=0;i<body.arritems.length;i++)
    {
        const item=new Item({
            itemname: body.arritems[i].itemname,
            rate: body.arritems[i].rate,
          })

          Item.findOne({ itemname: item.itemname }).then((result) => {
            if(!result)
            {
                item.save().then((result)=>{
                    console.log(result)
             }).catch((err)=>{
                 console.log(err)
             }) 
            }

            else
            {
                console.log(`item already exits ${result}`)
            }
        }).catch((err) => {
            console.log(err)
        })
       
    }

    res.status(200).json({message:"items are saved in the data base"})
    
})


app.get('/summary/api/summary', (req, res) => {
    // Use your Bill model to group by item name and sum up the quantity
    Bill.aggregate([
        { $unwind: "$Itemsarray" },
        {
            $group: {
                _id: "$Itemsarray.itemname", // Group by item name
                totalQuantity: { $sum: "$Itemsarray.qty" }, // Sum up the quantity
                totalAmount: {$sum: "$Itemsarray.amt"}
            }
        }
    ])
    .then(result => {
        // Send the result as the response
        console.log(result )
        res.status(200).json(result);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Error fetching summary from database" });
    });
});