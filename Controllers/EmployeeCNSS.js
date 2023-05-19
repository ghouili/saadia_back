const employeecnss = require('../Models/employeecnss');
const fs = require('fs');

const GetAll = async (req, res) => {

    let existemployeecnsss
    try {
        existemployeecnsss = await employeecnss.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existemployeecnsss });

}

const Add = async (req, res) => {

    const { date,
        userid,
        employeeid } = req.body;

    let pdf = 'dec_acc.pdf';
    if (req.file) {
        console.log(req.file);
        pdf = req.file.filename;
    }

    const Newemployeecnss = new employeecnss({
        date,
        pdf,
        userid,
        employeeid
    });

    try {
        await Newemployeecnss.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    return res.status(201).json({ success: true, message: 'success', data: Newemployeecnss });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existemployeecnss
    try {
        existemployeecnss = await employeecnss.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existemployeecnss) {
        return res.status(200).json({ success: false, messgae: 'employeecnss doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existemployeecnss });

}

const Update = async (req, res) => {

    const { date,
        userid,
        employeeid } = req.body;
    const { id } = req.params;

    // console.log(req.body);

    let existemployeecnss
    try {
        existemployeecnss = await employeecnss.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existemployeecnss) {
        return res.status(200).json({ success: false, messgae: 'employeecnss doesnt exist!!', error: false });
    }


    if (req.file) {
        let path = `./uploads/images/${existemployeecnss.pdf}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
        existemployeecnss.pdf = req.file.filename;
    }

    existemployeecnss.date = date;
    existemployeecnss.userid = userid;
    existemployeecnss.employeeid = employeeid;

    try {
        await existemployeecnss.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existemployeecnss });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existemployeecnss
    try {
        existemployeecnss = await employeecnss.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existemployeecnss) {
        return res.status(200).json({ success: false, messge: 'employeecnss doesnt exist!!', error: false });
    }

    if (req.file) {
        let path = `./uploads/images/${existemployeecnss.pdf}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
    }

    try {
        await existemployeecnss.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'employeecnss Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete