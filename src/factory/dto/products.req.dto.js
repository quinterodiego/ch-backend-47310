export default class UserReqDTO {
  constructor(user) {
    this.first_name = user.firstNameUser,
    this.last_name = user.lastNameUser,
    this.email = user.emailUser,
    this.age = user.ageUser,
    this.password = user.passwordUser,
    this.cart = user.cartUser,
    this.role = user.roleUser
  }
}