const mongoose = require("mongoose");

const CheckStatu = mongoose.Schema({
    Host: {"type": String, "default": ""},
    HostName: {"type": String, "default": ""},
    Uptime: {"type": String, "default": ""},
    Latency: {"type": String, "default": ""},
    isOnline: {"type": Boolean, "default": true}
})

module.exports = mongoose.model("CheckStatu", CheckStatu);