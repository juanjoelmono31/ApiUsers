import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    celular:{
        type: Number,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        required: true
    },
    roles:[{
        ref: 'Role',
        type: Schema.Types.ObjectId
        
    }]
},{
    versionKey: false,
    timestamps: true
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword)
}

export default model('Users',userSchema)