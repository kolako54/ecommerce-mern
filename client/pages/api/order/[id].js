import connectDB from '../../../db/connectDB';
import Orders from '../../../models/order'
import auth from '../../../middleware/auth'

connectDB();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    console.log('order')
    console.log(req.method)
    switch (req.method) {
        case 'PATCH':
            await paymentOrder(req, res)
            break;
    }
}
const paymentOrder = async(req, res) => {
    try {
        const result = await auth(req, res);
        const id = req.query.id;
        await Orders.findOneAndUpdate({_id: id},
            {
                paid: true, dateOfPayment: new Date().toISOString(),
            });
        
        res.json({msg: 'Payment success!'})
        
        
    } catch (err) {
        return res.status(500).json({err: err.message})
        
    }
}