const document = require('../Models/document');
const fs = require('fs');

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

    const { date,
        type,
        userid,
        employeeid } = req.body;

    let pdf = 'dec_acc.pdf';
    if (req.file) {
        console.log(req.file);
        pdf = req.file.filename;
    }

    const Newdocument = new document({
        date,
        pdf,
        type,
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
        let path = `./uploads/images/${existdocument.pdf}`;
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

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete