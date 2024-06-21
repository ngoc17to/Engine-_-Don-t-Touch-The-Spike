class Vector2 {
    public x: number;
    public y: number;
  
    constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
    }
  
    public setVector(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }
  
    public add(other: Vector2): Vector2{
        return new Vector2(this.x + other.x, this.y + other.y)
    }
  
    public subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  
    public normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag === 0) {
            return this
        }
        return new Vector2(this.x / mag, this.y / mag);
    }

    public distanceTo(other: Vector2): number{
        const distanceX = this.x - other.x
        const distanceY = this.y - other.y
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    }
}

export default Vector2