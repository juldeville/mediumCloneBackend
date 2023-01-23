const mongoose = require('mongoose')

const connectionString = "mongodb+srv://raindear:2qduliiiuQSgzx!7@cluster0.eu0esgp.mongodb.net/mediumClone"

mongoose.connect(connectionString, {connectTimeoutMS: 2000})
.then(() => console.log('Database connected'))
.catch(error => console.error(error))