const mongoose = require('../config/config')

const schemaProducto = new mongoose.Schema({
    referencia: {
        type: String,
        required: [true, 'La referencia es obligatoria']
    },
    nombre: {
        type: String,
        required: [true, 'Asignar un nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    precio: {
        type: Number,
        defaul: [0, 'El precio por defecto es cero'],
        min: [0, 'El precio mínimo es cero'],
    },
    stock: {
        type: Number,
        defaul: [0, 'El stock por defecto es cero'],
        min: [0, 'El stock mínimo es cero'],
    },
    imagen: {
        type: String,
        required: [true, 'No existe la imagen o ruta a la imagen por defecto']
    },
    habilitado: {
        type: Boolean,
        default: true
    },
});

const producto = mongoose.model ('producto', schemaProducto);

module.exports = producto;