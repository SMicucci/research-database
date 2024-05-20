const signupForm = () => {
  // get element and value
  const form = document.getElementById('signupForm')
  const name = form[0].value
  const email = form[1].value
  const password = form[2].value
  const re = /\S+@\S+\.\S+/
  // reset element error value
  for (let i = 0; i < form.length; i++)
    form[i].attributes.class.value = ''
  // check error
  const query = new URLSearchParams()
  if (name == '')
    form[0].attributes.class.value = 'error'
  else
    query.append('name', name)
  if (!re.test(email))
    form[1].attributes.class.value = 'error'
  else
    query.append('email', email)
  if (password == '')
    form[2].attributes.class.value = 'error'
  else
    query.append('password', password)
  // send query request
  fetch(window.location.href + '?' + query)
  .then( async (res) => {
    const json = await res.json()
    if (json.name)
      form[0].attributes.class.value = 'error'
    if (json.email)
      form[1].attributes.class.value = 'error'
    if (json.password)
      form[2].attributes.class.value = 'error'
  })
  .then(() => {
    for (let i=0; i < form.length; i++)
      if (form[i].attributes.class.value == 'error')
        return
    const body = new FormData(form)
    console.log(body)
    fetch(window.location.href, {
      method: 'post',
      body: body,
      redirect: 'follow'
    })
    .then((res) => {
      console.log(res)
      window.location.href = res.url
    })
  })
}
