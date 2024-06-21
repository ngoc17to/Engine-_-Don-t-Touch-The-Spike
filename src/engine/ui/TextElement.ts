import UIElement from './UIElement'

class TextElement extends UIElement {
    private text: string
    private color: string
    private fontSize: number
    private fontFamily: string
    private center: boolean

    constructor(
        x: number,
        y: number,
        text: string,
        color: string = '#000000',
        fontSize: number = 16,
        fontFamily: string = 'Arial',
        { center = false }: { center?: boolean } = {}
    ) {
        super(x, y)
        this.text = text
        this.color = color
        this.fontSize = fontSize
        this.fontFamily = fontFamily
        this.center = center
    }

    public setText(text: string): void {
        this.text = text
    }

    public setColor(color: string): void {
        this.color = color
    }

    public setFontSize(fontSize: number): void {
        this.fontSize = fontSize
    }

    public setFontFamily(fontFamily: string): void {
        this.fontFamily = fontFamily
    }

    public render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx);
    
        // Render the text
        if (ctx) {
            ctx.fillStyle = this.color;
            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            if(this.center){
                ctx.save()
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(this.text, this.getPosition().x, this.getPosition().y)
                ctx.restore()
            }
            else{
                ctx.fillText(this.text, this.getPosition().x, this.getPosition().y);
            }
        }
    }
}

export default TextElement