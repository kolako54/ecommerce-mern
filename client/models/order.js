import mongoose from 'mongoose'
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    address: String,
    mobile: String,
    cart: Array,
    total: Number,
    delivered: {
        type: Boolean,
        default: false
    },
    paid:{
        type: Boolean,
        default: false,
    },
    dateOfPayment: Date,
},
{
    timestamps: true
});

const OrderModel = mongoose.models.order || mongoose.model('order', OrderSchema);
export default OrderModel