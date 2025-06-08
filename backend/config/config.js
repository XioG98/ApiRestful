//Conexion con la base de datos
const mongoose = require('mongoose');

const URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS}@cluster0.2voyn.mongodb.net/${process.env.DB_NAME}`
mongoose.connect(URI);

module.exports = mongoose;
