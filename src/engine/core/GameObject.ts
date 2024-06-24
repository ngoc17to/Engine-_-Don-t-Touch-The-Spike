import {BoxCollider, Collider, TriangleCollider} from "../components/Collider"
import Transform from "../components/Transform"
import Vector2 from "../components/Vector2";
import Sprite from "../rendering/Sprite";

import { GRAVITAIONAL_ACCELERATION } from "../constants"

class GameObject{
    private name: string

    protected width: number
    protected height: number
    protected velocity: number
    protected transform: Transform
    protected collider: Collider
    protected sprite: Sprite

    public active: boolean = true

    constructor(width: number, height: number, name = 'GameObject'){
        this.name = name
        this.width = width
        this.height = height
        this.velocity = 0
        this.transform = new Transform(0, 0)
        this.collider = new BoxCollider(
            this.width,
            this.height,
            this.transform.getPosition().x,
            this.transform.getPosition().y
        )
    }

    public getName(): string{
        return this.name
    }

    public setName(name: string): void{
        this.name = name
    }

    public getWidth(): number{
        return this.width
    }

    public getHeight(): number{
        return this.height
    }

    public setPosition(x: number, y: number): void{
        this.transform.setPosition(x, y)
    }

    public getPosition(): Vector2 {
        return this.transform.getPosition()
    }

    public updateXPosition(dx: number): void{
        const x = this.transform.getPosition().x
        this.transform.setXPosition(x + dx)
    }

    public updateYPosition(dy: number): void{
        const y = this.transform.getPosition().y
        this.transform.setYPosition(y + dy)
    }
    public getCollider(): Collider{
        return this.collider
    }
    public setBoxCollider(width: number, height: number, x: number, y: number): void{
        this.collider = new BoxCollider(
            width, height, x, y
        )
    }

    public setTriangleCollider(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void{
        this.collider = new TriangleCollider(x1, y1, x2, y2, x3, y3)
    }

    public setVelocity(vel: number): void{
        this.velocity = vel
    }

    public getVelocity(): number{
        return this.velocity
    }

    public updateVelocity(dVel: number): void{
        this.velocity += dVel
    }
    
    public updateGravity(delta: number): void{
        this.velocity += (GRAVITAIONAL_ACCELERATION + delta) / 1000
    }

    public update(deltaTime: number, vel: number = 2000): void {
        const position = this.transform.getPosition()
        position.x += (deltaTime * vel)/1000
        position.y += (deltaTime * vel)/1000
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void {
        if (!this.active) return
    }

    public reset(): void {
        return
    }
}

export default GameObject