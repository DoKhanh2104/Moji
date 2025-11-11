import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        require: true,
        trim: true
    },
    avatarUrl: {
        type: String,
    },
    avatarId: {
        type: String,
    },
    bio: {
        type: String,
        maxlenght: 500
    },
    phone: {
        type: String,
        sparse: true, // cho phep null nhung ko trung
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema)
export default User