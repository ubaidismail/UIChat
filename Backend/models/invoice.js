const mongoose = require('mongoose');

const {Schema} = mongoose;

const invoiceData = new Schema({
    invoice_num:{type: Number, required:true},
    logo:{type: String, required:false},
    invoice_from:{type:String, required:true},
    invoice_to:{type:String, required:true},
    invoice_to_email:{type:String, required:true},
    invoice_to_due_date:{type:Date, required:true},
    invoice_type:{type:String, required:true},
    projet_name:{type:String, required:true},
    item:{type:String, required:true},
    qty:{type:String, required:true},
    total:{type:String, required:true},
    tax_amount:{type:String, required:true},
    grand_total:{type:String, required:true},
    author:{type:mongoose.SchemaTypes.ObjectId, ref:'users'},
},
    {timestamps: true}
);
module.exports = mongoose.model('Invoice' , invoiceData, 'invoices');