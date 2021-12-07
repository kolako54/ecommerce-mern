import connectDB from '../../../db/connectDB';
import Orders from '../../../models/order'
import Products from '../../../models/product'
import auth from '../../../middleware/auth'

connectDB();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    console.log('order')
    console.log(req.method)
    switch (req.method) {
        case 'POST':
            await createOrder(req, res)
            break;
        case "GET":
            await getOrders(req, res);
            break;
    }
}

const getOrders = async(req, res) => {
    try {
        const result = await auth(req, res);
        let orders;
        console.log('role?', result.role)
        if(result.role !== 'admin'){
            orders = await Orders.find({user: result.id}).populate('user', '-password')
            console.log('orderss')
        }else{
            orders = await Orders.find().populate('user', '-password')
        }
        res.json({orders})
        
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}
const createOrder = async (req, res) => {
    try {
        console.log('result')
        const result = await auth(req, res)
        const { _id, address, mobile, card, total } = req.body;
        console.log('bodyyyyyyyyyyyyyyyyyyyyyyyyyyy', req.body)
        console.log(address, total)
        const newOrder = new Orders({
            user: result.id, address, mobile, cart: card, total,
        })
        card.map(item => {
            return sold(item._id, item.quantity, item.inStock, item.sold)
        })
        await newOrder.save();
        res.json({ msg: 'Payment success! We will contact to you to confirm the order.', newOrder })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
    await Products.findOneAndUpdate({ _id: id }, {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold
    })
}