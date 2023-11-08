export const productValidator = (req, res, next) => {
  if(
    !req.body.title ||
    !req.body.description ||
    !req.body.price ||
    !req.body.code ||
    !req.body.stock ||
    !req.body.category) {
    res.status(404).json({ message: 'Debe ingresar todos los campos'})
  } else {
    next()
  }
}