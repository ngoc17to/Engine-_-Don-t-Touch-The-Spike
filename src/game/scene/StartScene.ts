import Scene from "../../engine/core/Scene";
import InputHandler from "../../engine/input/InputHandler";
import TextElement from "../../engine/ui/TextElement";
import Background from "../Background";
import Bird from "../Bird";
import GameManager from "../GameManager";
import PlayScene from "./PlayScene";

class StartScene extends Scene {
    public static scene: StartScene
    private game: GameManager
    private text: TextElement[]

    constructor(game: GameManager){
        super()
        this.game = game;
        this.text = [];
        console.log('start scene')
    }

    public static getInstance(game: GameManager): StartScene {
        return this.scene || (this.scene = new StartScene(game))
    }

    public handleInput(): Scene | undefined{
        const inputHandler = InputHandler.getInstance(this.game.canvasEl)
        if(inputHandler.isKeyDown(" ") || inputHandler.isClicked()){  
            this.onExit()
            return PlayScene.getInstance(this.game)
        }
    }

    public onEnter(): void{
        this.game.bird.setState('start')
        this.game.background = Background.getInstance(this.game.gameData)
        const screenWidth = this.game.gameData.screenWidth
        const screenHeight = this.game.gameData.screenHeight
        const gameTitle = new TextElement(
            screenWidth/2,
            screenHeight/9 + 100,
            "DON'T TOUCH THE SPIKE",
            "gray",
            40,
            "Saira Semi Condensed",
            {center: true}
        )
        const gameInstruction = new TextElement(
            screenWidth/2,
            screenHeight/2 - 50,
            "Click to jump",
            "#FF3464",
            24,
            "Saira Semi Condensed",
            {center: true}
        )
        const lastScore = new TextElement(
            screenWidth/2,
            screenHeight/2 + 130,
            `Last Score: ${this.game.score.getScore()}`,
            "gray",
            24,
            "Arial",
            {center: true}
        )
        const highestScore = new TextElement(
            screenWidth/2,
            screenHeight/2 + 160,
            `Highest Score: ${this.game.score.getHighestScore()}`,
            "gray",
            24,
            "Arial",
            {center: true}
        )
        this.text.push(gameTitle, gameInstruction, lastScore, highestScore)
    }

    public onExit(): void {
        this.game.score.resetScore();
        this.text = [];
    }

    public render(ctx: CanvasRenderingContext2D, delta: number):void{
        this.game.background.render()
        this.game.bird.render(ctx, delta)
        for (const textElement of this.text) {
            textElement.render(ctx);
        }
    }
}

export default StartScene