const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    date_affect: { type: Number,  },
    service: { type: Number,  },
    nom: { type: String,  },
    prenom_pere: { type: String,  },
    prenom_grand_pere: { type: String,  },
    nom_mere: { type: String,  },
    prenom_mere: { type: String,  },
    nationalite: { type: Number,  },
    birth_date: { type: Number,  },
    birth_place: { type: Number,  },
    etat_civil: { type: Number,  },
    cin: { type: Number,  },
    cin_date: { type: String,  },
    birth_gouv: { type: String,  },
    birth_mun: { type: Number,  },
    arr: { type: String,  },
    arr_anne: { type: String,  },
    arr_num: { type: Number,  },
    adress: { type: String,  },
    adress_appt: { type: String,  },
    adress_imm: { type: String,  },
    adress_cite: { type: String,  },
    local: { type: String,  },
    code_postal: { type: Number,  },
    
    email: { type: String, unique: true, validate: validator.isEmail },
    tel: { type: Number,  },
    password: { type: String,  },
    avatar: { type: String, default: 'avatar.png' },
    role: { type: String,  },
});

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model('user', UserSchema);