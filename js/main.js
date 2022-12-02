const movementDisplay = document.querySelector('#movement')
const statusDisplay = document.querySelector('#status')
const canvas = document.querySelector('#canvas')

//set the canvas resolution to be the same as the window
canvas.setAttribute('height',getComputedStyle(canvas)['height'])
canvas.setAttribute('width',getComputedStyle(canvas)['width'])

//get rendering context from the canvas //CTX <-------------
const ctx = canvas.getContext('2d')
// console.log(ctx)




// //drawing is a 2 step process
// //step 1 -- set rendering context properties
// ctx.fillStyle = 'green' //any valid css color will work

// //step 2 -- invoke rendering context methods
// //ctx.fillRect(x, y, width, height) in pixels
// ctx.fillRect(0, 0, 100, 100)
// ctx.fillStyle = 'blue'
// ctx.fillRect(50, 50, 100, 300)

// //make a function to draw a box
// function drawbox(x, y, width, height, color) {
//     ctx.fillStyle = color
//     ctx.fillRect(x, y, width, height)
// }

// drawbox(200, 150, 45, 75, 'purple')


// // CLICK TO DRAW A SQUARE
// canvas.addEventListener('click', e => {
//     console.log(e.offsetX, e.offsetY)
//     drawbox(e.offsetX, e.offsetY, 30, 30, 'hotpink')
// })


/*
MECHANICAL GAME FUNCTION
*/

//game variable areas



// NUM 1) define a class to represent on screen game objects
class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// //make white crawler
// const testCrawler = new Crawler(50, 50, 45 ,45, 'white')
// testCrawler.render() //activate || 'append' to screen || make it show

//num 3
const gameLoopInterval = setInterval(gameLoop, 60)
const hero = new Crawler(5, 5, 25, 25, 'hotpink')
const ogre = new Crawler(600, 75, 50, 75, 'green')
const wall = new Crawler(300, 0, 75, 250, 'blue')
const pressedKeys = {} 

// NUM 2) find a way to handle user input to move our hero around
function handleMovement(speed) {
    if (pressedKeys.w) {
        hero.y += speed
    }
    if (pressedKeys.s) {
        hero.y -= speed
    }
    if (pressedKeys.a) {
        hero.x += speed
    }
    if (pressedKeys.d) {
        hero.x -= speed
    }


    // switch (e.key) {
    //     case('w'): //move the hero up
    //         console.log('move the hero up')
    //         hero.y -= speed
    //         break
    //     case('s'):
    //         console.log('move the hero down')
    //         hero.y += speed
    //         break
    //     case('a'):
    //         console.log('move the hero left')
    //         hero.x -= speed
    //         break
    //     case('d'):
    //         console.log('move the hero right')
    //         hero.x += speed
    //         break
    //     default:
    //         // conssole.log('that key doesn\'t move the hero')
    //}

    movementDisplay.innerText = `x: ${hero.x} y: ${hero.y}`
}


document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

// // NUM 3) define a gameloop (handle all game logic and render)
// const gameLoopInterval = setInterval(gameLoop, 60)
// const hero = new Crawler(5, 5, 25, 25, 'hotpink')
// const ogre = new Crawler(600, 150, 50, 75, 'green')

function gameLoop() {
    //clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //do business logic of the game (is there movement? collision?)
    //check for input
    // console.log(pressedKeys)
    // if there is a hit between the hero and the wall -- speed is negative
    if (!detectHit(hero, wall)) {
        handleMovement(-5)
    } else {
        handleMovement(5)
    }
    //if a hit is detected, end game
    if (detectHit(hero, ogre)) {
        //end game
        console.log('the game is over')
        //make ogre disappear
        ogre.alive = false
        //update the message 
        // statusDisplay.innerText = 'game overs'
    }
    //render all of the game objects
    wall.render()
    hero.render()
    if (ogre.alive) {
        ogre.render()
    }
}
// NUM 4) find a collision detection algorithm (game end when player kill ogre)
function detectHit(objectOne, ObjectTwo) {
    // AABB -- axis aligned bounding box collision detection
    //check for overlapes, side by side
    const left = objectOne.x + objectOne.width >= ObjectTwo.x //in respect to the Ogre
    const right = objectOne.x <= ObjectTwo.x + ObjectTwo.width
    const top = objectOne.y + objectOne.height >= ObjectTwo.y
    const bottom = objectOne.y <= ObjectTwo.y + ObjectTwo.height
    // console.log(left, right, top, bottom)
    return left && right && top && bottom
}