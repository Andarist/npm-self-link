'use strict'

const { dirname, join, resolve } = require('path')
const childProcess = require('child_process')
const pathExists = require('path-exists')
const pkgUp = require('pkg-up')
const promisify = require('util.promisify')

const execFile = promisify(childProcess.execFile)

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const withDefaults = ({ cwd = '.' } = {}) => ({
  cwd: resolve(process.cwd(), cwd),
})

module.exports = async inputOptions => {
  const { cwd } = withDefaults(inputOptions)
  const pkg = await pkgUp(cwd)

  if (pkg === null) {
    throw new Error(`Couldn't find package.json file from: ${cwd}`)
  }

  const pkgName = require(pkg).name
  const pkgDir = dirname(pkg)
  const pkgNodeModule = join(pkgDir, 'node_modules', pkgName)

  if (await pathExists(pkgNodeModule)) {
    return { pkgName, newlyLinked: false }
  }

  await execFile(npm, ['link'], { cwd })
  await execFile(npm, ['link', pkgName], { cwd })

  return { pkgName, newlyLinked: true }
}
