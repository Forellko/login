// не подключается валидатор
const start = async (e) => {
  await axios
    .post('http://localhost:3000/auth', {
      token: localStorage.getItem('token'),
    })
    .then((res) => {
      console.log(1)
      if (res.isAcess) {
        location.href = 'http://localhost:3000/profile'
      }
    })
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
      token: localStorage.getItem('token'),
    })
    .then((res) => {
      if (res.data.accountExist) {
        localStorage.setItem('token', res.data.token)
        location.href = 'http://localhost:3000/profile'
      }
    })
}
