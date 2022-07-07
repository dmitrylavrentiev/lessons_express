const path = require('path')
const fs = require('fs')

const Course = require('./course')

class Cart {

    static async addToCart(courseId) {
        const coursesIds = await this.getAll()
        coursesIds.push(courseId)
        await this.save(coursesIds)
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
                'utf-8',
                (err, data) => {
                    if(err) reject(err)
                    resolve(JSON.parse(data))
                }
            )
        })
    }

    static save(coursesIds) {
        fs.writeFile(
            path.join(__dirname, '..', 'data', 'cart.json'),
            JSON.stringify(coursesIds),
            err => {
                if(err) throw new Error(err)
            }
        )
    }
}

module.exports = Cart