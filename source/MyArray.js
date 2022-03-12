import equals from './equals.js'

class MyArray extends Array {

	static form(array) {
		return Object.setPrototypeOf(array, MyArray.prototype)
	}

	constructor(length = 0) {
		super(length);
	}

	remove(element) {
		for (let i = this.length; i > -1; i--) {
			if (equals(this[i], element)) {
				this.splice(i, 1)
			}
		}
		return this
	}

	replace(element, target) {
		for (let i = this.length; i > -1; i--) {
			if (equals(this[i], element)) {
				this.splice(i, 1, target)
			}
		}
		return this
	}

	difference() {

	}

	has(target) {
		for (let item of this) {
			if (equals(item, target)) {
				return true
			}
		}
		return false
	}

	uniq() {
		const copy = new MyArray()
		for (let [index, item] of this.entries()) {
			if (copy.has(item)) {
				this.splice(index, 1)
			} else {
				copy.push(item)
			}
		}
		return this
	}

	groupBy(fn) {
		const result = {}
		for (let item of this) {
			const key = fn(item)
			if (!result.hasOwnProperty(key)) {
				result[key] = []
			}
			result[key].push(item)
		}
		return result
	}

	collect() {

	}

	limit(num) {
		return this.slice(0, num)
	}

	toString() {
		console.log(111233)
	}
}


export default MyArray
