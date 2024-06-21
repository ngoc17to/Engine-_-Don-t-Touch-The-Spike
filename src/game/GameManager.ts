import GameScore from "../engine/components/GameScore"
import Scene from "../engine/core/Scene"
import { GameData } from "../types/general"
import Background from "./Background"
import Bird from "./Bird"
import ReadyScene from "./scene/ReadyScene"
import SpikePool from "./SpikePool"

class GameManager {
    public static instance: GameManager

    public canvasEl: HTMLCanvasElement
    public gameData: GameData
    public currentScene: Scene | undefined
    public bird: Bird
    public spikePool: SpikePool
    public background: Background
    public score: GameScore
    public gameStart: boolean
    public gameOver: boolean
    
    private constructor(canvasEl: HTMLCanvasElement) {
        if (GameManager.instance) {
            return GameManager.instance
        }
        GameManager.instance = this
        this.canvasEl = canvasEl
        const context = canvasEl.getContext("2d")
        if(context){
            this.gameData = {
                canvasEl: canvasEl,
                context: context,
                screenWidth: canvasEl.width,
                screenHeight: canvasEl.height,
                direction: "RIGHT",
            }
        }
        this.gameStart = false
        this.gameOver = false
        this.score = new GameScore()
        this.bird = Bird.getInstance(this.gameData)
        this.currentScene = ReadyScene.getInstance(this)
        this.spikePool = SpikePool.getInstance(5, this.gameData)
        this.currentScene.onEnter()
    }
  
    public static getInstance(canvasEl: HTMLCanvasElement): GameManager {
        return this.instance || (this.instance = new GameManager(canvasEl))
    }
  
    public render(context: CanvasRenderingContext2D, delta: number): void {    
        this.currentScene?.render(context, delta)
    }

    public handleInput(): void {
        this.currentScene?.handleInput()
    }
}

export default GameManager