const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const mime = require('mime');

const UserRouter = require('./Routes/user');
const EmplyeeRouter = require('./Routes/Employee');
const EmployeeCNSSRouter = require('./Routes/EmployeeCNSS');

const server = express();
const PORT = 5000;

server.use(bodyparser.json());
server.use(cors({
    origin: '*'
}));

server.use("/uploads/images", express.static(path.join("uploads", "images")));
// server.use("/uploads/PDF", express.static(path.join(__dirname, "uploads", "PDF")));

// Serve PDF files with the correct MIME type

server.use('/uploads/pdf', (req, res, next) => {
    const filePath = path.join(__dirname, 'uploads', 'pdf', req.path);
    const mimeType = mime.getType(filePath);
    res.setHeader('Content-Type', mimeType);
    next();
}, express.static(path.join(__dirname, 'uploads', 'pdf')));

server.get('/', (req, res) => {
    res.send("Hello Farfour!");
});

server.use('/user', UserRouter);
server.use('/employee', EmplyeeRouter);
server.use('/emp_cnss', EmployeeCNSSRouter);

mongoose.connect('mongodb+srv://admin:admin@saadiapfe.lnffdtt.mongodb.net/?retryWrites=true&w=majority').then((result) => {
    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
        // console.log(result);
    });
}).catch((err) => {
    console.log(err);
});