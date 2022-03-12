

export default class MyObject extends Object {

  static deepClone(source) {
    const type = Object.prototype.toString.call(source)
    let target
    console.log(type)
    if (/Array/.test(type)) {
      target = source.map(item => MyObject.deepClone(item))
    }
    else if (/Object/.test(type)) {
      target = {}
      Object.keys(source).forEach(key => {
        target[key] = MyObject.deepClone(source[key])
      })
    }
    else {
      target = source
    }

    return target
  }

  static form(obj) {
    return Object.setPrototypeOf(obj, MyObject.prototype)
  }

  constructor() {
    super(arguments)
  }

  equals(other = {}) {
    const entries1 = Object.entries(this)
    const entries2 = Object.entries(other)
    if (entries1.length !== entries2.length) {
      return false
    }
    for (let i = 0; i < entries1.length; ++i) {
      // Keys
      if (entries1[i][0] !== entries2[i][0]) {
        return false;
      }
      // Values
      if (entries1[i][1] !== entries2[i][1]) {
        return false;
      }
    }
    return true
  }

  clone() {
    return MyObject.form(MyObject.deepClone(this))
  }

  pick(props = []) {
    for (let key in this) {
      if (!props.includes(key)) {
        delete this[key]
      }
    }
    return this
  }

  omit(props = []) {
    for (let key of props) {
      delete this[key]
    }
    return this
  }

  at(path) {
    const pathArr = path.split('.').reduce((res, item) => {
      if (/\[|\]/.test(item)) {
        var b = item
          .replaceAll('[', ']')
          .split(']')
          .filter(s => s !== '')
          .forEach(s => {
            if (Number(s)) {
              res.push({ by: 'index', v: Number(s) })
            } else {
              res.push({ by: 'key', v: s })
            }
          })
      } else {
        res.push({ by: 'key', v: item })
      }
      return res
    }, [])
    let res = this
    while (pathArr.length && typeof res == 'object') {
      const visit = pathArr.shift()
      if (visit.by == 'key') {
        res = res[visit.v]
      } else {
        res = res[visit.v]
      }
    }
    return res
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this, key)
  }

  applyIf(object = {}) {
    for (let key in object) {
      if (this[key] == undefined) {
        this[key] = object[key]
      }
    }
    return this
  }

}