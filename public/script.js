const delectAndRedirect = (currPath, nextPath) => {
  fetch(currPath, {method: 'delete'})
  .then(() => {window.location.href = nextPath})
  .catch( e => {console.log(e)})
}
