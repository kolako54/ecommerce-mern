import jwt from 'jsonwebtoken'
import Users from '../models/user'
import connectDB from '../db/connectDB'

const auth = async (req, res) => {
    try {
        connectDB()
        console.log(req.headers)
        const token = req.headers.authorization;
        console.log('tokennnnnnnnn', token)
        console.log(token)
        if (!token) {
            console.log('inside if first')
            return res.status(400).json({ err: 'Invalid Authenthication.' })
            // throw Error('Invalid Authenthication.')
            // res.stauts(400).json({err: 'Invalid Authenthication.'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN)
        console.log(decoded)
        if (!decoded) return res.status(400).json({ err: 'Invalid Authenthication.' })

        console.log('eeeeeeeeeee')
        const user = await Users.findById(decoded.id);
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvv')
        console.log(user)
        return {id: user._id, role: user.role, root: user.root};
    } catch (err) {
       return res.status(400).json({err: err.message})
    }
}
export default auth