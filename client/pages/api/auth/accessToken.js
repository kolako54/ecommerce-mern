import connectDB from '../../../db/connectDB'
import UserModel from '../../../models/user'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../../utils/signToken'
connectDB();
export default async (req, res) => {
    try {
        console.log('this is refreshtoken')
      
        const rf_token = req.cookies.refreshToken
        console.log(rf_token)
        if (!rf_token) {
            return res.status(400).json({ err: 'Please login again.' })
        }
        const result = jwt.verify(rf_token, process.env.SECRET_REFRESH_TOKEN);
        if (!result) {
            return res.status(400).json({ err: 'Your token is incorrect or has expired.' })
        }
        const User = await UserModel.findById(result.id);
        if (!User) {
            return res.status(400).json({ err: 'User does not exist' })
        }
        const access_token = createAccessToken({ id: User._id })
        return res.json({
            access_token,
            user: {
                name: User.name, email: User.email,
                role: User.role, avatar: User.avatar
            }
        })
    } catch(err) {
        return res.status(400).json({ err: err.message })
    }

}

