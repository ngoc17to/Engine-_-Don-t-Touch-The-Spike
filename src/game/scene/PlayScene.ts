import Scene from "../../engine/core/Scene";
import InputHandler from "../../engine/input/InputHandler";
import TextElement from "../../engine/ui/TextElement";
import Background from "../Background";
import GameManager from "../GameManager";
import StartScene from "./StartScene";
import Spike from "../Spike";

class PlayScene extends Scene {
    public static scene: PlayScene
    private game: GameManager
    private spikes: Spike[]
    private scoreText: TextElement

    constructor(game: GameManager){
        super()
        this.game = game;
        this.addGameObject(this.game.bird)

        this.game.canvasEl.addEventListener('directionChange', () => {
            this.spikes.forEach((spike) => {
                this.game.spikePool.returnSpike(spike)
            })
            console.log('asdasd')
            this.game.score.update()
            this.setupSpikes()
        });
    }

    public static getInstance(game: GameManager): PlayScene {
        return this.scene || (this.scene = new PlayScene(game))
    }
    
    public handleInput(): Scene | undefined{
        const inputHandler = InputHandler.getInstance(this.game.canvasEl)
        if(inputHandler.isKeyDown(' ') || inputHandler.isClicked()){
            this.game.bird.jump()
            return undefined
        }
    }

    private setupSpikes(): void{
        const spikePool = this.game.spikePool
        this.spikes = []
        const SpikePos = []
        for (let i=0; i<3; i++){
            SpikePos.push(Math.ceil(this.getRandomArbitrary(0, 12)))
        }
        for(let spikePos of SpikePos){
            const direction = this.game.gameData.direction
            const spike = spikePool.getSpike(spikePos, direction)
            this.addGameObject(spike!)
            this.spikes.push(spike!)
        }
    }

    private getRandomArbitrary(min: number, max:number){
        return Math.random() * (max - min) + min
    }

    public onEnter(): void{
        this.game.bird.setState('play')
        this.game.background = Background.getInstance(this.game.gameData)
        this.setupSpikes()

        const score = this.game.score.getScore()
        const text = score < 10 ? `0${score}` : score.toString()
        const screenWidth = this.game.gameData.screenWidth
        const screenHeight = this.game.gameData.screenHeight
        this.scoreText = new TextElement(
            screenWidth/2,
            screenHeight/2,
            text,
            "gray",
            120,
            "Saira Semi Condensed",
            {center: true}
        )
    }

    public update(deltaTime: number): void {
        const score = this.game.score.getScore()
        const text = score < 10 ? `0${score}` : score.toString()
        this.scoreText.setText(text)

        let collisionFlag = false
        this.spikes.forEach(spike => {
            if(this.game.bird.getCollider().checkCollision(spike.getCollider())){
                collisionFlag = true
            }
        })
        const yBird = this.game.bird.getPosition().y
        const screenHeight = this.game.gameData.screenHeight
        if(yBird <= 50 || 
            yBird >= screenHeight - screenHeight/8 - this.game.bird.getHeight() - 50)
        {
            collisionFlag = true
        }

        if(collisionFlag){       
            this.onExit()     
            this.game.currentScene = StartScene.getInstance(this.game)
            this.game.currentScene.onEnter()
        }
    }

    public onExit(): void {
        this.spikes.forEach((spike) => {
            this.game.spikePool.returnSpike(spike)
        })
    }

    public render(ctx: CanvasRenderingContext2D, delta: number):void{
        this.update(delta)
        this.game.background.render()
        this.scoreText.render(ctx)
        this.objects.forEach((obj) => {
            obj.render(ctx, delta)
        })
    }
}

export default PlayScene