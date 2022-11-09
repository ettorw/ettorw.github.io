// Check if device is compatible
let details = navigator.userAgent
let regexp = /android|iphone|kindle|ipad/i
let isMobileDevice = regexp.test(details)
if (isMobileDevice || document.documentElement.clientWidth <= 1100) {
    fail;
}


// Variable initializiation
let groundHeight = 471


// Sprite Class
class Sprite {
    constructor({position, scale, maxFrames, spriteAnimation, imageSrc}){
        this.position = position
        this.scale = scale
        this.maxFrames = maxFrames
        this.image = new Image()
        this.imageSrc = imageSrc
        this.image.src = this.imageSrc.right

        this.frame = {x: 0, y:0}
        this.elapsed = 0
        this.wait = 5
        this.frame.size = {
            x: this.image.width / this.maxFrames.x,
            y: this.image.height / this.maxFrames.y
        }
        this.offset = {
            x: 94,
            y: 52
        }
        this.state
        this.animationStates = spriteAnimation
        this.spriteAnimation = []
        this.animationStates.forEach((state, index) => {
            this.frames = {
                position: [],
                offset: state.offset
            }
            for (let i = 0; i < state.frames; i++){
                this.positionx = this.frame.size.x * i
                this.positiony = this.frame.size.y * index
                this.frames.position.push({x: this.positionx, y: this.positiony})
            }
            this.spriteAnimation[state.name] = this.frames
            this.hello = 1
        });
    }

    draw(){
        c.drawImage(
            this.image, 
            this.frame.x, 
            this.frame.y, 
            this.frame.size.x, 
            this.frame.size.y,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            this.image.width * this.scale,
            this.image.height * this.scale
        ) 
    }

    spriteUpdate(){
        this.currentFrame = Math.floor(this.elapsed/this.wait) % this.spriteAnimation[this.state].position.length
        this.frame.x = this.frame.size.x * this.currentFrame
        this.frame.y = this.spriteAnimation[this.state].position[this.currentFrame].y

        this.offset = this.spriteAnimation[this.state].offset
        
        this.elapsed += 1

        this.draw()
    }
}

// Player Class
class Player extends Sprite{
    constructor({size, velocity, direction, health, attack, position, scale, maxFrames, spriteAnimation, imageSrc}){
        super({position, scale, maxFrames, spriteAnimation, imageSrc})
        this.size = size
        this.size.cx = this.size.x
        this.size.cy = this.size.y
        this.velocity = velocity
        this.direction = direction
        this.health = health
        this.health.current = this.health.max
        this.attack = attack
        this.attack.last = 0
        this.state = 'idle'
        this.key = {
            right: false,
            left: false,
            jump: false,
            crouch: false,
            attack: false,
            ability: false
        }
        this.jump = {
            last: 0
        }
        
    }
    shoot(){
        if (now - this.attack.last >= this.attack.rate){
            this.attack.last = Date.now()
            newProjectile(this.position.x + 50 * this.direction, 11 + this.position.y, this.direction)     
        }
    }

    update(){
        this.size.y = this.size.cy
        // health
        if (this.health.current <= 0){
            this.health.current = 0
        }
        // movement
        if (this.position.y + this.size.y < groundHeight){
            this.velocity.y += 1.3
        } else {
            this.velocity.x = 0
            this.state = 'idle'
            // right or left
            if ((this.key.right != this.key.left) && !this.key.crouch){
                
                this.state = 'run'
                if (this.key.right){
                    this.velocity.x = 1 * this.velocity.multiplier
                } else {
                    this.velocity.x = -1 * this.velocity.multiplier
                }
            }
            // jump
            if (this.key.jump || this.key.crouch){
                if (this.key.jump){
                    if (now - this.jump.last >= 1000){
                        this.jump.last = Date.now()
                        this.velocity.y = -15
                        this.state = 'jump'
                    }
                   
                } else {
                    this.velocity.x = 0
                    this.size.y = this.size.crouch.y
                    this.position.y = groundHeight - this.size.y
                    this.state = 'crouch'
                }
            }        
        }
        if (this.key.attack){
            this.shoot()
            if (!(this.position.y + this.size.y < groundHeight) && (this.key.crouch == (this.key.jump && (now - this.jump.last >= 1000)))){
                this.velocity.x = 0
                this.state = 'shoot'
            } 
        }
        if (this.velocity.x > 0){
            this.direction = 1
            this.image.src = this.imageSrc.right
        } else if (this.velocity.x < 0) {
            this.direction = -1
            this.image.src = this.imageSrc.left
        }

        //collision detection
        projectiles.forEach(element => {
            if (((element.size.x / 2) + (this.size.x / 2) >= Math.abs(this.position.x - element.position.x)) &&
            ((element.size.y / 2) + (this.size.y / 2) >= Math.abs(this.position.y - element.position.y))){
                element.hit = true
                this.health.current -= element.damage
            }
        })


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
   
        if (this.position.x < 0){
            this.position.x = 0
        }
        if (this.position.y < 0){
            this.position.y = 0
        }
        if (this.position.x + this.size.x > canvas.width){
            this.position.x = canvas.width - this.size.x
        }
        if (this.position.y + this.size.y > groundHeight){
            this.position.y = groundHeight - this.size.y
        }
        c.fillStyle = "black"
        c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
        super.spriteUpdate()
    }
}

// healtbar

class Healthbar{
    constructor({position, maxHealth}){
        this.border = 0
        this.position = position
        this.health = {
            max: maxHealth
        }
        this.position.x += this.border
        this.position.y += this.border
        this.size = {
            x: 250,
            y: 15
        } 
    }  
    
    update(currentHealth){
        this.health.current = currentHealth
        if (this.health.current <= 0){
            this.health.current = 0
        }
        c.fillStyle = '#21004b'
        c.fillRect(this.position.x - this.border, this.position.y - this.border, this.size.x + this.border * 2, this.size.y + this.border * 2)
        c.fillStyle = '#9b0c8e'
        c.fillRect(this.position.x, this.position.y, this.size.x * this.health.current / this.health.max, this.size.y)
    }
}



// Projectiles

let projectiles = [40]
let pIndex = 0

class Projectile extends Sprite{
    constructor({direction, position}){
        super({position, 
            scale: 0.06, 
            maxFrames: {x: 3, y: 2}, 
            spriteAnimation: [{name: 'bullet', frames: 3, offset: {x: 5, y: 4}}, {name: 'hit', frames: 3, offset: {x: 10, y: 10}}], 
            imageSrc: {right: 'assets/player1/bullet.png', left: 'assets/player1.bullet.png'}})
        this.size = {
            x: 20,
            y: 7
        }
        this.damage = 5
        this.direction = direction
        this.velocity = 18 * this.direction
        this.hit = false
        this.hide = 0
        this.state = 'bullet'
    }
    
    
    update(){
        if (this.hide != 3)
        {
            if (this.hit == true){
                this.hide++ 
                this.velocity = 0
                this.damage = 0
            }
            this.position.x += this.velocity

            if (this.position.x < 0 + 20){
                this.hit = true
            }
            if (this.position.x + this.size.x > canvas.width + 20){
                this.hit = true
            }
            c.fillStyle = 'black'
            c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
            
            super.spriteUpdate()
            if (this.hide == 3){
                this.position.x = canvas.width + 50
            }
        }
    }
}


function newProjectile(x, y, direction){
    obj = new Projectile ({
        position: {
            x: x,
            y: y
        },
        direction: direction
    })
    projectiles[pIndex] = obj

    pIndex += 1
    if (pIndex >= 40){
        pIndex = 0
    }
}

function updateProjectiles() {
    projectiles.forEach(element => {
        element.update()
    })
}


// Keys
window.addEventListener('keydown', (event) =>{
    switch (event.code){
        case 'KeyW':
            player1.key.jump = true
            break
        case 'KeyA':
            player1.key.left= true
            break
        case 'KeyS':
            player1.key.crouch = true
            break
        case 'KeyD':
            player1.key.right = true
            break
        case 'ArrowRight':
            player2.key.right = true
            break
        case 'ArrowUp':
            player2.key.jump = true
            break
        case 'ArrowLeft':
            player2.key.left = true
            break
        case 'ArrowDown':
            player2.key.crouch = true
            break
        case 'Space':
            player1.key.attack = true
            break
        case 'KeyK':
            player2.key.ability = true
            break
        case 'KeyL':
            player2.key.attack= true
            break
        case 'AltLeft':
            player1.key.ability = true
            break
    }
})

window.addEventListener('keyup', (event) =>{
    switch (event.code){
        case 'KeyW':
            player1.key.jump = false
            break
        case 'KeyA':
            player1.key.left = false
            break
        case 'KeyS':
            player1.key.crouch = false
            break
        case 'KeyD':
            player1.key.right = false
            break
        case 'ArrowRight':
            player2.key.right = false
            break
        case 'ArrowUp':
            player2.key.jump = false
            break
        case 'ArrowLeft':
            player2.key.left = false
            break
        case 'ArrowDown':
            player2.key.crouch = false
            break
        case 'Space':
            player1.key.attack= false
            break
        case 'KeyK':
            player2.key.ability = false
            break
        case 'KeyL':
            player2.key.attack = false
            break
        case 'AltLeft':
            player1.key.ability = false
            break
    }
})