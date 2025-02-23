const {Schema, model} = require('mongoose')

const UserSchema = new Schema ({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  role:  {type: String, default: 'user'},
  banned: {type: Boolean, default: false},
  isActivated: {type: Boolean, default: true}
})

module.exports = model('User', UserSchema)