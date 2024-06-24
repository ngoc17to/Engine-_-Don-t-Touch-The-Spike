import InputHandler from "../input/InputHandler"
import TextElement from "./TextElement"
import UIElement from "./UIElement"

class ButtonElement extends UIElement{
    private text: TextElement
    private buttonColor: string
    protected width: number
    protected height: number
    protected radius: number
    private onClick: () => void
  
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        text: string,
        fontFamily: string,
        fontSize: number,
        buttonColor: string,
        radius: number = 0
    ) {
        super(x, y)
        this.width = width
        this.height = height
        this.buttonColor = buttonColor
        this.radius = radius
        this.text = new TextElement(x + width/2, y + height/2, text, '#fff', fontSize, fontFamily)
    }
      
    public render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx)

        ctx.beginPath();
        ctx.fillStyle = this.buttonColor;
        
        const x = this.getPosition().x;
        const y = this.getPosition().y;
        const width = this.width;
        const height = this.height;
        const radius = 10; 
        
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();

        ctx.fill();

        ctx.save()
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        this.text.render(ctx)
    }

    public setOnClick(callback: () => void): void {
        this.onClick = callback
    }

    public handleClick(input: InputHandler): void {
        if(this.onClick){
            input.canvas.addEventListener('click', (e) => {
                const mousePos = input.getMousePosition()
                if(this.isHovering(mousePos.x, mousePos.y)) {
                    input.canvas.style.cursor = 'pointer'
                    this.onClick()
                } 
                else {
                    input.canvas.style.cursor = 'default'
                }
            });
        }
      }
      
      private isHovering(x: number, y: number): boolean {
        if (
            x >= this.getPosition().x &&
            x <= this.getPosition().x + this.width &&
            y >= this.getPosition().y &&
            y <= this.getPosition().y + this.height
        ){
            return true
        } 
        return false
      }
}

export default ButtonElement
