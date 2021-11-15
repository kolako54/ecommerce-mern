import connectDB from '../../../db/connectDB'
import ProducetModel from '../../../models/product'
connectDB();

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getProducts(req, res);
            break;
    }
}
const getProducts = async (req, res) => {
    try {
        const products = await ProductsModel.find();
        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}