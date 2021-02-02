document.getElementById('form-login').onsubmit = async (e) => {
  e.preventDefault()

  console.log(e.target.querySelector('input').value)

  let inputs = Array.from(e.target.querySelectorAll('input'))
  inputs = inputs.map((elm) => {
    return elm.value
  })

  if (!validator.isEmail(inputs[0])) {
    return
  }
  const isSignIn = e.submitter.value === 'Sign in'
  await axios
    .post('http://localhost:3000/login', {
      email: inputs[0],
      password: inputs[1],
      isSignIn,
    })
    .then((res) => {
      if (res.data.accountExist) {
        location.href = 'http://localhost:3000/profile'
      }
    })
}
