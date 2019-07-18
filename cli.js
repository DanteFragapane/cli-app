// Ipmorts and variables
const tvMazeUri = 'http://api.tvmaze.com'
const axios = require('axios')
const fs = require('fs')
const logFile = './log.txt'

// Parsing arguments from CLI
const args = process.argv.slice(2)
const action = args.slice(0, 1)
const query = args.slice(1).join(' ')

// Logging function
const log = function (message) {
  const logMess = message.slice(0, 1) + ', ' + message.slice(1).join(' ')
  if (fs.existsSync(logFile)) {
    fs.appendFile(logFile, `\n${logMess}`, (err) => {
      if (err) console.error(err)
    })
  } else {
    fs.writeFile(logFile, logMess, (err) => {
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
    })
      .then((response) => {
        const data = response.data
        console.log(`\nShow: ${data.name}`)
        console.log(`\nGenres: ${data.genres.join(', ')}`)
        console.log(`\nNetwork: ${data.network.name}`)
        console.log(`\nSummary: ${data.summary}`)
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log('Show not found!!')
        } else {
          console.error(err)
        }
      })
  },

  // Actor action
  actor: function (query) {
    axios({
      method: 'GET',
      url: `${tvMazeUri}/search/people`,
      params: { q: query }
    })
      .then((response) => {
        if (response.data[0] !== undefined) {
          const data = response.data[0].person
          console.log(`\nName: ${data.name}`)
          console.log(`\nBirthday: ${data.birthday}`)
        } else {
          console.log('Actor not found!!')
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 404) {
          console.log('Actor not found!!')
        } else {
          console.error(err)
        }
      })
  }
}

log(args)
const actionFunc = actions[action]
if (actionFunc !== undefined) {
  actionFunc(query)
} else {
  console.log('Proper call of this script is "{action} {query}"')
}
