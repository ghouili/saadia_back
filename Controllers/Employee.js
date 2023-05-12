const bcrypt = require('bcryptjs');
const employee = require('../Models/Employee');
const fs = require('fs');
const generator = require('generate-password');


const GetAll = async (req, res) => {

    let existemployees
    try {
        existemployees = await employee.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existemployees });

}

const Add = async (req, res) => {

    console.log(req.body);
    const {
        nom_F,
        nom_M,
        prenom_E,
        prenom_p,
        prenom_gp,
        prenom_m,
        sexe,
        nationalite,
        date_naiss,
        lieu_naiss,
        etat_civil,
        cin,
        nationale,
        type,
        acte_naiss,
        municipalite,
        arrond,
        annee,
        num,
        adr,
        appt_num,
        imm_num,
        cite,
        localite,
        c_p,
        fax,
        identif,
        id_cnss,
        niveau,
        diplome,
        specialite,
        date,
        rip,
        compte_courrent,
        plan,
        stage,
        periode_contrat,
        compte,
        gouvernorat,
        mat,
        num_acte,
        date_delivre,
        qualite,
        pays,
        envoi_objet,
        type_envoi,
        envoi_numero,
        position_acc,
        nature_acc,
        lieu,
        heure,
        date_arret_travail,
        periode,
        date_rec,
        etat,
        etat_normal,
        residence,
        effet_acc,
        date_acc,
        date_emploi,
        activite,
        num_employees,
        description,
        causes,
        acc,
    } = req.body;



    let existemployee
    try {
        existemployee = await employee.findOne({ cin: cin });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (existemployee) {
        return res.status(200).json({ success: false, message: 'employee Already exist!!', error: false });
    }


    const Newemployee = new employee({
        nom_F,
        nom_M,
        prenom_E,
        prenom_p,
        prenom_gp,
        prenom_m,
        sexe,
        nationalite,
        date_naiss,
        lieu_naiss,
        etat_civil,
        cin,
        nationale,
        type,
        acte_naiss,
        municipalite,
        arrond,
        annee,
        num,
        adr,
        appt_num,
        imm_num,
        cite,
        localite,
        c_p,
        fax,
        identif,
        id_cnss,
        niveau,
        diplome,
        specialite,
        date,
        rip,
        compte_courrent,
        plan,
        stage,
        periode_contrat,
        compte,
        gouvernorat,
        mat,
        num_acte,
        date_delivre,
        qualite,
        pays,
        envoi_objet,
        type_envoi,
        envoi_numero,
        nature_acc,
        lieu,
        heure,
        date_arret_travail,
        periode,
        date_rec,
        etat,
        etat_normal,
        residence,
        effet_acc,
        date_acc,
        date_emploi,
        activite,
        num_employees,
        description,
        causes,
        acc,
        position_acc,
    });

    try {
        await Newemployee.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    return res.status(201).json({ success: true, message: 'success', data: Newemployee });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existemployee
    try {
        existemployee = await employee.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existemployee) {
        return res.status(200).json({ success: false, messgae: 'employee doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existemployee });

}

const Update = async (req, res) => {

    const {
        nom_F,
        nom_M,
        prenom_E,
        prenom_p,
        prenom_gp,
        prenom_m,
        sexe,
        nationalite,
        date_naiss,
        lieu_naiss,
        etat_civil,
        cin,
        nationale,
        type,
        acte_naiss,
        municipalite,
        arrond,
        annee,
        num,
        adr,
        appt_num,
        imm_num,
        cite,
        localite,
        c_p,
        fax,
        identif,
        id_cnss,
        niveau,
        diplome,
        specialite,
        date,
        rip,
        compte_courrent,
        plan,
        stage,
        periode_contrat,
        compte,
        gouvernorat,
        mat,
        num_acte,
        date_delivre,
        qualite,
        pays,
        envoi_objet,
        type_envoi,
        envoi_numero,
        position_acc,
        nature_acc,
        lieu,
        heure,
        date_arret_travail,
        periode,
        date_rec,
        etat,
        etat_normal,
        residence,
        effet_acc,
        date_acc,
        date_emploi,
        activite,
        num_employees,
        description,
        causes,
        acc,
    } = req.body;
    const { id } = req.params;

    // console.log(req.body);

    let existemployee
    try {
        existemployee = await employee.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existemployee) {
        return res.status(200).json({ success: false, messgae: 'employee doesnt exist!!', error: false });
    }

    existemployee.nom_F = nom_F;
    existemployee.nom_M = nom_M;
    existemployee.prenom_E = prenom_E;
    existemployee.prenom_p = prenom_p;
    existemployee.prenom_gp = prenom_gp;
    existemployee.prenom_m = prenom_m;
    existemployee.sexe = sexe;
    existemployee.nationalite = nationalite;
    existemployee.date_naiss = date_naiss;
    existemployee.lieu_naiss = lieu_naiss;
    existemployee.etat_civil = etat_civil;
    existemployee.cin = cin;
    existemployee.nationale = nationale;
    existemployee.type = type;
    existemployee.acte_naiss = acte_naiss;
    existemployee.municipalite = municipalite;
    existemployee.arrond = arrond;
    existemployee.annee = annee;
    existemployee.num = num;
    existemployee.adr = adr;
    existemployee.appt_num = appt_num;
    existemployee.imm_num = imm_num;
    existemployee.cite = cite;
    existemployee.localite = localite;
    existemployee.c_p = c_p;
    existemployee.fax = fax;
    existemployee.identif = identif;
    existemployee.id_cnss = id_cnss;
    existemployee.niveau = niveau;
    existemployee.diplome = diplome;
    existemployee.specialite = specialite;
    existemployee.date = date;
    existemployee.rip = rip;
    existemployee.compte_courrent = compte_courrent;
    existemployee.plan = plan;
    existemployee.stage = stage;
    existemployee.periode_contrat = periode_contrat;
    existemployee.compte = compte;
    existemployee.gouvernorat = gouvernorat;
    existemployee.mat = mat;
    existemployee.num_acte = num_acte;
    existemployee.date_delivre = date_delivre;
    existemployee.qualite = qualite;
    existemployee.pays = pays;
    existemployee.envoi_objet = envoi_objet;
    existemployee.type_envoi = type_envoi;
    existemployee.envoi_numero;
    existemployee.position_acc = position_acc;
    existemployee.nature_acc = nature_acc;
    existemployee.lieu = lieu;
    existemployee.heure = heure;
    existemployee.date_arret_travail = date_arret_travail;
    existemployee.periode = periode;
    existemployee.date_rec = date_rec;
    existemployee.etat = etat;
    existemployee.etat_normal = etat_normal;
    existemployee.residence = residence;
    existemployee.effet_acc = effet_acc;
    existemployee.date_acc = date_acc;
    existemployee.date_emploi = date_emploi;
    existemployee.activite = activite;
    existemployee.num_employees = num_employees;
    existemployee.description = description;
    existemployee.causes = causes;
    existemployee.acc = acc;



    try {
        await existemployee.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existemployee });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existemployee
    try {
        existemployee = await employee.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existemployee) {
        return res.status(200).json({ success: false, messge: 'employee doesnt exist!!', error: false });
    }

    try {
        await existemployee.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'employee Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete