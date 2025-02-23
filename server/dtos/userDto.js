module.exports = class UserDto {
  name;
  email;
  role;
  id;
  isActivated;
  banned;

  constructor(model){
    this.name = model.name;
    this.email = model.email;
    this.role = model.role;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.banned = model.banned;
  }
}