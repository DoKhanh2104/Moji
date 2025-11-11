import bcrypt from 'bcrypt';
import User from '../models/User.js'

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ mess: "Không thể thiếu username, password, email, firstName, lastName" })
        }

        // Kiem tea username co ton tai chua
        const duplicate = await User.findOne({ username })
        if (duplicate) {
            return res.status(409).json({ mess: "Người dùng đã tồn tại" })
        }

        // ma hoa password
        const hashedPassword = await bcrypt.hash(password, 10);

        // tao user moi
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`,
        })

        return res.sendStatus(204);


    } catch (error) {
        console.error('Lỗi khi signUp', error)
        return res.status(500).json({ mess: "Lỗi hệ thống" });
    }

};