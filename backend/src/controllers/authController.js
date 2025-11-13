import bcrypt from 'bcrypt';
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Session from '../models/Session.js';
import crypto from 'crypto';


const ACCESS_TOKEN_TTL = '30m';
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;


//sign up
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

// sign in
export const signIn = async (req, res) => {
    try {
        // get input from body
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ mess: "Không được nhập thiếu username hoặc password" });
        }

        //compare hashedPassword in db to password from input
        const user = await User.findOne({ username });

        if (!user) {
            res.status(401).json({ mess: "username hoặc password không đúng" });
        }

        const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordCorrect) {
            res.status(401).json({ mess: "username hoặc password không đúng" });
        }

        // compare is true , create access token with JWT
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL })

        //create refresh token
        const refreshToken = crypto.randomBytes(64).toString('hex');

        //create new session to save rft
        await Session.create(
            {
                userId: user._id,
                refreshToken,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
            }
        )

        //gửi rft về client thông qua cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, //ko cho truy cap bang js
            samSite: 'none',
            maxAge: REFRESH_TOKEN_TTL,
        })

        //save access token into res
        return res.status(200).json({ mess: `User ${user.displayName} đã log in !!!`, accessToken });

    } catch (error) {
        console.error("Lỗi khi gọi sign in", error);
        return res.status(500).json({ mess: "Lỗi hệ thống" })
    }
}

// sign out 
export const signOut = async (req, res) => {
    try {
        // lấy rft từ cookie
        const token = req.cookies?.refreshToken;

        if (token) {
            // xóa rft trong session
            await Session.deleteOne({ refreshToken: token });

            //xóa cookie
            res.clearCookie("refreshToken");
        }

        return res.sendStatus(204);


    } catch (error) {
        console.error("Lỗi khi sign out", error);
        return res.status(500).json({ mess: "Lỗi hệ thống" });
    }
}