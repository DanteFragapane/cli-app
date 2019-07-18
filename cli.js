const tvMazeUri = 'http://api.tvmaze.com'
const axios = require('axios')
const fs = require('fs')
const logFile = './log.txt'

const action = process.argv.slice(2, 3)
const query = process.argv.slice(3).join(' ')

const log = function (message) {
  if (fs.existsSync(logFile)) {
    fs.appendFile(logFile, `\n${message}`, (err) => {
      if (err) console.log(err)
    })
  } else {
    fs.writeFile(logFile, message, (err) => {
      if (err) console.error(err)
    })
  }
}

const actions = {
  show: function (query) {},
  actor: function (query) {
    axios({
      method: 'GET',
      url: tvMazeUri + '/search/people',
      params: { q: query }
    }).then((response) => {
      console.log(response.data[0])
    })
  }
}

actions[action](query)
