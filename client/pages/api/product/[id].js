import connectDB from '../../../db/connectDB'
import ProductsModel from '../../../models/product'
connectDB();

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getProduct(req, res);
            break;
    }
}
const getProduct = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await ProductsModel.findById(id);
        if (!product) return res.json(400).json({ err: 'This product does not exist.' })
        res.json({
            status: 'success',
            product
        })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}