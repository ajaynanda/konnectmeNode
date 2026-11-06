const dns = require('dns');
// Set DNS servers to Google and Cloudflare to resolve SRV records if local DNS blocks them
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose')
require("dotenv").config()
const connectdb = mongoose.connect(process.env.URL, ((err) => {
    if (err) throw err
    else {
        console.log("Mongodb connected");
    }
}))
module.exports = connectdb