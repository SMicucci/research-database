const delectAndRedirect = (currPath, nextPath) => {
  fetch(currPath, {method: 'delete'})
  .then(() => {window.location.href = nextPath})
  .catch( e => {console.log(e)})
}

const pathcAndRedirect = (currPath, nextPath) => {
  fetch(currPath, {method: 'patch'})
  .then(() => {window.location.href = nextPath})
  .catch( e => {console.log(e)})
}
