import  mongoose from 'mongoose'



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'name is required ']
    },
    fullName:{
        type:String,
        require:[true,'name is required ']
    },
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
        required: [true, 'Please add a key'],
    },
    iv: {
        type: String,
        required: [true, 'Please add a iv'],
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