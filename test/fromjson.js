var expect = require('chai').expect
  , RemoteObject = require('../fromjson')

describe('fromJSON', function () {
  it('should export a constructor function', function () {
    expect(RemoteObject).to.be.a('function')
  })

  it('should export an inherit shortcut', function () {
    expect(RemoteObject).to.have.property('inherit')
    expect(RemoteObject.inherit).to.be.a('function')
  })

  it('should export an extension shortcut', function () {
    expect(RemoteObject).to.have.property('extend')
    expect(RemoteObject.extend).to.be.a('function')
  })

  it('should support inheriting', function () {
    function MyObject(obj) {
      RemoteObject.call(this, obj)
    }
    RemoteObject.inherit(MyObject)

    expect(new MyObject() instanceof RemoteObject).to.be.true
  })

  it('should support extension', function () {
    function MyObject(obj) {
      RemoteObject.call(this, obj)
    }
    RemoteObject.extend(MyObject)

    expect(new MyObject() instanceof RemoteObject).to.be.false
    expect(MyObject.fromJSON).to.be.a('function')
  })

  it('should support the built-in inherits', function () {
    function MyObject(obj) {
      RemoteObject.call(this, obj)
    }
    require('util').inherits(MyObject, RemoteObject)

    expect(new MyObject() instanceof RemoteObject).to.be.true
  })

  it('should be (de)serializable', function () {
    var a, b, json

    function MyObject(obj) {
      RemoteObject.call(this, obj)

      this.value = obj.value
    }
    RemoteObject.inherit(MyObject)

    MyObject.prototype.toJSON = function() {
      var json = RemoteObject.prototype.toJSON.call(this)

      json.value = this.value

      return json
    };

    a = new MyObject({
      id: 'foo',
      value: 42
    })
    json = JSON.stringify(a)
    b = MyObject.fromJSON(json)

    expect(b).to.have.property('id', 'foo')
    expect(b).to.have.property('value', 42)
  })
})
