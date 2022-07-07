const {v4} = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, author) {
        this.title = title
        this.author = author
        this.id = v4()
    }

    toJSON() {
        return ({
            title:this.title,
            author: this.author,
            id: this.id
        })
    }

    async save() {
        let courses = []
        try {
            courses = await Course.getAll()
            courses.push(this.toJSON())
            this.saveAll(courses)
        } catch (err) {
            console.log(err);
        }
    }

    static saveAll(coursesList) {
        fs.writeFile(
            path.join(__dirname, '..', 'data', 'courses.json'),
            JSON.stringify(coursesList),
            err => {
                if(err) throw new Error(err)
            }
        )
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getCourse(id) {
        const courses = await this.getAll()
        return courses.find(el => el.id === id)

    }

    static async update(title, author, id) {
        const courses = await this.getAll()
        this.saveAll(courses.map(course => {
            if(course.id === id) {
                return {...course, title, author}
            } else {
                return course
            }
        }))   
    }

    static async removeCourse(id) {
        const courses = await this.getAll()
        this.saveAll(courses.filter(el => el.id !== id))
    }

}

module.exports = Course