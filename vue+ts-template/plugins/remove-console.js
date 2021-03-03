// plugins/remove-console-log.js
const types = require('@babel/types')

module.exports = function declare(api, options) {
  return {
    name: 'remove-console',
    visitor: {
      ExpressionStatement(path) {
        const expression = path.node.expression

        if (types.isCallExpression(expression)) {
          const callee = expression.callee

          if (types.isMemberExpression(callee)) {
            const objName = callee.object.name
            // const methodName = callee.property.name

            if (objName === 'console') {
              path.remove()
            }
          }
        }
      }
    }
  }
}
