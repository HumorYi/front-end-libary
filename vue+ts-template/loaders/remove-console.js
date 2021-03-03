module.exports = function removeConsole(source) {
  return source.replace(/console\.[a-z]*\([\s\S]*\)/gm, '')
}
