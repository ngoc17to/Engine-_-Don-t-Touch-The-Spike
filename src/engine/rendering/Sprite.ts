class Sprite {
    private image: HTMLImageElement
    private flipped: boolean

    constructor(image: HTMLImageElement, { flipped = false }: { flipped?: boolean } = {}) {
        this.image = image
        this.flipped = flipped
    }

    public render(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
        let renderedX = x
        
        if (this.flipped) {
        context?.save()
        context?.scale(-1, 1)
        renderedX = -(x + width)
        }
        
        context?.drawImage(this.image, renderedX, y, width, height)

        if (this.flipped) {
        context?.restore()
        }
    }
}

export default Sprite