import { GameData } from "../types/general"
import Spike from "./Spike"

class SpikePool {
    public static instance: SpikePool
    private pool: Spike[]
    private maxPoolSize: number
    private gameData: GameData

    private constructor(maxPoolSize: number = 4, gameData: GameData)
    {
        this.pool = []
        this.maxPoolSize = maxPoolSize
        this.gameData = gameData
        for(let i = 0; i < this.maxPoolSize; i++)
        {
            const spike = new Spike(0, 'LEFT', this.gameData);
            this.pool.push(spike);
        }
    }

    public static getInstance(maxPoolSize: number = 4, gameData: GameData): SpikePool {
        return this.instance || (this.instance = new SpikePool(maxPoolSize, gameData))
    }

    public getSpike(position: number, direction: 'LEFT' | 'RIGHT'): Spike | undefined {
        let spike: Spike

        if (this.pool.length > 0) {
            spike = this.pool.pop()!;
            spike.setup(position, direction)
            const xSpike = direction === 'LEFT' ? 0 : this.gameData.screenWidth - spike.getWidth()
            const ySpike = position * spike.getHeight() 
            spike.setTriangleCollider(
                xSpike,
                ySpike,
                xSpike,
                ySpike + spike.getHeight(),
                xSpike + spike.getWidth()/2,
                ySpike + spike.getHeight()/2
            )
            return spike;
        } 
    }

    public returnSpike(spike: Spike): void {
        if (this.pool.length < this.maxPoolSize) {
            this.pool.push(spike);
        }
    }
}

export default SpikePool