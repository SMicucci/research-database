const deleteAndRedirect = (currPath, nextPath) => {
  fetch(currPath, {method: 'delete'})
  .then(() => {window.location.href = nextPath})
  .catch( e => {console.log(e)})
}

const formFunction = () => {
  const form = document.forms["editForm"]
  let url
  let method
  if (window.location.pathname === "/research/new") {
    url = window.location.href
    method = "POST"
  } else {
    url = window.location.href//.replace("edit?", "")
    method = "PATCH"
  }
  const body = new FormData(form)
  console.log(body)
  fetch(url, {
    headers: { 'Content-Type':'multipart/form-data' },
    method: method,
    body: body,
  })
}
