import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        requird: true
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false,
    },
    inStock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
})

const ProductModel = mongoose.models?.product || mongoose.model('product', ProductSchema);
export default ProductModel;