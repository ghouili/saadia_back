const express = require('express');
const EmployeeCNSSController = require('../Controllers/EmployeeCNSS');
const fileuploader = require('../MiddleWare/UploadFiles');
const path = require('path');

const route = express.Router();

route.get('/pdf/:doc', (req, res) => {
  console.log(req.params.doc);
  // const filePath = `./uploads/images/dec_acc.pdf`;
  const filePath = `./uploads/images/${req.params.doc}`;
  const absolutePath = path.resolve(filePath);
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(absolutePath);
});

route.get('/', EmployeeCNSSController.GetAll);

route.get('/:id', EmployeeCNSSController.FindById);

route.put('/:id',fileuploader.single('pdf'), EmployeeCNSSController.Update);

route.delete('/:id', EmployeeCNSSController.Delete);

route.post('/add', fileuploader.single('pdf'), EmployeeCNSSController.Add);

module.exports = route