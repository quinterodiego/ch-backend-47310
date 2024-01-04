const form = document.getElementById('form')
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')
const boton = document.getElementById('boton')

form.onsubmit = (e) => {
  e.preventDefault()
  fetch('http://localhost:8080/current', {
    method: 'POST',
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPassword.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((resp) => {
    console.log(resp);
    localStorage.setItem('token', resp)
  })
}

boton.onclick = () => {
  fetch('http://localhost:8080/private', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => response.json())
  .then((resp) => {
    console.log('resp', resp);
  })
}