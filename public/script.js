const deleteAndRedirect = (currPath, nextPath) => {
  fetch(currPath, {method: 'delete'})
  .then(() => {window.location.href = nextPath})
  .catch( e => {console.log(e)})
}

const queryForm = () => {
  const form = document.getElementById('newForm')
  const name= form[0].value
  const pmid= form[1].value
  const doi = form[2].value
  const pdf = form[3].value
  for (let i = 0; i < form.length; i++)
    form[i].attributes.class.value = ''
  // check error
  const query = new URLSearchParams()
  if (name == '')
    form[0].attributes.class.value = 'error'
  else
    query.append('name', name)
  if (pmid == '' || isNaN(pmid))
    form[1].attributes.class.value = 'error'
  else
    query.append('pmid', pmid)
  if (doi == '')
    form[2].attributes.class.value = 'error'
  else
    query.append('doi', doi)
  if (pdf == '')
    form[3].attributes.class.value = 'error'
  // query request
  fetch(window.location.href + '?' + query)
  .then(async (res) => {
    const json = await res.json()
    if (json.name)
      form[0].attributes.class.value = 'error'
    if (json.pmid)
      form[1].attributes.class.value = 'error'
    if (json.doi)
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
      redirect: 'follow',
    })
    .then((res) => {
      console.log(res)
      window.location.href = res.url
    })
  })
}
