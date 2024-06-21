import InputHandler from "../input/InputHandler"
import TextElement from "./TextElement"
import UIElement from "./UIElement"

class ButtonElement extends UIElement{
    private text: TextElement
    private buttonColor: string
    protected width: number
    protected height: number
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
        onClick: () => void
    ) {
        super(x, y)
        this.width = width
        this.height = height
        this.buttonColor = buttonColor
        this.text = new TextElement(x, y, text, 'fff', fontSize, fontFamily)
        this.onClick = onClick
    }
  
    public render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx)

        ctx.beginPath()
        ctx.fillStyle = this.buttonColor
        ctx.fillRect(this.getPosition().x, this.getPosition().y, this.width, this.height)

        ctx.save()
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        this.text.render(ctx)
    }

    public setOnClick(callback: () => void): void {
        this.onClick = callback
    }

    public handleClick(input: InputHandler) {
        if(this.onClick){
            if(this.isHovering(input.getMousePosition().x, input.getMousePosition().y)
                && input.isClicked()
            ){
                this.onClick
            }
        }
    }

    private isHovering(x: number, y: number): boolean {
        if (
            x >= this.getPosition().x &&
            x <= this.getPosition().x + this.width &&
            y >= this.getPosition().y &&
            y <= this.getPosition().y + this.height
        ) return true
        return false
    }
}

export default ButtonElement
