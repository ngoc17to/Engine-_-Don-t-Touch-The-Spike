class SpriteSheet {

    private image: HTMLImageElement
    private spriteWidth: number
    private spriteHeight: number
  
    constructor(image: HTMLImageElement, spriteWidth: number, spriteHeight: number) {
        this.image = image
        this.spriteWidth = spriteWidth
        this.spriteHeight = spriteHeight
    }
  
    public render(
        context: CanvasRenderingContext2D,
        currentFrame: number,
        x: number,
        y: number,
        width: number,
        height: number,
        { flipped = false }: { flipped?: boolean } = {}
    ): void {
        let renderedX = x
      
        if (flipped) {
            context?.save()
            context?.scale(-1, 1)
            renderedX = -(x + width)
        }
    
        context?.drawImage(
            this.image,
            currentFrame * this.spriteWidth,
            0.1 * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            renderedX,
            y,
            width,
            height
        )
    
        if (flipped) {
            context?.restore()
        }
    }
}
  
export default SpriteSheet