import GameLoop from "./engine/components/GameLoop";
import InputHandler from "./engine/input/InputHandler";
import GameManager from "./game/GameManager";

class Game {
    private static instance: Game;

    private GameManager: GameManager
    private canvasEl: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private inputHandler: InputHandler;
    
    private constructor(canvasEl: HTMLCanvasElement) {
        console.log('Game created')
        this.canvasEl = canvasEl
        const context = canvasEl.getContext('2d')
        if(context) this.context = context
    }

    public static getInstance(canvas: HTMLCanvasElement): Game {
        if (!Game.instance) {
          Game.instance = new Game(canvas);
        }
        return Game.instance;
    }

    public run(){
        this.setup();

        const gameLoop = new GameLoop(this.loop.bind(this))
        gameLoop.run()
    }

    private setup(){
        this.inputHandler = InputHandler.getInstance(this.canvasEl)
        this.GameManager = GameManager.getInstance(this.canvasEl)
    }

    private loop(delta: number){
        this.GameManager.handleInput()
        this.GameManager.render(this.context, delta)
    }
}

const gameStart = () => {
    const canvasEl = document.getElementById('game') as HTMLCanvasElement | undefined;
    if(!canvasEl){
        console.log('Couldnt find game canvas')
        return
    }
    if(canvasEl.getContext('2d')){
        const game = Game.getInstance(canvasEl)
        game.run()
    }
}
gameStart()
