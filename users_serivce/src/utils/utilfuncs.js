export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}



console.log(getRandomInt(1, 6))





/*
const fakepeoples = require('./fakepeoples.json') 

let users = []

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function createFakeusers(fakepeoples, howmanycreate) {
    for (let index = 0; index < howmanycreate; index++) {
        const randint = getRandomInt(1, 6)
        users.push({
            name: fakepeoples[6 - randint].name,
            surname: fakepeoples[6 + randint].surname,
            age: fakepeoples[6 - randint].age,
            gender: 'male',
            problems: fakepeoples[6 + randint].problems
        })
    }
}




createFakeusers(fakepeoples, 7)

console.log(users)


*/