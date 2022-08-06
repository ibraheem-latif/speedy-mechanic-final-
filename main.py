@namespace
class SpriteKind:
    Timer = SpriteKind.create()
    Display = SpriteKind.create()
    turbo = SpriteKind.create()

def on_up_pressed():
    global targetDirection
    if selectedCar:
        targetDirection = 3.1415926 * 1.5
        if currentCar == 0:
            theCar.set_image(img("""
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
            """))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def drawCar(car: number):
    global acceleration, parameterslist, selectedparameter, carName, timeSinceStart
    acceleration = 0
    if car == 0:
        game.splash("Select vehicle systems ")
        theCar.set_image(img("""
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
        """))
        game.show_long_text("What elements are required for this vehicle to function?",
            DialogLayout.FULL)
        game.show_long_text("1) starting, charging and batteries 2)Fuel system 3)Lubrication 4) cooling system 5) belts and hoses 6) All of the above",
            DialogLayout.FULL)
        if game.ask_for_string("") == "6":
            game.splash("CORRECT!!")
            parameterslist = ["spring", "brakes", "engine", "wheel"]
            for index in range(4):
                selectedparameter = parameterslist._pick_random()
                parameters(selectedparameter)
                parameterslist.remove_at(parameterslist.index(selectedparameter))
            carName = "fas car"
        else:
            game.splash("INCORRECT", "Try again")
            drawCar(0)
    turnSpeedBar.value = turnSpeed
    accelerationBar.value = acceleration
    maxSpeedBar.value = maxSpeed
    Brake.value = b
    carNameSprite.say(carName)
    timeSinceStart = game.runtime()

def on_a_pressed():
    global selectedCar
    if not (selectedCar):
        selectedCar = True
        startRace()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global targetDirection, currentCar
    if selectedCar:
        targetDirection = 3.1415926
        if currentCar == 0:
            theCar.set_image(img("""
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
            """))
    else:
        currentCar = (currentCar + 3) % 4
        drawCar(currentCar)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def parameters(text: str):
    global turnSpeed, b, maxSpeed, acceleration
    if text == "spring":
        game.show_long_text("Select your spring system. (choose a system best suited for a race car)",
            DialogLayout.FULL)
        game.show_long_text("1. Leaf springs 2. Coil springs 3. Torsion bars 4. Air springs",
            DialogLayout.FULL)
        if game.ask_for_string("") == "2":
            turnSpeed = 0.08
        else:
            turnSpeed = 0.04
    if text == "brakes":
        game.show_long_text("Choose your brakes", DialogLayout.FULL)
        game.show_long_text("NOTE: you will be braking often, what type of brake will be best suited for high rubbing pressures",
            DialogLayout.FULL)
        game.show_long_text("1) Disk brake 2) leading and trailing shoes 3) two leading shoes 4) two trailing shoes 5) duo-servo shoes ",
            DialogLayout.FULL)
        if game.ask_for_string("") == "1":
            b = 120
        else:
            b = 60
    if text == "engine":
        game.show_long_text("Choose engine type", DialogLayout.FULL)
        game.show_long_text("1) Turbocharging - Waste energy from exhaust gases is used to overcome pumping losses.",
            DialogLayout.FULL)
        game.show_long_text("2) Naturally Aspirated - Intake air at atmospheric pressure instead of using 'forced induction' to increase performance.",
            DialogLayout.FULL)
        if game.ask_for_string("") == "1":
            game.show_long_text("Increased power output/unit volume (i.e. higher BMEP) leads to lower frictional and mechanical losses",
                DialogLayout.FULL)
            maxSpeed = 120
            acceleration += 3
        else:
            maxSpeed = 100
            acceleration += 4
    if text == "wheel":
        game.show_long_text("Choose your wheel diameter", DialogLayout.FULL)
        game.show_long_text("1) 0.3m        2) 0.5m", DialogLayout.FULL)
        if game.ask_for_string("") == "1":
            acceleration += 1
def startRace():
    global hitCheckpoint
    tiles.set_tilemap(tilemap("""
        level2
    """))
    scene.camera_follow_sprite(theCar)
    tiles.place_on_random_tile(theCar, assets.tile("""
        tile1
    """))
    hitCheckpoint = False
    info.set_score(0)
    Brake.destroy()
    accelerationBar.destroy()
    turnSpeedBar.destroy()
    maxSpeedBar.destroy()
    carNameSprite.destroy()

def on_overlap_tile(sprite2, location2):
    global hitCheckpoint
    hitCheckpoint = True
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tile2
    """),
    on_overlap_tile)

def on_overlap_tile2(sprite, location):
    global hitCheckpoint
    if hitCheckpoint:
        info.change_score_by(1)
        hitCheckpoint = False
    if info.score() == 3:
        if game.runtime() - timeSinceStart < goldthreshold * 1000:
            game.splash("YOU WON GOLD ")
        elif game.runtime() - timeSinceStart < silverthreshold * 1000:
            game.splash("YOU WON SILVER")
        elif game.runtime() - timeSinceStart < bronzethreshold * 1000:
            game.splash("YOU WON BRONZE")
        game.over(True)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tile1
    """),
    on_overlap_tile2)

def on_right_pressed():
    global targetDirection, currentCar
    if selectedCar:
        targetDirection = 0
        if currentCar == 0:
            theCar.set_image(img("""
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
            """))
    else:
        currentCar = (currentCar + 1) % 4
        drawCar(currentCar)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    global targetDirection
    if selectedCar:
        targetDirection = 3.1415926 * 0.5
        if currentCar == 0:
            theCar.set_image(img("""
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
            """))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

direction = 0
angleDiff = 0
speed = 0
hitCheckpoint = False
timeSinceStart = 0
b = 0
maxSpeed = 0
turnSpeed = 0
carName = ""
selectedparameter = ""
parameterslist: List[str] = []
acceleration = 0
targetDirection = 0
bronzethreshold = 0
silverthreshold = 0
goldthreshold = 0
Brake: StatusBarSprite = None
maxSpeedBar: StatusBarSprite = None
accelerationBar: StatusBarSprite = None
turnSpeedBar: StatusBarSprite = None
carNameSprite: Sprite = None
theCar: Sprite = None
selectedCar = False
currentCar = 0
currentCar = 0
selectedCar = False
theCar = sprites.create(img("""
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
    """),
    SpriteKind.player)
carNameSprite = sprites.create(img("""
        b b b b 
            b b b b 
            b b b b 
            b b b b
    """),
    SpriteKind.Display)
tiles.place_on_random_tile(theCar, assets.tile("""
    tile1
"""))
carNameSprite.set_flag(SpriteFlag.INVISIBLE, True)
scene.set_background_color(12)
theCar.y += -30
turnSpeedBar = statusbars.create(40, 4, StatusBarKind.energy)
turnSpeedBar.set_label("Turning:")
turnSpeedBar.max = 0.08
turnSpeedBar.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, False)
turnSpeedBar.right = 120
accelerationBar = statusbars.create(40, 4, StatusBarKind.energy)
accelerationBar.set_label("Accel:")
accelerationBar.right = 120
accelerationBar.y += 15
accelerationBar.max = 5
accelerationBar.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, False)
maxSpeedBar = statusbars.create(40, 4, StatusBarKind.energy)
maxSpeedBar.set_label("Max:")
maxSpeedBar.right = 120
maxSpeedBar.y += 30
maxSpeedBar.max = 120
maxSpeedBar.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, False)
Brake = statusbars.create(40, 4, StatusBarKind.energy)
Brake.set_label("Brake:")
Brake.right = 120
Brake.y += 45
Brake.max = 120
Brake.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, False)
drawCar(currentCar)
goldthreshold = 48
silverthreshold = 50
bronzethreshold = 70

def on_on_update():
    global speed, angleDiff, direction
    if selectedCar:
        if theCar.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_dark_grass3):
            speed = max(speed - acceleration, 20)
        else:
            speed = min(speed + acceleration, maxSpeed)
        angleDiff = targetDirection - direction
        if abs(angleDiff) < 3.1415926:
            if targetDirection < direction:
                direction += 0 - turnSpeed
            else:
                direction += turnSpeed
        elif targetDirection < direction:
            direction += turnSpeed
        else:
            direction += 0 - turnSpeed
        if direction < 0:
            direction += 6.28
        elif direction > 6.28:
            direction += -6.28
        theCar.vx = Math.cos(direction) * speed
        theCar.vy = Math.sin(direction) * speed
        theCar.say("" + str(Math.idiv(game.runtime() - timeSinceStart, 100) / 10))
game.on_update(on_on_update)
