import mongoose from "mongoose"

const connectDb = (handler) =>  async (req, res) => {
    if (mongoose.connections[0].readyState){
        return handler(req, res)
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
        console.info(`Database connected : ${process.env.MONGO_URI}`);
        return handler(req, res)
    } catch (error) {
        console.error(`Cannot connect database : ${process.env.MONGO_URI}`);
        return res.status(500).json({message: "Cannot connect database"});
    }
}

export default connectDb