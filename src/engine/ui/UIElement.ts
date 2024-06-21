import Transform from "../components/Transform"
import Vector2 from "../components/Vector2"

class UIElement {
    private name: string
    protected transform: Transform
    protected visible: boolean
  
    constructor(x: number, y: number) {
        this.transform = new Transform(x, y)
        this.visible = true
    }

    public setName(name: string): void {
        this.name = name
    }
  
    public getName(): string {
      return this.name
    }  
    
    public setPosition(x: number, y: number): void {
        this.transform.setPosition(x, y)
    }
  
    public getPosition(): Vector2 {
      return this.transform.getPosition()
    }  
    
    public setVisible(visible: boolean): void {
        this.visible = visible
    }
  
    public isVisible(): boolean {
        return this.visible
    }

    
    public render(ctx: CanvasRenderingContext2D): void {
        if (!this.visible) return
    }
  }

export default UIElement 