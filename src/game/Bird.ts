import GameObject from "../engine/core/GameObject";
import AnimatedSprite from "../engine/rendering/AnimatedSprite";
import SpriteSheet from "../engine/rendering/SpriteSheet";
import { GameData } from "../types/general";

class Bird extends GameObject{
    public static bird: Bird

    private gameData: GameData
    private sprites: {[direction: string]: AnimatedSprite} = {}
    private state: 'start' | 'play'
    private isGoingUp: boolean
    private onDirectionChange: Event

    private constructor(gameData: GameData) {
        super(50, 35, 'bird')
        this.state = 'start'
        this.gameData = gameData
        this.onDirectionChange = new CustomEvent('directionChange');

        const spriteSheetImage = new Image()
        spriteSheetImage.src = "../assets/images/birdFly.png"
        const spriteSheet = new SpriteSheet(spriteSheetImage, 215, 153)

        this.sprites = {
            idle: new AnimatedSprite(spriteSheet, 0, 0),
            right: new AnimatedSprite(spriteSheet, 2, 300),
            left: new AnimatedSprite(spriteSheet, 2, 300, {flipped: true})
        }

        this.isGoingUp = true
        this.resetBirdPosition()
    }

    public static getInstance(gameData: GameData): Bird {
        return this.bird || (this.bird = new Bird(gameData))
    }

    private resetBirdPosition(): void {
        const xPos = this.gameData.screenWidth/2 - this.width/2
        const yPos = this.gameData.screenHeight/2 - this.height/2
        this.setPosition(xPos, yPos)
        this.gameData.direction = 'RIGHT' 
    }

    public jump(): void{
        this.setVelocity(-8)
        if(this.gameData.direction == "LEFT"){
            this.updateXPosition(-2)
        }
        else if(this.gameData.direction === "RIGHT"){
            this.updateXPosition(2)
        }
    }

    public setState(state: 'start' | 'play'): void{
        this.state = state
    }

    public changeDirection(): void {
        this.gameData.direction = this.gameData.direction === 'RIGHT' ? 'LEFT' : 'RIGHT';
        this.gameData.canvasEl.dispatchEvent(this.onDirectionChange);
    }

    public update(delta: number): void{
        if(this.state === 'play'){
            this.updateGravity(delta)
            this.updateYPosition(this.velocity)

            if(this.gameData.direction == "LEFT"){
                this.updateXPosition(-4)
                if(this.getPosition().x < 0) this.changeDirection()
            }
            else if(this.gameData.direction === "RIGHT"){
                this.updateXPosition(4)
                if(this.getPosition().x + this.width > this.gameData.screenWidth) this.changeDirection()
            }
        }
        else{
            if (this.isGoingUp) {
                // Bay lên
                this.updateVelocity(-0.5)
                if (this.velocity <= 0) {
                    this.isGoingUp = false
                }
            } else {
                // Bay xuống
                this.updateVelocity(0.5)
                if (this.velocity >= 30) {
                    this.isGoingUp = true
                }
            }
            this.updateYPosition(this.velocity)
        }
        this.setBoxCollider(this.width, this.height, this.getPosition().x, this.getPosition().y)
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void{
        // if(this.isDead()){
        //     this.gameData.gameOver = true
        //     this.gameData.gameStart = false
        // }
        // if(this.gameData.gameOver){
        //     this.resetBirdPosition()
        //     this.gameData.direction = "RIGHT"
        // }
        if(this.state == "start"){
            this.resetBirdPosition()
        }
        this.update(delta)
        this.getMovingSprite().render(
            ctx,
            delta,
            this.getPosition().x,
            this.getPosition().y,
            this.width,
            this.height
        )
    }

    private getMovingSprite(): AnimatedSprite {
        if(this.gameData.direction == "LEFT") return this.sprites["left"]
        return this.sprites["right"]
    }

}

export default Bird