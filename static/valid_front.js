// не подключается валидатор
const start = async (e) => {
  await axios
    .post('http://localhost:3000/auth', {
      token: localStorage.getItem('token'),
    })
    .then((res) => {
      if (res.data.isAccess) {
        location.href = 'http://localhost:3000/profile'
      }
    })
    .catch((err) => console.log(err.message))
}

start()

document.getElementById('form-login').onsubmit = async (e) => {
  e.preventDefault()

  let inputs = Array.from(e.target.querySelectorAll('input'))
  inputs = inputs.map((elm) => {
    return elm.value
  })

  // if (!validator.isEmail(inputs[0])) {
  //   return
  // }
  const isSignIn = e.submitter.value === 'Sign in'
  await axios
    .post('http://localhost:3000/login', {
      email: inputs[0],
      password: inputs[1],
      isSignIn,
    })
    .then((res) => {
      if (res.data.accountExist) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        location.href = 'http://localhost:3000/profile'
      }
    })
}
