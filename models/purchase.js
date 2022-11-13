const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const purchaseSchema = new Schema({
    clubName: {
        type: String,
        required: true
    },
    imagePath1: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg'
        // required: true
    },
    imagePath2: {
        type: String,
        default: 'https://static.theprint.in/wp-content/uploads/2019/12/27466438332_2b15bea6e2_k-e1575788134164.jpg'
        // required: true
    }
}, { timestamps: true });

const Purchase = mongoose.model('purchase', purchaseSchema);
module.exports = Purchase;