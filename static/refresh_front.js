const verifyConnect = async () => {
  await axios
    .post('http://localhost:3000/auth', {
      token: localStorage.getItem('token'),
    })
    .then((res) => {})
    .catch((err) => {
      axios
        .post('http://localhost:3000/verify', {
          refreshToken: localStorage.getItem('refreshToken'),
        })
        .then((res) => {
          if (res.data.isAccess) {
            console.log('Access token: ', res.data.accessToken)
            console.log('Refresh token: ', res.data.refreshToken)
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
          } else {
            location.href = 'http://localhost:3000/login'
          }
        })
        .catch((err) => {
          location.href = 'http://localhost:3000/login'
          console.log(err.message)
        })
      console.log(err.message, 1)
    })
}

verifyConnect()
