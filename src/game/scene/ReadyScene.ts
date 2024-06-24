import Scene from "../../engine/core/Scene";
import InputHandler from "../../engine/input/InputHandler";
import TextElement from "../../engine/ui/TextElement";
import Background from "../Background";
import GameManager from "../GameManager";
import PlayScene from "./PlayScene";

class ReadyScene extends Scene {
    public static scene: ReadyScene
    private game: GameManager
    private gameTitle: TextElement
    private gameInstruction: TextElement
    private lastScore: TextElement
    private highestScore: TextElement

    constructor(game: GameManager){
        super()
        this.game = game;
        this.addGameObject(this.game.bird)
        console.log('start scene')
    }

    public static getInstance(game: GameManager): ReadyScene {        
        if(!this.scene) this.scene = new ReadyScene(game)
        this.scene.onEnter()
        return this.scene
    }

    public handleInput(): void{
        let isStart = true
        this.game.canvasEl.addEventListener('onReplay', () => { 
            isStart = false
        });
        if(isStart){
            const inputHandler = InputHandler.getInstance(this.game.canvasEl)
            if((inputHandler.isKeyDown(" ") || inputHandler.isMouseDown())){ 
                this.onExit()
                this.game.currentScene = PlayScene.getInstance(this.game)
            }
        }
    }

    public onEnter(): void{
        this.game.bird.setState('start')
        this.game.background = Background.getInstance(this.game.gameData)
        const screenWidth = this.game.gameData.screenWidth
        const screenHeight = this.game.gameData.screenHeight
        this.gameTitle = new TextElement(
            screenWidth/2,
            screenHeight/9 + 100,
            "DON'T TOUCH THE SPIKE",
            "gray",
            40,
            "Saira Semi Condensed",
            {center: true}
        )
        this.gameInstruction = new TextElement(
            screenWidth/2,
            screenHeight/2 - 50,
            "Click to jump",
            "#FF3464",
            24,
            "Saira Semi Condensed",
            {center: true}
        )
        this.lastScore = new TextElement(
            screenWidth/2,
            screenHeight/2 + 130,
            `Last Score: ${this.game.score.getScore()}`,
            "gray",
            24,
            "Arial",
            {center: true}
        )
        this.highestScore = new TextElement(
            screenWidth/2,
            screenHeight/2 + 160,
            `Highest Score: ${this.game.score.getHighestScore()}`,
            "gray",
            24,
            "Arial",
            {center: true}
        )
    }

    public onExit(): void {
        this.game.score.resetScore();
    }

    public render(ctx: CanvasRenderingContext2D, delta: number):void{
        this.handleInput
        this.game.background.render()
        this.game.bird.render(ctx, delta)
        this.gameTitle.render(ctx)
        this.gameInstruction.render(ctx)
        this.lastScore.render(ctx)
        this.highestScore.render(ctx)
    }
}

export default ReadyScene