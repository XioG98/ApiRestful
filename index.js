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

// Cambiamos el número de puerto por la variable que creamos en el archivo de entorno con el puerto => process.env.PORT
app.listen(process.env.PORT, ( ) => {
    console.log("Servidor en línea")
});