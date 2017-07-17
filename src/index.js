const util = require('reshape-plugin-util')
const {renderToStaticMarkup} = require('react-dom/server')
const React = require('react')
const toVdom = require('./reshape-ast-to-vdom')
const parse = require('reshape-parser')
const {encode, decode} = require('./serialize')

module.exports = (components) => {
  return (tree) => {
    return util.modifyNodes(tree, (node) => {
      return Object.keys(components).indexOf(node.name) > -1
    }, (node) => {
      // encode/compress the original html structure
      // this can be rehydrated later to reduce client/server duplication
      const originalHtml = encode(node)
      return parse(renderToStaticMarkup(toVdom(components, node, originalHtml)))
    })
  }
}

module.exports.encode = encode
module.exports.decode = decode
