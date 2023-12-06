const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Database connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
    }

}
module.exports = connectDB