const mongoose = require('../config/config')

const schemaCliente = new mongoose.Schema({
    documento: {
        type: String,
        require: [true, "El documento es obligatorio" ], //El valor que quiero que se cumpla, y lo que sale cuando no se cumple;
        minLength: [7, "El documento debe tener mínimo 7 números"],
        maxLength: [10, "El documento debe tener máximo 10 números"],
    },
    nombreCompeleto:{
        type: String,
        minLength: 3,
        maxLength: 150
    },
    FNacimiento: {
        type: Date,
        max: Date.now
    }

});

const Cliente = mongoose.model ('Cliente', schemaCliente);

module.exports = Cliente;