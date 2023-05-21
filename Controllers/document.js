const document = require('../Models/document');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const moment = require('moment');
const user = require('../Models/user');
const Employee = require('../Models/Employee');

const GetAll = async (req, res) => {

    let existdocuments
    try {
        existdocuments = await document.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existdocuments });

}

const Add = async (req, res) => {

    const { 
        type,
        userid,
        employeeid } = req.body;

    let pdf = 'dec_acc.pdf';
    if (req.file) {
        console.log(req.file);
        pdf = req.file.filename;
    }
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    let date = `${day}-${month}-${year}--${hours}:${minutes}`; 

    const Newdocument = new document({
        date,
        pdf,
        type: type.replace(/_/g, ' '),
        userid,
        employeeid
    });

    try {
        await Newdocument.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    return res.status(201).json({ success: true, message: 'success', data: Newdocument });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existdocument
    try {
        existdocument = await document.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existdocument) {
        return res.status(200).json({ success: false, messgae: 'document doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existdocument });

}

const Update = async (req, res) => {

    const { date,
        userid,
        employeeid } = req.body;
    const { id } = req.params;

    // console.log(req.body);

    let existdocument
    try {
        existdocument = await document.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existdocument) {
        return res.status(200).json({ success: false, messgae: 'document doesnt exist!!', error: false });
    }


    if (req.file) {
        let path = `./uploads/images/${existdocument.pdf}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
        existdocument.pdf = req.file.filename;
    }

    existdocument.date = date;
    existdocument.userid = userid;
    existdocument.employeeid = employeeid;

    try {
        await existdocument.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existdocument });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existdocument
    try {
        existdocument = await document.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existdocument) {
        return res.status(200).json({ success: false, messge: 'document doesnt exist!!', error: false });
    }

    if (req.file) {
        let path = `./uploads/files/${existdocument.pdf}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
    }

    try {
        await existdocument.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'document Deleted Successfully' });

}

const generatePDF = async (req, res) => {
    const { idEmp, idAdmin, doc } = req.params;
    let admin
    try {
        admin = await user.findById(idAdmin);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!admin) {
        return res.status(200).json({ success: false, messgae: 'user doesnt exist!!', error: false });
    }
    
    let employee
    try {
        employee = await Employee.findById(idEmp);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!employee) {
        return res.status(200).json({ success: false, messgae: 'user doesnt exist!!', error: false });
    }
    
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    let date = `${day}_${month}_${year}__${hours}_${minutes}`; 
    let type = doc.replace(/_/g, ' ');
    let fileName = `${doc}_${employee.prenom_E}_${date}.pdf`;
    const Newdocument = new document({
        date,
        pdf: fileName,
        type,
        userid: idAdmin,
        employeeid: idEmp
    });

    try {
        await Newdocument.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    let temp;
    if (doc === 'declaration_cnss'){
        temp = 'DeclarationEmployeeCNSS.ejs';
    } else if (doc === 'civp') {
        temp = 'civp.ejs';
    } else if (doc === 'stagaire_cnss') {
        temp = 'stagaire_cnss.ejs';
    }

    ejs.renderFile(
        path.join(__dirname, "../templates", temp ),
        {
            user: admin, data: employee, date:  moment().subtract(10, 'days').calendar()
        },
        (err, data) => {
            if( err) {
                return console.log(err);
            }

            let options = {
                height: "11.25in",
                width: "8.5in",
                header: {
                    height: "10mm"
                },
                footer: {
                    height: "10mm"
                }
            };

            pdf.create(data, options).toFile(`./uploads/files/${fileName}`, (err, data) => {
                if( err) {
                    return console.log(err);
                }

                console.log("done")
            })
        }
    )
    
    return res.status(201).json({ success: true, message: 'success', data: Newdocument });
}

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete


exports.generatePDF = generatePDF