const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const purchaseSchema = new Schema({
    clubName: {
        type: String,
        required: true
    },
    imagePath1: {
        type: String,
        default: 'https://m.media-amazon.com/images/I/71m1Tf4cIUL._SY355_.jpg'
        // required: true
    },
    imagePath2: {
        type: String,
        default: 'https://4.imimg.com/data4/IM/LO/MY-9807017/bill-receipt-250x250.jpg'
        // required: true
    }
}, { timestamps: true });

const Purchase = mongoose.model('purchase', purchaseSchema);
module.exports = Purchase;