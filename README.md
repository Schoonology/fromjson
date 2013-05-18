# fromJSON

`fromJSON` is the simplest and most obvious remote object abstract superclass that [I](http://schoonology.com) could
think of.

## What?

A "remote object", at it's simplest, is an object that's sent over the wire. A lot.

It's an "abstract superclass" in the sense that it's usefulness comes from being inherited (either prototypically or
parasitically, with shortcuts via [mi](https://github.com/Schoonology/mi)).

`fromJSON` is a super class intended for these Objects that are serialized and deserialized frequently. Since the native
`JSON` implementation already benefits from `toJSON` methods on arguments, the only extension is a `fromJSON` method on
constructor functions. `fromJSON` takes that only one step further to ease integration with Promises, another useful
tool for representing objects transferred frequently.

## Audience

`fromJSON` is intended to be paired with libraries like `mongoskin` and `axon` that embrace schema-less data storage and
transfer. It's a pattern I've used in my applications frequently, and I got sick of copying the base class around.

## Installation

    npm install fromjson

## Usage

    var RemoteObject = require('fromjson')

    function MyObject(obj) {
      RemoteObject.call(this, obj)

      this.myfield = obj.myfield
    }
    RemoteObject.inherit(MyObject) // Also: util.inherits(MyObject, RemoteObject), etc.

    MyObject.prototype.toJSON = function toJSON() {
      var json = RemoteObject.prototype.toJSON.call(this)

      json.myfield = this.myfield

      return json
    }

    var a = MyObject.fromJSON({ id: 'foo', myfield: 'bar' })

    console.log(JSON.stringify(a))

    // ... and so forth

## License

Copyright (C) 2013 Michael Schoonmaker (michael.r.schoonmaker@gmail.com)

This project is free software released under the MIT/X11 license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
