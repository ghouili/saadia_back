const express = require('express');
const documentController = require('../Controllers/document');
const fileuploader = require('../MiddleWare/UploadFiles');
const path = require('path');
const puppeteer = require('puppeteer');

const route = express.Router();

route.get('/show/:doc', (req, res) => {
  console.log(req.params.doc);
  // const filePath = `./uploads/images/dec_acc.pdf`;
  const filePath = `./uploads/files/${req.params.doc}`;
  const absolutePath = path.resolve(filePath);
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(absolutePath);
});


route.post('/generate-pdf', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(req.body.htmlContent);

    const pdfOptions = {
      format: 'A4',
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();

    // Save the PDF file on the server
    const filePath = '../uploads/images';
    require('fs').writeFileSync(filePath, pdfBuffer);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.sendStatus(500);
  }
});

route.get('/pdf/:idAdmin/:idEmp/:doc', documentController.generatePDF);

route.get('/', documentController.GetAll);

route.get('/:id', documentController.FindById);

route.put('/:id',fileuploader.single('pdf'), documentController.Update);

route.delete('/:id', documentController.Delete);

route.post('/add', fileuploader.single('pdf'), documentController.Add);


module.exports = route