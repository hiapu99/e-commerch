const mongoose = require('mongoose')

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGOSB_URI);
        console.log("Database is successfully connected sir")
    } catch (error) {
        console.log("Database is connection faild", error)
    }
}
module.exports = database