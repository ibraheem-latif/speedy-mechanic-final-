namespace SpriteKind {
    export const Timer = SpriteKind.create()
    export const Display = SpriteKind.create()
    export const turbo = SpriteKind.create()
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    
    if (selectedCar) {
        targetDirection = 3.1415926 * 1.5
        if (currentCar == 0) {
            theCar.setImage(img`
                . . . . . . e e c c e e . . . . 
                                . . . . . e 2 2 2 2 2 2 e . . . 
                                . . . . 2 c 2 2 2 2 2 2 c 2 . . 
                                . . . e 2 c 4 2 2 2 2 2 c 2 e . 
                                . . . f 2 2 4 2 2 2 2 2 c 2 f . 
                                . . . f 2 2 4 2 2 2 2 2 2 2 f . 
                                . . . f 2 2 4 2 2 2 2 2 2 2 f . 
                                . . . f 2 c 2 4 4 2 2 2 c 2 f . 
                                . . . e 2 c e c c c c e c 2 e . 
                                . . . e 2 e c b b b b c e 2 e . 
                                . . . e 2 e b b b b b b e 2 e . 
                                . . . e e e e e e e e e e e e . 
                                . . . f e d e e e e e e d e f . 
                                . . . f e 2 d e e e e d 2 e f . 
                                . . . f f e e e e e e e e f f . 
                                . . . . f f . . . . . . f f . .
            `)
        }
        
    }
    
})
function drawCar(car: number) {
    
    acceleration = 0
    if (car == 0) {
        game.splash("Select vehicle systems ")
        theCar.setImage(img`
            . . . . . . . . . . . . . . . . 
                        . . . . 2 2 2 2 2 2 2 2 . . . . 
                        . . . 2 4 2 2 2 2 2 2 c 2 . . . 
                        . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
                        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
                        . 2 c 2 e e e e e e e b c 4 2 2 
                        . 2 2 e b b e b b b e e b 4 2 2 
                        . 2 e b b b e b b b b e 2 2 2 2 
                        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
                        . e e e e e e f e e e f e 2 d d 
                        . e e e e e e f e e f e e e 2 d 
                        . e e e e e e f f f e e e e e e 
                        . e f f f f e e e e f f f e e e 
                        . . f f f f f e e f f f f f e . 
                        . . . f f f . . . . f f f f . . 
                        . . . . . . . . . . . . . . . .
        `)
        game.showLongText("What elements are required for this vehicle to function?", DialogLayout.Full)
        game.showLongText("1) starting, charging and batteries 2)Fuel system 3)Lubrication 4) cooling system 5) belts and hoses 6) All of the above", DialogLayout.Full)
        if (game.askForString("") == "6") {
            game.splash("CORRECT!!")
            parameterslist = ["spring", "brakes", "engine", "wheel"]
            for (let index = 0; index < 4; index++) {
                selectedparameter = parameterslist._pickRandom()
                parameters(selectedparameter)
                parameterslist.removeAt(parameterslist.indexOf(selectedparameter))
            }
            carName = "fas car"
        } else {
            game.splash("INCORRECT", "Try again")
            drawCar(0)
        }
        
    }
    
    turnSpeedBar.value = turnSpeed
    accelerationBar.value = acceleration
    maxSpeedBar.value = maxSpeed
    Brake.value = b
    carNameSprite.say(carName)
    timeSinceStart = game.runtime()
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    if (!selectedCar) {
        selectedCar = true
        startRace()
    }
    
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    
    if (selectedCar) {
        targetDirection = 3.1415926
        if (currentCar == 0) {
            theCar.setImage(img`
                . . . . . . . . . . . . . . . . 
                                . . . . . . 2 2 2 2 2 2 2 2 . . 
                                . . . . . 2 c 2 2 2 2 2 2 4 2 . 
                                . . . . 2 c c 2 2 2 2 2 2 4 c 2 
                                . . d 2 4 c c 2 4 4 4 4 4 4 c c 
                                . d 2 2 4 c b e e e e e e e 2 c 
                                . 2 2 2 4 b e e b b b e b b e 2 
                                . 2 2 2 2 2 e b b b b e b b b e 
                                . 2 2 2 2 e 2 2 2 2 2 e 2 2 2 e 
                                . 2 d d 2 e f e e e f e e e e e 
                                . d d 2 e e e f e e f e e e e e 
                                . e e e e e e e f f f e e e e e 
                                . e e e e f f f e e e e f f f f 
                                . . . e f f f f f e e f f f f f 
                                . . . . f f f f . . . . f f f . 
                                . . . . . . . . . . . . . . . .
            `)
        }
        
    } else {
        currentCar = (currentCar + 3) % 4
        drawCar(currentCar)
    }
    
})
function parameters(text: string) {
    
    if (text == "spring") {
        game.showLongText("Select your spring system. (choose a system best suited for a race car)", DialogLayout.Full)
        game.showLongText("1. Leaf springs 2. Coil springs 3. Torsion bars 4. Air springs", DialogLayout.Full)
        if (game.askForString("") == "2") {
            turnSpeed = 0.08
        } else {
            turnSpeed = 0.04
        }
        
    }
    
    if (text == "brakes") {
        game.showLongText("Choose your brakes", DialogLayout.Full)
        game.showLongText("NOTE: you will be braking often, what type of brake will be best suited for high rubbing pressures", DialogLayout.Full)
        game.showLongText("1) Disk brake 2) leading and trailing shoes 3) two leading shoes 4) two trailing shoes 5) duo-servo shoes ", DialogLayout.Full)
        if (game.askForString("") == "1") {
            b = 120
        } else {
            b = 60
        }
        
    }
    
    if (text == "engine") {
        game.showLongText("Choose engine type", DialogLayout.Full)
        game.showLongText("1) Turbocharging - Waste energy from exhaust gases is used to overcome pumping losses.", DialogLayout.Full)
        game.showLongText("2) Naturally Aspirated - Intake air at atmospheric pressure instead of using 'forced induction' to increase performance.", DialogLayout.Full)
        if (game.askForString("") == "1") {
            game.showLongText("Increased power output/unit volume (i.e. higher BMEP) leads to lower frictional and mechanical losses", DialogLayout.Full)
            maxSpeed = 120
            acceleration += 3
        } else {
            maxSpeed = 100
            acceleration += 4
        }
        
    }
    
    if (text == "wheel") {
        game.showLongText("Choose your wheel diameter", DialogLayout.Full)
        game.showLongText("1) 0.3m        2) 0.5m", DialogLayout.Full)
        if (game.askForString("") == "1") {
            acceleration += 1
        }
        
    }
    
}

function startRace() {
    
    tiles.setTilemap(tilemap`
        level2
    `)
    scene.cameraFollowSprite(theCar)
    tiles.placeOnRandomTile(theCar, assets.tile`
        tile1
    `)
    hitCheckpoint = false
    info.setScore(0)
    Brake.destroy()
    accelerationBar.destroy()
    turnSpeedBar.destroy()
    maxSpeedBar.destroy()
    carNameSprite.destroy()
}

scene.onOverlapTile(SpriteKind.Player, assets.tile`
        tile2
    `, function on_overlap_tile(sprite2: Sprite, location2: tiles.Location) {
    
    hitCheckpoint = true
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`
        tile1
    `, function on_overlap_tile2(sprite: Sprite, location: tiles.Location) {
    
    if (hitCheckpoint) {
        info.changeScoreBy(1)
        hitCheckpoint = false
    }
    
    if (info.score() == 3) {
        if (game.runtime() - timeSinceStart < goldthreshold * 1000) {
            game.splash("YOU WON GOLD ")
        } else if (game.runtime() - timeSinceStart < silverthreshold * 1000) {
            game.splash("YOU WON SILVER")
        } else if (game.runtime() - timeSinceStart < bronzethreshold * 1000) {
            game.splash("YOU WON BRONZE")
        }
        
        game.over(true)
    }
    
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    
    if (selectedCar) {
        targetDirection = 0
        if (currentCar == 0) {
            theCar.setImage(img`
                . . . . . . . . . . . . . . . . 
                                . . . . 2 2 2 2 2 2 2 2 . . . . 
                                . . . 2 4 2 2 2 2 2 2 c 2 . . . 
                                . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
                                . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
                                . 2 c 2 e e e e e e e b c 4 2 2 
                                . 2 2 e b b e b b b e e b 4 2 2 
                                . 2 e b b b e b b b b e 2 2 2 2 
                                . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
                                . e e e e e e f e e e f e 2 d d 
                                . e e e e e e f e e f e e e 2 d 
                                . e e e e e e f f f e e e e e e 
                                . e f f f f e e e e f f f e e e 
                                . . f f f f f e e f f f f f e . 
                                . . . f f f . . . . f f f f . . 
                                . . . . . . . . . . . . . . . .
            `)
        }
        
    } else {
        currentCar = (currentCar + 1) % 4
        drawCar(currentCar)
    }
    
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    
    if (selectedCar) {
        targetDirection = 3.1415926 * 0.5
        if (currentCar == 0) {
            theCar.setImage(img`
                . . . . . . . . . . . . . . . . 
                                . . . . . . 2 2 2 2 2 2 . . . . 
                                . . . . . 2 2 4 4 2 2 2 2 . . . 
                                . . . . . c 4 2 2 2 2 2 c . . . 
                                . . . . 2 c 4 2 2 2 2 2 c 2 . . 
                                . . . e 2 c 4 2 2 2 2 2 c 2 e . 
                                . . . f 2 c 4 2 2 2 2 2 c 2 f . 
                                . . . f e c 2 2 2 2 2 2 c e f . 
                                . . . f 2 c 2 b b b b 2 c 2 f . 
                                . . . e 2 2 b c c c c b 2 2 e . 
                                . . . e e b c c c c c c b e e . 
                                . . . f e 4 4 4 4 4 4 4 4 e f . 
                                . . . f e d 2 2 2 2 2 2 d e f . 
                                . . . . 2 d d 2 2 2 2 d d 2 f . 
                                . . . . f 2 d 2 2 2 2 d 2 f . . 
                                . . . . . e 2 2 2 2 2 2 e . . .
            `)
        }
        
    }
    
})
let direction = 0
let angleDiff = 0
let speed = 0
let hitCheckpoint = false
let timeSinceStart = 0
let b = 0
let maxSpeed = 0
let turnSpeed = 0
let carName = ""
let selectedparameter = ""
let parameterslist : string[] = []
let acceleration = 0
let targetDirection = 0
let bronzethreshold = 0
let silverthreshold = 0
let goldthreshold = 0
let Brake : StatusBarSprite = null
let maxSpeedBar : StatusBarSprite = null
let accelerationBar : StatusBarSprite = null
let turnSpeedBar : StatusBarSprite = null
let carNameSprite : Sprite = null
let theCar : Sprite = null
let selectedCar = false
let currentCar = 0
currentCar = 0
selectedCar = false
theCar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 . . . . 
            . . . 2 4 2 2 2 2 2 2 c 2 . . . 
            . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
            . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
            . 2 c 2 e e e e e e e b c 4 2 2 
            . 2 2 e b b e b b b e e b 4 2 2 
            . 2 e b b b e b b b b e 2 2 2 2 
            . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
            . e e e e e e f e e e f e 2 d d 
            . e e e e e e f e e f e e e 2 d 
            . e e e e e e f f f e e e e e e 
            . e f f f f e e e e f f f e e e 
            . . f f f f f e e f f f f f e . 
            . . . f f f . . . . f f f f . . 
            . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
carNameSprite = sprites.create(img`
        b b b b 
            b b b b 
            b b b b 
            b b b b
    `, SpriteKind.Display)
tiles.placeOnRandomTile(theCar, assets.tile`
    tile1
`)
carNameSprite.setFlag(SpriteFlag.Invisible, true)
scene.setBackgroundColor(12)
theCar.y += -30
turnSpeedBar = statusbars.create(40, 4, StatusBarKind.Energy)
turnSpeedBar.setLabel("Turning:")
turnSpeedBar.max = 0.08
turnSpeedBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
turnSpeedBar.right = 120
accelerationBar = statusbars.create(40, 4, StatusBarKind.Energy)
accelerationBar.setLabel("Accel:")
accelerationBar.right = 120
accelerationBar.y += 15
accelerationBar.max = 5
accelerationBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
maxSpeedBar = statusbars.create(40, 4, StatusBarKind.Energy)
maxSpeedBar.setLabel("Max:")
maxSpeedBar.right = 120
maxSpeedBar.y += 30
maxSpeedBar.max = 120
maxSpeedBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
Brake = statusbars.create(40, 4, StatusBarKind.Energy)
Brake.setLabel("Brake:")
Brake.right = 120
Brake.y += 45
Brake.max = 120
Brake.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
drawCar(currentCar)
goldthreshold = 48
silverthreshold = 50
bronzethreshold = 70
game.onUpdate(function on_on_update() {
    
    if (selectedCar) {
        if (theCar.tileKindAt(TileDirection.Center, sprites.castle.tileDarkGrass3)) {
            speed = Math.max(speed - acceleration, 20)
        } else {
            speed = Math.min(speed + acceleration, maxSpeed)
        }
        
        angleDiff = targetDirection - direction
        if (Math.abs(angleDiff) < 3.1415926) {
            if (targetDirection < direction) {
                direction += 0 - turnSpeed
            } else {
                direction += turnSpeed
            }
            
        } else if (targetDirection < direction) {
            direction += turnSpeed
        } else {
            direction += 0 - turnSpeed
        }
        
        if (direction < 0) {
            direction += 6.28
        } else if (direction > 6.28) {
            direction += -6.28
        }
        
        theCar.vx = Math.cos(direction) * speed
        theCar.vy = Math.sin(direction) * speed
        theCar.say("" + ("" + Math.idiv(game.runtime() - timeSinceStart, 100) / 10))
    }
    
})
