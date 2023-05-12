

const express = require('express');
const employeeController = require('../Controllers/Employee');
// const employee = require('../Models/Employee');

const route = express.Router();

route.get('/', employeeController.GetAll);

route.get('/:id', employeeController.FindById);

route.put('/:id', employeeController.Update);

route.delete('/:id', employeeController.Delete);

route.post('/add', employeeController.Add);

module.exports = route