import  mongoose from 'mongoose'



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add an username'],
        unique: true,  
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        select: false 
    },
    key: {
        type: String,  
        required: [true, 'Please key a password'],
    },
    iv: {
        type: String,
        required: [true, 'Please iv a password'],
    },
    token: {
        type: String,
        select: false
    },
}, {
    timestamps: true 
});

  userSchema.index({ username: 1, createdAt: -1 }); 

export default  mongoose.model('users', userSchema)