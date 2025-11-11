import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log('Liên kết với DB thành công')

    } catch (error) {
        console.error('Liên kết với DB thất bại', error.message);
        process.exit(1);
    }
}