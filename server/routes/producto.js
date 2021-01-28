const express = require('express')
const {verificaToken} = require('../middlewares/autenticacion')
let app = express();
let Producto = require('../models/producto')

//buscar producto
app.get('/producto',verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regexp = new RegExp(termino, 'i');
    Producto.find({nombre : regexp})
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            });
        });
});


//obtener productos
app.get('/producto',verificaToken, (req, res) => {
    Producto.find({disponible: true})
    .sort('nombre')
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            productos
        });
    });
})

//obtener productos por id
app.get('/producto/:id',verificaToken, (req, res) => {
    let id = req.params.id;
   Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el id no es correcto'
                }
            });
        }
        res.json ({
            ok: true,
            producto: productoDB
        });
    })   
});

//crear productos 
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        usuario: req.usuario._id,
        precioUni: body.precioUni,
        descripcion : body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        })
    })
})

//actualizar productos 
app.put('/producto/:id',verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion : body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria

    };

    Producto.findByIdAndUpdate(id, descProducto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });

    });
})

//eliminar productos 
app.delete('/producto/:id',verificaToken, (req, res) => {
    //solo un administrador puede borrar categorias
    let id = req.params.id;
    Producto.findById( id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el id no existe'
                }
            });
        }
        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'producto borrado'
            })
        })


    })
})

module.exports = app;