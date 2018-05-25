const run = require('./lib/run')
const configName = 'homebrew-release.yml'

module.exports = robot => {
  robot.on('release', async context => {
    run({ robot, context, configName })
  })

  robot.on('push', async context => {
    const configPath = `.github/${configName}`

    if (context.payload.commits.some(commit => (
      commit.added.includes(configPath) ||
      commit.removed.includes(configPath) ||
      commit.modified.includes(configPath)
    ))) {
      run({ robot, context, configName })
    } else {
      robot.log(`Ignoring push that didn't modify ${configPath}`)
    }
  })
}