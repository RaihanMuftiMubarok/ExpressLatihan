const express = require('express')//membuat variable baru dengan nama express 
const app = express()//membuat variable baru dengan nama app yang isisnya variable express
const port = 3000 // membuat variable dengan nama port yang isinya 3000 

const bodyPS = require('body-parser');
app.use(bodyPS.urlencoded({ extended: false}));
app.use(bodyPS.json());

const kkRouter = require('./routes/kartu_keluarga'); //routes tabel kartu_keluarga
app.use('/api/kk', kkRouter);

const ktpRouter = require('./routes/ktp'); //routes tabel ktp
app.use('/api/ktp', ktpRouter);

const detail_kkRouter = require('./routes/detail_kk'); //routes tabel detail_kk
app.use('/api/detail_kk', detail_kkRouter);

//kita listen Express.js ke dalam port yang  kita buat diatas
app.listen(port, () => {
    //dan kita tampilkan log sebagai penanda bahwa Express.js berhasil dijalankan
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})