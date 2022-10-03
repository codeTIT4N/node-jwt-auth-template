const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const authRoute = require('./routes/auth')
require('dotenv').config()

const port = process.env.PORT || 3000;

// middleware
app.use(express.json())

// Routes
app.use('/api/user', authRoute);

app.use(notFound)



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (err) {
        console.log(err);
    }
}

start()