import mongoose from 'mongoose'
import config from './../config.js'
const connectionString = config.MONGODB_URL

const connectMongoDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada!')
    } catch (error) {
        console.log('Error al conectarse a la base de datos', error)
    }
}

export default connectMongoDB