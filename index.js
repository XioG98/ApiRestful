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

app.get('/Cliente/:doc', async (req,res) => {
    let listaCliente = await modeloCliente.findOne({documento:req.params.doc});
    if(listaCliente)
        res.status(200).json(listaCliente);
    else
        res.status(404).json({error: "No se encontraron clientes"});
})

app.post('/Cliente', async (req, res) => {
     const nuevoCliente = new modeloCliente({
        documento: req.body.documento,
        nombreCompeleto: req.body.nombreCompeleto,
        FNacimiento: req.body.FNacimiento
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

app.put('/Cliente/:doc', async (req,res) => {
    const clienteEditado = {
        documento: req.params.doc,
        nombreCompeleto: req.body.nombreCompeleto,
        FNacimiento: req.body.FNacimiento,
    }

    let Actualizacion = await modeloCliente.findOneAndUpdate({documento:req.params.doc},clienteEditado);
    if(Actualizacion)
        res.status(200).json({"mensaje":"actualización exitosa"})
    else
        res.status(404).json({"mensaje":"Se presentó un error"})

})

app.delete('/clientes/:id', async (req,res) => {
    console.log(req.params.id , req.body.documentoCliente)
    let eliminacion = await modeloCliente.findOneAndDelete({_id:req.params.id});
    if(eliminacion)
        res.status(200).json({"mensaje": "eliminacion exitosa"})
    else
        res.status(400).json({"mensaje":"Se presentó un error"})
})

// exportacion y CRUD de modelo PRODUCTOS

const modeloProducto = require('./backend/models/productos.models')
//todos los productos
app.get('/Productos', async (req,res) => {
    let listaProducto = await modeloProducto.find();
    if(listaProducto)
        res.status(200).json(listaProducto);
    else
        res.status(404).json({error: "No se encontraron productos"});
})
//Un producto, buscado por referencia
app.get('/Producto/:ref', async (req,res) => {
    let productoEncontrado = await modeloProducto.findOne({referencia:req.params.ref});
    if(productoEncontrado)
        res.status(200).json(productoEncontrado);
    else
        res.status(404).json({error: "Producto no encontrado"});
})

app.post('/Producto', async (req, res) => {
     const nuevoProducto = new modeloProducto({
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion, 
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: req.body.imagen,
        habilitado: req.body.habilitado,
    });

    nuevoProducto.save()
    .then(Producto => {
        console.log('Producto creado:', Producto);
    })
    .catch(err => {
        console.error('Error al crear producto: ',err);
    }) 
        res.json("Registo existoso");
})

app.put('/Producto/:ref', async (req,res) => {
    const productoEditado = {
        referencia: req.params.ref,
        nombre: req.body.name, 
        descripcion: req.body.descrp, 
        precio: req.body.price, 
        stock: req.body.stock,
        imagen: req.body.img, 
        habilitado: req.body.habilitado,
    }

    let Actualizacion = await modeloProducto.findOneAndUpdate({referencia:req.params.ref},productoEditado);
    if(Actualizacion)
        res.status(200).json({"mensaje":"actualización exitosa"})
    else
        res.status(404).json({"mensaje":"Se presentó un error"})

})

app.delete('/producto/:ref', async (req,res) => {
    console.log(req.params.ref , req.body.referenciaProducto)
    let eliminacion = await modeloProducto.findOneAndDelete({referencia:req.params.ref});
    if(eliminacion)
        res.status(200).json({"mensaje": "eliminacion exitosa"})
    else
        res.status(400).json({"mensaje":"Se presentó un error"})
})

// Cambiamos el número de puerto por la variable que creamos en el archivo de entorno con el puerto => process.env.PORT
app.listen(process.env.PORT, ( ) => {
    console.log("Servidor en línea")
});