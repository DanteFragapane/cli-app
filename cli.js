// Ipmorts and variables
const tvMazeUri = 'http://api.tvmaze.com'
const axios = require('axios')
const fs = require('fs')
const logFile = './log.txt'

// Parsing arguments from CLI
const arguments = process.argv.slice(2)
const action = arguments.slice(0, 1)
const query = arguments.slice(1).join(' ')

// Logging function
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

// All the actions the user can make and associated logic
const actions = {
  // Show action
  show: function (query) {
    axios({
      method: 'GET',
      url: `${tvMazeUri}/singlesearch/shows`,
      params: { q: query }
    }).then((response) => {
      console.log(response.data)
    })
  },

  // Actor action
  actor: function (query) {
    axios({
      method: 'GET',
      url: `${tvMazeUri}/search/shows`,
      params: { q: query }
    }).then((response) => {
      console.log(response.data)
    })
  }
}

log(arguments)
actions[action](query)
