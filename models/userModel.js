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
    createtime: {
        type: Date,
        default: Date.now 
    }
}, {
    timestamps: true 
});

userSchema.pre('save', function(next) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const date = dd + '/' + mm + '/' + yyyy;
    this.createtime = date
    next();
  });

  userSchema.index({ username: 1, createtime: -1 }); 

export default  mongoose.model('users', userSchema)