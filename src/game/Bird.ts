import GameObject from "../engine/core/GameObject";
import AnimatedSprite from "../engine/rendering/AnimatedSprite";
import Sprite from "../engine/rendering/Sprite";
import SpriteSheet from "../engine/rendering/SpriteSheet";
import { GameData } from "../types/general";

class Bird extends GameObject{
    public static bird: Bird

    private gameData: GameData
    private flySprites: {[direction: string]: AnimatedSprite} = {}
    private deadSprites: {[direction: string]: Sprite} = {}
    private state: 'start' | 'play' | 'dead'
    private isGoingUp: boolean
    private onDirectionChange: Event

    private constructor(gameData: GameData) {
        super(55, 50, 'bird')
        this.state = 'start'
        this.gameData = gameData
        this.onDirectionChange = new CustomEvent('directionChange');

        const spriteSheetImage = new Image()
        spriteSheetImage.src = "../assets/images/bird_jump.png"
        const spriteSheet = new SpriteSheet(spriteSheetImage, 338, 321)

        this.flySprites = {
            idle: new AnimatedSprite(spriteSheet, 0, 0),
            right: new AnimatedSprite(spriteSheet, 2, 300),
            left: new AnimatedSprite(spriteSheet, 2, 300, {flipped: true})
        }

        const birdDead = new Image()
        birdDead.src = "../assets/images/bird_dead.png"
        
        this.deadSprites = {
            right: new Sprite(birdDead),
            left: new Sprite(birdDead,{flipped: true})
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

    public setState(state: 'start' | 'play' | 'dead'): void{
        this.state = state
    }

    public getState(): 'start' | 'play' | 'dead'{
        return this.state
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
        else if(this.state === 'start'){
            if (this.isGoingUp) {
                // Bay lên
                this.updateVelocity(-0.5)
                if (this.velocity <= 0) {
                    this.isGoingUp = false
                }
            } else {
                // Bay xuống
                this.updateVelocity(0.5)
                if (this.velocity >= 40) {
                    this.isGoingUp = true
                }
            }
            this.updateYPosition(this.velocity)
        }
        else{
            console.log(this.getPosition().y,this.gameData.screenHeight)
            if(this.getPosition().y <= this.gameData.screenHeight - this.gameData.screenHeight/4){
                this.updateVelocity(0.5)
                this.updateYPosition(this.velocity)
            }
            else{

            }
        }
        this.setBoxCollider(this.width, this.height, this.getPosition().x, this.getPosition().y)
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void{
        if(this.state == "start"){
            this.resetBirdPosition()
        }
        this.update(delta)
        if(this.state !== "dead"){
            this.getMovingSprite().render(
                ctx,
                delta,
                this.getPosition().x,
                this.getPosition().y,
                this.width,
                this.height
            )
        }
        else{
            this.getSprite().render(
                ctx,
                this.getPosition().x,
                this.getPosition().y,
                this.width,
                this.height
            )
        }
    }

    private getMovingSprite(): AnimatedSprite {
        if(this.gameData.direction == "LEFT") return this.flySprites["left"]
        return this.flySprites["right"]
    }

    private getSprite(): Sprite {
        if(this.gameData.direction == "LEFT") return this.deadSprites["left"]
        return this.deadSprites["right"]
    }
}

export default Bird