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
  const body = new URLSearchParams( new FormData(form))
  console.log(body)
  fetch(url, {
    headers: { 'Content-Type':'application/x-www-form-urlencoded'},
    method: method,
    body: body,
  })
  .then((res) => {
    console.log("response:",res.status,res.statusText)
    return res.text()
  })
  .then((text) => {
    let html = document.querySelector('html')
    html.innerHTML = text
  })
}
