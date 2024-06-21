import SpriteSheet from "./SpriteSheet";

class AnimatedSprite {
    private spriteSheet: SpriteSheet
    private frameCount: number
    private msPerFrame: number
    private flipped: boolean

    private currentFrame: number = 0
    private msInCurrentFrame: number = 0

    constructor(
        spriteSheet: SpriteSheet,
        frameCount: number,
        msPerFrame: number,
        { flipped = false }: { flipped?: boolean } = {}
    ) {
        this.spriteSheet = spriteSheet
        this.frameCount = frameCount
        this.msPerFrame = msPerFrame
        this.flipped = flipped
    }

    public render(context: CanvasRenderingContext2D, delta: number, x: number, y: number, width: number, height: number): void {
        // Update the frame
        this.msInCurrentFrame += delta * 1000

        if (this.msInCurrentFrame >= this.msPerFrame){
        this.msInCurrentFrame -= this.msPerFrame
        this.currentFrame++;
        if (this.currentFrame >= this.frameCount) {
            this.currentFrame = 0;
        }
        }

        // Render the frame
        this.spriteSheet.render(
            context,
            this.currentFrame,
            x,
            y,
            width,
            height,
            { flipped: this.flipped }
        )
    }
}

export default AnimatedSprite