import Vector2 from "./Vector2";

class Transform {
    private position: Vector2;
    private rotation: number;
    private scale: Vector2;

    constructor(x: number = 0, y: number = 0, rotation: number = 0, scaleX: number = 1, scaleY: number = 1) {
        this.position = new Vector2(x, y);
        this.rotation = rotation;
        this.scale = new Vector2(scaleX, scaleY);
    }  

    public getPosition(): Vector2 {
        return this.position;
    }

    public setPosition(x: number, y: number): void {
        this.position.x = x;
        this.position.y = y;
    }

    public setXPosition(x: number): void {
        this.position.x = x;
    }

    public setYPosition(y: number): void {
        this.position.y = y;
    }

    public getRotation(): number {
        return this.rotation;
    }

    public setRotation(angle: number): void {
        this.rotation = angle;
    }

    public getScale(): Vector2 {
        return this.scale;
    }  

    public setScale(scaleX: number, scaleY: number): void {
        this.scale.x = scaleX;
        this.scale.y = scaleY;
    }
}

export default Transform