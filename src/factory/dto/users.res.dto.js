export default class UserResDTO {
  constructor(user) {
    this.firstNameUser = user.first_name,
    this.lastNameUser = user.last_name,
    this.emailUser = user.email,
    this.ageUser = user.age,
    this.passwordUser = user.password,
    this.cartUser = user.cart,
    this.roleUser = user.role
  }
}