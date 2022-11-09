// Check if device is compatible
if (isMobileDevice || document.documentElement.clientWidth <= 1100) {
    fail;
}


// Canvas 
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576


// Canvas background
let background = new Image()
background.src = 'assets/enviroment/bg-1.png'


// Player 1
const player1 = new Player({
    position: {
        x: 105, 
        y: groundHeight - 170
    }, 
    size: {
        x: 45, 
        y: 110,
            crouch: {
                x: 45,
                y: 75
            }
    },
    velocity: {
        x: 0, 
        y: 0,
        multiplier: 8
    },
    direction: 1,
    health: {
        max: 100
    },
    attack: {
        damage: 5,
        rate: 300
    },

    // sprites
    scale: 0.022,
    maxFrames: {
        x: 8,
        y: 7
    },
    spriteAnimation: [
        {
            name: 'crouch',
            frames: 1,
            offset: {
                x: 74,
                y: 79
            }
        },
        {
            name: 'hurt',
            frames: 1,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'idle',
            frames: 4,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'jump',
            frames: 4,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'run',
            frames: 8,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'runShoot',
            frames: 8,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'shoot',
            frames: 1,
            offset: {
                x: 74,
                y: 44
            }
        }

    ],
    imageSrc: {
        right: 'assets/player1/spritesheet.png',
        left: 'assets/player1/spritesheetleft.png'

    } 
})


//Player 2
const player2 = new Player({
    position: {
        x: canvas.width - 175, 
        y: groundHeight - 170
    }, 
    size: {
        x: 45, 
        y: 110,
            crouch: {
                x: 45,
                y: 75
            }
    },
    velocity: {
        x: 0, 
        y: 0,
        multiplier: 8
    },
    direction: -1,
    health: {
        max: 100
    },
    attack: {
        damage: 5,
        rate: 300
    },

    // sprites
    scale: 0.022,
    maxFrames: {
        x: 8,
        y: 7
    },
    spriteAnimation: [
        {
            name: 'crouch',
            frames: 1,
            offset: {
                x: 74,
                y: 79
            }
        },
        {
            name: 'hurt',
            frames: 1,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'idle',
            frames: 4,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'jump',
            frames: 4,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'run',
            frames: 8,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'runShoot',
            frames: 8,
            offset: {
                x: 74,
                y: 44
            }
        },
        {
            name: 'shoot',
            frames: 1,
            offset: {
                x: 74,
                y: 44
            }
        }

    ],
    imageSrc: {
        right: 'assets/player1/spritesheet.png',
        left: 'assets/player1/spritesheetleft.png'

    } 
})

const player1Health = new Healthbar({
    position: {
        x: 20,
        y: 20
    },
    maxHealth: player1.health.max 
})

const player2Health = new Healthbar({
    position: {
        x: canvas.width - 270,
        y: 20
    },
    maxHealth: player2.health.max 
})

// Animate
let fps, fpsInterval, now, lastFrame
fps = 50
fpsInterval = 1000 / fps
lastFrame = Date.now()

function animate(){
    window.requestAnimationFrame(animate)
    now = Date.now()
    if (now - lastFrame> fpsInterval) {
        lastFrame = now - ((now - lastFrame) % fpsInterval)
        c.drawImage(background, 0, 0, canvas.width, canvas.height)

        player1.update()
        player2.update()
        updateProjectiles()
        player1Health.update(player1.health.current)
        player2Health.update(player2.health.current)

    }     
}

animate()