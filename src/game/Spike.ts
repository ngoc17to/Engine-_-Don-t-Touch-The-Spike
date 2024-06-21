import GameObject from "../engine/core/GameObject";
import Sprite from "../engine/rendering/Sprite";
import { GameData } from "../types/general";

class Spike extends GameObject{
    private sprites: {[direction: string]: Sprite} = {}
    private position: number
    private gameData: GameData
    private direction: 'LEFT' | 'RIGHT'

    constructor(position: number, direction: 'LEFT' | 'RIGHT', gameData: GameData){
        super(35, 45, 'spike')
        this.position = position
        this.direction = direction
        this.gameData = gameData

        const spike = new Image()
        spike.src = "../assets/images/spike.png"

        this.sprites = {
            left: new Sprite(spike),
            right: new Sprite(spike, {flipped: true}),
        }
    }

    public setup(position: number, direction: 'LEFT' | 'RIGHT'): void {
        this.position = position
        this.direction = direction
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void {
        const ySpike = this.position * this.height 
        if(this.direction == "RIGHT"){
            const xSpike = this.gameData.screenWidth - this.width
            this.sprites["right"].render(ctx, xSpike, ySpike, this.width, this.height)
        }
        else{
            const xSpike = 0
            this.sprites["left"].render(ctx, xSpike, ySpike, this.width, this.height)
        }
    }

}

export default Spike