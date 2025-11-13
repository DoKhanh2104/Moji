import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protectedRoute = (req, res, next) => {
    try {
        // lấy token từ header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ mess: "Không tìm thấy access token" });
        }

        // xác nhận token hợp lệ
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            if (err) {
                console.error(err);

                return res.status(403).json({ mess: "Access token hết hạn hoặc không đúng !!!" })
            }

            // tìm user theo id
            const user = await User.findById(decodedUser.userId).select('-hashedPassword');

            if (!user) {
                return res.status(404).json({ mess: "Không tìm thấy user" })
            }

            // trả user về res
            req.user = user;
            next();
        })
    } catch (error) {
        console.error("Lỗi xác minh JWT", error);
        return res.status(500).json({ mess: "Lỗi hệ thống" })
    }
}