const tvMazeUri = 'http://api.tvmaze.com'

const action = process.argv.slice(2, 3)
const query = process.argv.slice(3).join(' ')

const actions = {
  show: function (query) {},
  actor: function (query) {}
}

actions[action](query)
