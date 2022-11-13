const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const approvedSchema = new Schema({
    clubName: {
        type: String,
        required: true
    },
    imagePath1: {
        type: String,
        required: true
    },
    imagePath2: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Approved = mongoose.model('approved', approvedSchema);
module.exports = Approved;