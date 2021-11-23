import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: String,
    mobile: String,
    cart: Array,
    total: Number,
    delivered: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});
const OrderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default OrderModel