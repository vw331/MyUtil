

export const getType = value => {
  if (value === null)
    return 'Null'
  else if (value == undefined) {
    return 'Undefined'
  }
  else if (typeof value == 'function') {
    return 'Function'
  } else if (Array.isArray(value)) {
    return 'Array'
  } else {
    return Object.prototype.toString.call(value).replace('[object ', '').replace(']', '')
  }
}

export const equalsType = (obj, other) => {
  return getType(obj) == getType(other)
}

export const equalsObject = (object, other) => {
  if (object === other) {
    return true
  }
  if (Object.keys(object).length != Object.keys(other).length) {
    return false
  }
  for (let key of Object.keys(object)) {
    const [v1, v2] = [object[key], other[key]]
    if (!equals(v1, v2)) {
      return false
    }
  }
  return true
}

export const equalsPlain = (variable, other) => {
  return variable === other
}

export const equalsFunction = (fn1, fn2) => {
  return (fn1.name == fn2.name && fn1.toString() == fn2.toString())
}

export const equalsArray = (array, other) => {
  if (array === other) {
    return true
  }
  if (array.length != other.length) {
    return false
  }
  for (let [key] of array.entries()) {
    const [v1, v2] = [array[key], other[key]]
    if (!equals(v1, v2)) {
      return false
    }
  }
  return true
}

const equals = (v1, v2) => {
  if (!equalsType(v1, v2)) {
    return false
  }
  else if (getType(v1) == 'Array') {
    if (!equalsArray(v1, v2)) {
      return false
    }
  }
  else if (getType(v1) == 'Object') {
    if (!equalsObject(v1, v2)) {
      return false
    }
  }
  else if (getType(v1) == 'Function') {
    if (!equalsFunction(v1, v2)) {
      return false
    }
  }
  else {
    if (!equalsPlain(v1, v2)) {
      return false
    }
  }
  return true
}

export default equals