const exp = require('express');
const app = exp();

require( 'dotenv' ).config();

const logger = require('morgan');
app.use(logger('dev'));

app.use(exp.urlencoded({extened: false}));
app.use(exp.json());

const modeloCliente = require('./backend/models/cliente.models')


app.get('/Cliente', async (req,res) => {
    let listaCliente = await modeloCliente.find();
    if(listaCliente)
        res.status(200).json(listaCliente);
    else
        res.status(404).json({error: "No se encontraron clientes"});
})

app.post('/Cliente', async (req, res) => {
     const nuevoCliente = new modeloCliente({
        documento: '439802223',
        nombreCompeleto: 'Rogelia Suarez',
        FNacimiento: '2001-10-13'
    });

    nuevoCliente.save()
    .then(Cliente => {
        console.log('Cliente creado:', Cliente);
    })
    .catch(err => {
        console.error('Error al crear cliente: ',err);
    }) 
        res.json("Registo existoso");

})

// exportacion y CRUD de modelo PRODUCTOS

const modeloProducto = require('./backend/models/productos.models')

app.get('/Productos', async (req,res) => {
    let listaProducto = await modeloProducto.find();
    if(listaProducto)
        res.status(200).json(listaProducto);
    else
        res.status(404).json({error: "No se encontraron productos"});
})

app.get('/Productos:ref', async (req,res) => {
    let productoEncontrado = await modeloProducto.findOne({referencia:req.params.ref});
    if(productoEncontrado)
        res.status(200).json(productoEncontrado);
    else
        res.status(404).json({error: "Producto no encontrado"});
})

// Cambiamos el número de puerto por la variable que creamos en el archivo de entorno con el puerto => process.env.PORT
app.listen(process.env.PORT, ( ) => {
    console.log("Servidor en línea")
});