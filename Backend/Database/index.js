const mongoose = require('mongoose');
const {MONGODB_CONNECTION_STRING} = require('../config');
// const connectionString = "mongodb+srv://ubaidismail:invoicesystem@cluster0.z7tzjo7.mongodb.net/invoicing_system_ct";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`database connect to hose: ${conn.connection.host}` );
    } catch (error) {
        console.log(`Error:${error}`);
    }
}
module.exports = dbConnect;