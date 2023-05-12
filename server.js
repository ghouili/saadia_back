const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const mime = require('mime');

const UserController = require('./Routes/user');
const EmplyeeController = require('./Routes/Employee');

const server = express();
const PORT = 5000;

server.use(bodyparser.json());
server.use(cors({
    origin: '*'
}));

server.use("/uploads/images", express.static(path.join("uploads", "images")));
// server.use("/uploads/PDF", express.static(path.join(__dirname, "uploads", "PDF")));


// // Middleware to set Content-Type header for PDF files
// server.use((req, res, next) => {
//     const filePath = path.join(__dirname, 'uploads', 'PDF', req.path);
//     const extname = path.extname(filePath);
//     if (extname === '.pdf') {
//       fs.stat(filePath, (err, stats) => {
//         if (err) {
//           return next(err);
//         }
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Length', stats.size);
//         next();
//       });
//     } else {
//       next();
//     }
//   });
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

server.use('/user', UserController);
server.use('/employee', EmplyeeController);

mongoose.connect('mongodb+srv://admin:admin@saadiapfe.lnffdtt.mongodb.net/?retryWrites=true&w=majority').then((result) => {
    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
        // console.log(result);
    });
}).catch((err) => {
    console.log(err);
});