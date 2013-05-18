//
// # RemoteObject
//
// A simple superclass for objects frequently serialized to and from JSON.
//
var mi = require('mi')

//
// ## RemoteObject `RemoteObject(obj)`
//
// Creates a new instance of RemoteObject with the following options:
//
function RemoteObject(obj) {
  obj = obj || {}

  this._idField = this._idField || (obj._id ? '_id' : 'id')
  this.id = obj[this._idField] || null
  this.type = this.constructor.name || 'RemoteObject'
}
RemoteObject.extend = mi.extend
RemoteObject.inherit = mi.inherit

//
// ## fromJSON `RemoteObject.fromJSON(json)`
//
// Creates and returns a new instance of `RemoteObject` from **json**, expressed either as a String or Object.
//
RemoteObject.fromJSON = fromJSON
function fromJSON(json) {
  var cls = this

  if (!json) {
    return null
  }

  if (typeof json === 'string') {
    json = JSON.parse(json)
  }

  return new cls(json)
}

//
// ## toJSON `toJSON()`
//
// Returns an Object representation of the RemoteObject suitable for JSON serialization.
//
RemoteObject.prototype.toJSON = toJSON
function toJSON() {
  var self = this
    , json = {}

  json[self._idField] = self.id

  return json
}

//
// ## when `RemoteObject.when(thenable)`
//
// Creates a new isntance of `RemoteObject` once **thenable** is fulfilled.
//
// Returns a promise to be fulfilled with the new instance.
//
RemoteObject.when = when
function when(thenable) {
  var cls = this

  return thenable.then(function (value) {
    return cls.fromJSON(value)
  })
}

//
// ## toString `toString()`
//
// Returns a String representation of the RemoteObject.
//
RemoteObject.prototype.toString = toString
function toString() {
  var self = this

  return '[' + self.type + ' ' + self.id + ']'
}

module.exports = RemoteObject
