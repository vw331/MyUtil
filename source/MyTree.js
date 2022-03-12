
class MyTree {

  primaryKey = 'id'
  parentKey = 'parentId'


  static from(array) {
    return Object.setPrototypeOf(array, MyTree.prototype)
  }

  constructor(array) {

  }

  getMode() {
    this.some(item => item.hasOwnProperty('children'))
  }

  toTree() {

  }

  toList() {

  }

}