const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username.required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email.required"],
      unique: true,
      lowercase : true,
      validate : [isEmail , 'email.invalid']
    },
    password: {
      type: String,
      required: [true, "password.required"],
      minLength: [8, "password.minlength"],
      selected : false
    },
    refresh_token : {
      type : String,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save' , async function(next)  {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password , salt)
        next()
    }
    catch (err) {
      throw err;
    }
})


userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email}); 

  if(user) {
    const pwisvalid = await bcrypt.compare(password , user.password)

    if(pwisvalid) {
      user.password = undefined; 
      return user
    }

    throw Error('errors.invalidCredentials')
  }

  throw Error('errors.invalidCredentials')
}

module.exports = mongoose.model('User', userSchema);
