const express = require('express');
const router = express.Router();
//import express validator
const {body, validationResult } = require('express-validator');
//import database
const connection = require('../config/db');


router.get('/', function (req, res){
    connection.query('SELECT a.no_kk, c.nama_lengkap, a.status_hubungan_dalam_keluarga as status, d.nama_lengkap as ayah, e.nama_lengkap as ibu from  detail_kk a INNER JOIN kartu_keluarga b ON b.no_kk = a.no_kk INNER JOIN ktp c ON c.nik = a.nik INNER JOIN ktp d ON d.nik = a.ayah INNER JOIN ktp e ON e.nik = a.ibu ', function(err, rows){

        if(err){
            return res.status(500).json({
                status:false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data Detail KK',
                data: rows
            })
        }
    })
});

router.post('/insertdetail_kk', [
    //validation
    body('no_kk').notEmpty(),
    body('nik').notEmpty(),
    body('status_hubungan_dalam_keluarga').notEmpty(),
    body('ayah').notEmpty(),
    body('ibu').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        no_kk: req.body.no_kk,
        nik: req.body.nik,
        status_hubungan_dalam_keluarga: req.body.status_hubungan_dalam_keluarga,
        ayah: req.body.ayah,
        ibu: req.body.ibu
    }
    connection.query('insert into detail_kk set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success!',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function (req, res){
    let no_kk = req.params.id;
    connection.query(`SELECT a.no_kk, c.nama_lengkap, a.status_hubungan_dalam_keluarga as status, d.nama_lengkap as ayah, e.nama_lengkap as ibu
    from  detail_kk a
    INNER JOIN kartu_keluarga b ON b.no_kk = a.no_kk
    INNER JOIN ktp c ON c.nik = a.nik
    INNER JOIN ktp d ON d.nik = a.ayah
    INNER JOIN ktp e ON e.nik = a.ibu
    WHERE b.no_kk = ${no_kk}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Kartu keluarga',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id', [
    body('no_kk').notEmpty(),
    body('nik').notEmpty(),
    body('status_hubungan_dalam_keluarga').notEmpty(),
    body('ayah').notEmpty(),
    body('ibu').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let no_kk = req.params.id;
    let Data = {
        no_kk: req.body.no_kk,
        nik: req.body.nik,
        status_hubungan_dalam_keluarga: req.body.status_hubungan_dalam_keluarga,
        ayah: req.body.ayah,
        ibu: req.body.ibu
    }
    connection.query(`update detail_kk set ? where no_kk = ${no_kk}`, Data, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
})

router.delete('/delete/(:id)', function(req, res){
    let no_kk = req.params.id;
    connection.query(`delete from detail_kk where no_kk = ${no_kk}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been delete !',
            })
        }
    })
})

module.exports = router;