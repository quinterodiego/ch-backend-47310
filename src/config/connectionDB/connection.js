import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_URL

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