import connectDB from '../../../db/connectDB'
import User from '../../../models/user'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/signToken'
connectDB();
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ err: 'This user is not exist' })
        }
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword) {
            return res.status(400).json({
                err: 'incorrect password'
            })
        }
        const access_token = createAccessToken({ id: findUser._id })
        const refresh_token = createRefreshToken({ id: findUser._id })
        return res.json({
            msg: "Login success!",
            refresh_token, 
            access_token,
            user: {
                name: findUser.name, email: findUser.email,
                role: findUser.role, avatar: findUser.avatar,
                root:findUser.root
            }
        })

    } catch (err) {
        console.log('register error')
        console.log(err)
        return res.status(500).json({ err: err.message })
    }
}