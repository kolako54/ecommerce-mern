import connectDB from '../../../db/connectDB'
import User from '../../../models/user'
import validation from '../../../utils/validation'
import bcrypt from 'bcrypt'
connectDB();
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password, cf_password} = req.body;
        const errMsg = validation(name, email, password, cf_password);
        if(errMsg) return res.status(400).json({err: errMsg});
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(400).json({err: 'This user already exist'})
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const UserModel = await User.create({ name, email, password: passwordHash, cf_password });
        console.log(UserModel);
        return res.json({ msg: "register success!" })

    } catch (err) {
        console.log('register error')
        console.log(err)
        return res.status(500).json({ err: err.message })
    }
}