import Scene from "../../engine/core/Scene";
import InputHandler from "../../engine/input/InputHandler";
import ButtonElement from "../../engine/ui/ButtonElement";
import TextElement from "../../engine/ui/TextElement";
import Background from "../Background";
import GameManager from "../GameManager";
import ReadyScene from "./ReadyScene";

class OverScene extends Scene {
    public static scene: OverScene
    private game: GameManager
    private scoreButton: ButtonElement
    private replayButton: ButtonElement
    private onReplay: Event


    constructor(game: GameManager){
        super()
        this.game = game;
        this.onReplay = new CustomEvent('onReplay');
    }

    public static getInstance(game: GameManager): OverScene {
        if(!this.scene) this.scene = new OverScene(game)
        this.scene.onEnter()
        return this.scene
    }

    public onEnter(): void{
        this.game.bird.setState('dead')
        this.game.background = Background.getInstance(this.game.gameData)
        const screenWidth = this.game.gameData.screenWidth
        const screenHeight = this.game.gameData.screenHeight
        this.scoreButton = new ButtonElement(
            screenWidth/2 - 100,
            screenHeight/2 - 60,
            200,
            60,
            `${this.game.score.getScore()} points`,
            "Saira Semi Condensed",
            24,
            "#FF3464"
        )
        this.replayButton = new ButtonElement(
            screenWidth/2 - 100,
            screenHeight/2 + 10,
            200,
            40,
            `REPLAY`,
            "Saira Semi Condensed",
            24,
            "#FF3464",
            5
        )
        const onClick = () => {
            this.game.canvasEl.dispatchEvent(this.onReplay);
            this.onExit()     
            this.game.currentScene = ReadyScene.getInstance(this.game)
        }
        this.replayButton.setOnClick(onClick)
    }

    public onExit(): void {
        const inputHandler = InputHandler.getInstance(this.game.canvasEl)
        this.replayButton.setPosition(-200, -40)
    }

    public update(deltaTime: number): void 
    {
        this.replayButton.handleClick(InputHandler.getInstance(this.game.canvasEl));
    }

    public render(ctx: CanvasRenderingContext2D, delta: number):void{
        this.update(delta)
        this.game.background.render()
        this.game.bird.render(ctx, delta)
        this.scoreButton.render(ctx)
        this.replayButton.render(ctx)
    }
}

export default OverScene