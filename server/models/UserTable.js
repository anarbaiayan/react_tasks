const {Schema, model} = require('mongoose')

const UserTableSchema = new Schema ({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true}
})

module.exports = model('UserTable', UserTableSchema)