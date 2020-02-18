// import Axios from 'axios'

/**
 * DOM Selectors
 */
const nodes = {
  deleteArticlesBtn: document.querySelector('[delete-article]')
}

/**
 * Click event listeners
 */
function setClickEvents() {
  if (nodes.deleteArticlesBtn) {
    nodes.deleteArticlesBtn.addEventListener( 'click', ( e ) => {
      let articleId = e.target.getAttribute('delete-article')
      let url = `/article/${articleId}`

      deleteArticle(url)
    })
  }
}

/**
 * Delete single article
 * @param {url to post request to} url
 */
function deleteArticle (url) {
  // Axios.delete(url)
  //   .then( response => {
  //     console.log(response)
  //   })
  //   .catch( (err) => {
  //     console.log(err)
  //   })
  //   .finally( () => {
  //     window.location.href = '/'
  //   })
  let xhr = new XMLHttpRequest()

  xhr.open('DELETE', url)
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.responseText === 'success') {
      window.location.href = '/'
    }
    else if (xhr.status !== 200) {
      console.log('Request failed.  Returned status of ' + xhr.status)
    }
  }
  xhr.send()
}

/**
 * Initialise the script
 */
function init() {
  setClickEvents()
}

/**
 * Wait for the DOM to be ready
 */
document.addEventListener('DOMContentLoaded', () => {
  init()
})